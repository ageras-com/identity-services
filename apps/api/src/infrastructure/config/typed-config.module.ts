import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypedConfigService } from './typed-config.service';
import { configEnvSchema } from './schema';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configEnvSchema,
    }),
  ],
  providers: [TypedConfigService],
  exports: [TypedConfigService],
})
export class TypedConfigModule {}
