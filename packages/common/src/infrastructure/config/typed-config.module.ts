import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configEnvSchema } from './schema';
import { TypedConfigService } from './typed-config.service';

@Global()
@Module({
  exports: [TypedConfigService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configEnvSchema,
    }),
  ],
  providers: [TypedConfigService],
})
export class TypedConfigModule {}
