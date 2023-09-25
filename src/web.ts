import { WebPlugin } from '@capacitor/core';

import type { HealthDataPlugin } from './definitions';

export class HealthDataWeb extends WebPlugin implements HealthDataPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
