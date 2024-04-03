import { Knex } from 'knex';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(@Inject('DB') private knexDB: Knex) {}
  async getData() {
    const books = await this.knexDB('books').select('title', 'author');
    return books;
  }
}
