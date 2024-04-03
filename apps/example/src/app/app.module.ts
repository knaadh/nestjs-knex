import { KnexModule } from '@knaadh/nestjs-knex';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // KnexModule.register({
    //   tag: 'DB',
    //   config: {
    //     client: 'better-sqlite3',
    //     connection: {
    //       filename: './demo.db',
    //     },
    //   },
    // }),

    KnexModule.registerAsync({
      tag: 'DB',
      useFactory: () => ({
        config: {
          client: 'better-sqlite3',
          connection: {
            filename: './demo.db',
          },
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
