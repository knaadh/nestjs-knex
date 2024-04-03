<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">
 <a href="https://nestjs.com/" target="blank">A NestJS</a> module for integrating <a href="https://knexjs.org/" target="blank">Knex
</p>

<p align="center">
  <a href="https://nx.dev/" target="blank"><img src="https://img.shields.io/badge/built%20with-Nx-orange?style=for-the-badge" alt="Nrwl Nx" /></a>
</p>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Documentation](#documentation)
- [License](#license)

## Installation

```bash
npm install @knaadh/nestjs-knex knex
```

Then install one of the following database drivers according to your database type

```bash
npm install pg
npm install pg-native
npm install sqlite3
npm install better-sqlite3
npm install mysql
npm install mysql2
npm install oracledb
npm install tedious
```

## Usage

Import the KnexModule module and pass an `options` object to initialize it. You can pass `options` object using the usual methods for [custom providers](https://docs.nestjs.com/fundamentals/custom-providers) as shown below:

```typescript
import { KnexModule } from '@knaadh/nestjs-knex';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [
    // Method #1: Pass options object
    KnexModule.register({
      tag: 'DB_1',
      config: {
        client: 'better-sqlite3',
        connection: {
          filename: './demo.db',
        },
      },
    }),

    // Method #2: useFactory()
    KnexModule.registerAsync({
      tag: 'DB_2',
      useFactory: () => ({
        config: {
          client: 'better-sqlite3',
          connection: {
            filename: './demo.db',
          },
        },
      }),
    }),

    // Method #3: useClass()
    KnexModule.registerAsync({
      tag: 'DB_3',
      useClass: KnexConfigService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

```typescript
export class KnexConfigService {
  create = () => {
    return {
      config: {
        client: 'better-sqlite3',
        connection: {
          filename: './demo.db',
        },
      },
    };
  };
}
```
You can inject the `Knex` instances using their respective `tag` specified in the configurations

```typescript
import { Knex } from 'knex';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('DB_1') private knexDB1: Knex,
    @Inject('DB_2') private knexDB2: Knex
  ) {}
  async getData() {
    const books = await this.knexDB1('books').select('title', 'author');
    const authors = await this.knexDB2('authors').select('id', 'name');
    return {
      books: books,
      authors: authors,
    };
  }
}
```

## Configuration

A KnexModule `option` object has the following interface:

```typescript
export interface KnexOptions {
  config: Knex.Config;
}
```

- `config:` configuration object for Knex as described [here](https://knexjs.org/guide/#configuration-options)

## Documentation

- [Nx](https://nx.dev/l/r/nest/library)
- [Knex](https://knexjs.org)

## License

This package is [MIT licensed](LICENSE)
