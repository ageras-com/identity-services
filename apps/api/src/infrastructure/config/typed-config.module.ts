import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypedConfigService } from './typed-config.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  providers: [TypedConfigService],
  exports: [TypedConfigService],
})
export class TypedConfigModule {}
