import { knex, Knex } from 'knex';

import { Injectable } from '@nestjs/common';

@Injectable()
export class KnexService {
  public getKnex(config: Knex.Config) {
    return knex(config);
  }
}
