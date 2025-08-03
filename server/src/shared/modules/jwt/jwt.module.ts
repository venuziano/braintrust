import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        // NOTE: It should be a secret key, but for now we're using a fixed key for testing
        secret: '4b5a6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5',
        signOptions: { expiresIn: '4h' },
      }),
      inject: [],
    }),
  ],
  exports: [JwtModule],
})
export class GlobalJwtModule {} 