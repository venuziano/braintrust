import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [],
      // NOTE: Defining hardcoded values since it's a test project.
      // NOTE: Avoid you creating a .env file to run the docker container properly.
      // NOTE: For a real project, we use '.env' file for local development,
      // and for production environments, we use Github Actions, AWS, or any cloud secrets.
      useFactory: () => ({
        type: 'postgres',
        host: 'host.docker.internal',
        port: 5432,
        username: 'rrs',
        password: 'rrs',
        database: 'braintrust',
        autoLoadEntities: true,
        synchronize: false,
        migrationsRun: true,
        migrations: [join(__dirname, '../migrations/*{.js,.ts}')],
      }),
      inject: [],
    }),
  ],
})
export class DatabaseModule {}
