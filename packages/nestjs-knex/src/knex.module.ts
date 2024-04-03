import { DynamicModule, Global } from '@nestjs/common';

import {
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
} from './knex.definition';
import { KnexOptions } from './knex.interface';
import { KnexService } from './knex.service';

@Global()
export class KnexModule extends ConfigurableModuleClass {
  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    const { providers = [], exports = [], ...props } = super.register(options);
    return {
      ...props,
      providers: [
        ...providers,
        KnexService,
        {
          provide: options?.tag || 'default',
          useFactory: async (knexService: KnexService) => {
            return await knexService.getKnex(options.config);
          },
          inject: [KnexService],
        },
      ],
      exports: [...exports, options?.tag || 'default'],
    };
  }
  static registerAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    const {
      providers = [],
      exports = [],
      ...props
    } = super.registerAsync(options);
    return {
      ...props,
      providers: [
        ...providers,
        KnexService,
        {
          provide: options?.tag || 'default',
          useFactory: async (
            knexService: KnexService,
            options: KnexOptions
          ) => {
            return await knexService.getKnex(options.config);
          },
          inject: [KnexService, MODULE_OPTIONS_TOKEN],
        },
      ],
      exports: [...exports, options?.tag || 'default'],
    };
  }
}
