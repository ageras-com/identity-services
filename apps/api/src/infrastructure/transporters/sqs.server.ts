import { CustomTransportStrategy, Server } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import {
  QueueAttributeName,
  SQSClient,
  Message,
  ReceiveMessageCommand,
  DeleteMessageCommand,
} from '@aws-sdk/client-sqs';

const POLL_DELAY = 5000; // Delay in milliseconds between polling iterations
const WAIT_TIME_IN_SECONDS = 4; // Maximum duration of a poll request
const MAX_NUMBER_OF_MESSAGES = 10; // Maximum number of messages collected in a single poll request

interface SqsInputMessageBody {
  'detail-type': string;
  version: number;
  detail: {
    data: Record<string, any>;
  };
}

export class SqsTransporterServer
  extends Server
  implements CustomTransportStrategy
{
  protected override readonly logger = new Logger(SqsTransporterServer.name);
  private isListening: boolean = false;
  private sqsClient: SQSClient;

  constructor(private readonly queueUrl: string) {
    super();
    this.sqsClient = new SQSClient({
      useQueueUrlAsEndpoint: true,
      credentials: {
        accessKeyId: 'test', // TODO: Update
        secretAccessKey: 'test', // TODO: Update
      },
    });
  }

  // Called when app.listen() is used.
  // We use it to start listening to the SQS queue.
  listen(callback: () => any) {
    this.logger.log(`Starting polling of ${this.queueUrl}`);
    this.startListening();
    callback();
  }

  // Called when  the application shutdown starts
  close() {
    this.isListening = false;
    this.logger.log(`Stopped polling of ${this.queueUrl}`);
  }

  on() {
    throw new Error('Method not implemented.');
  }

  unwrap<T = never>(): T {
    throw new Error('Method not implemented.');
  }

  startListening() {
    this.isListening = true;
    void this.pollQueue();
  }

  private async pollQueue() {
    while (this.isListening) {
      try {
        const command = new ReceiveMessageCommand({
          QueueUrl: this.queueUrl,
          WaitTimeSeconds: WAIT_TIME_IN_SECONDS,
          MaxNumberOfMessages: MAX_NUMBER_OF_MESSAGES,
          MessageAttributeNames: ['All'], // Fetch all message attributes
          AttributeNames: [QueueAttributeName.All], // Request all attributes
        });

        const data = await this.sqsClient.send(command);

        if (data.Messages) {
          await Promise.all(
            data.Messages.map(async (message) => {
              try {
                await this.sendMessageToNestHandler(message);
              } catch (error) {
                this.logger.error(`Error processing message: ${error}`);
              }
            }),
          );
        }

        // Add a delay between poll iterations to avoid overwhelming SQS
        await this.sleep(POLL_DELAY);
      } catch (error) {
        this.logger.error(
          `Error receiving messages from ${this.queueUrl}: ${error}`,
        );
      }
    }
  }

  private async sendMessageToNestHandler(message: Message): Promise<void> {
    const messageId = message.MessageId;
    if (message.Body === undefined || message.Body.length === 0) {
      this.logger.warn(`Skipping empty message: ${messageId}`);
      return;
    }

    const body = JSON.parse(message.Body) as SqsInputMessageBody;
    const eventType = body['detail-type'];
    const eventVersion = body['version'];

    if (eventType === undefined || eventType.length === 0) {
      this.logger.warn(`Skipping message with no eventType ${messageId}`);
      return;
    }

    const eventPattern = this.normalizePattern({
      eventType: eventType,
      version: eventVersion,
    });

    const handler = this.getHandlers().get(eventPattern);
    if (handler) {
      this.logger.log(`Processing message ${messageId}`);
      await handler(body.detail);
      await this.deleteMessage(message);
    } else {
      this.logger.warn(
        `No handler found for the event ${eventPattern} found in message ${messageId}`,
      );
    }
  }

  /**
   * Deletes a message from the queue.
   * @param queueUrl - The URL of the queue.
   * @param message - The message to delete.
   */
  private async deleteMessage(message: Message): Promise<void> {
    const command = new DeleteMessageCommand({
      QueueUrl: this.queueUrl,
      ReceiptHandle: message.ReceiptHandle,
    });
    await this.sqsClient.send(command);
    this.logger.log(
      `Deleted message ${message.MessageId} from ${this.queueUrl}`,
    );
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
