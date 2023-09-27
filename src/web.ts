import { WebPlugin } from '@capacitor/core';

import type { HealthDataPlugin, CheckPermissionOptions, CheckPermissionResult } from './definitions';

export class HealthDataWeb extends WebPlugin implements HealthDataPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }

  async getSteps(): Promise<{ name: string, count: number }> {
    return {
    name : "Name Sensor",
    count : 300
    }
  }

  async getHeartRate(): Promise<{ name: string, count: number }> {
    return {
    name : "Name Sensor",
    count : 70
    }
  }

  async checkPermission(_options: CheckPermissionOptions): Promise<CheckPermissionResult> {
      if (typeof navigator === 'undefined' || !navigator.permissions) {
        throw this.unavailable('Permissions API not available in this browser');
      }

      try {
        // https://developer.mozilla.org/en-US/docs/Web/API/Permissions/query
        // the specific permissions that are supported varies among browsers that implement the
        // permissions API, so we need a try/catch in case 'camera' is invalid
        const permission = await window.navigator.permissions.query({
          name: 'camera' as any,
        });
        if (permission.state === 'prompt') {
          return {
            neverAsked: true,
          };
        }
        if (permission.state === 'denied') {
          return {
            denied: true,
          };
        }
        if (permission.state === 'granted') {
          return {
            granted: true,
          };
        }
        return {
          unknown: true,
        };
      } catch {
        throw this.unavailable('Steps Conter permissions are not available in this browser');
      }
  }

  async openAppSettings(): Promise<void> {
      throw this.unavailable('App settings are not available in this browser');
  }

}
