#!/bin/sh

# This script is configured in the docker-composition to run automatically when the container localstack starts
# It creates all the resources necessary in localstack for the application
AWS_REGION=eu-central-1
QUEUE_NAME=IncomingIdentityEvents

awslocal sqs create-queue --region $AWS_REGION --queue-name $QUEUE_NAME
awslocal sqs create-queue --region $AWS_REGION --queue-name ${QUEUE_NAME}-DLQ
awslocal sqs set-queue-attributes \
	--queue-url http://sqs.${AWS_REGION}.localhost.localstack.cloud:4566/000000000000/$QUEUE_NAME \
	--attributes '{
    "RedrivePolicy": "{\"deadLetterTargetArn\":\"arn:aws:sqs:'${AWS_REGION}':000000000000:'${QUEUE_NAME}'-DLQ\",\"maxReceiveCount\":\"1\"}"
}'
