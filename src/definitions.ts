/**
 * Plugin for accessing health data and step counters.
 */
export interface HealthDataPlugin {
  /**
   * Echoes back the provided value.
   * @param {object} options - The options object.
   * @param {string} options.value - The value to echo.
   * @returns {Promise<{ value: string }>} - A promise that resolves to an object containing the echoed value.
   * @example
   * const result = await HealthDataPlugin.echo({ value: "Hello, world!" });
   * console.log(result.value); // "Hello, world!"
   */
  echo(options: { value: string }): Promise<{ value: string }>;

  /**
   * Retrieves the step count value from the step counter sensor since it was started.
   * Returns null if the necessary permissions have not been granted.
   * Once the permissions are granted, subsequent calls will return the correct step count value.
   * If the device doesn't have a step counter sensor, it won't return anything, but a message indicating that the sensor is not available will be logged to the console.
   * @returns {Promise<{ name: string, count: number }>} - A promise that resolves to an object containing the name of the sensor and the current step count value.
   * @example
   * const result = await HealthDataPlugin.getSteps();
   * console.log(result.name); // Name of the sensor
   * console.log(result.count); // Current step count
   */
  getSteps(): Promise<{ name: string, count: number }>;

  /**
   * Retrieves the heart rate value from the heart rate sensor.
   * Returns null if the necessary permissions have not been granted.
   * Once the permissions are granted, subsequent calls will return the correct step count value.
   * If the device doesn't have a step counter sensor, it won't return anything, but a message indicating that the sensor is not available will be logged to the console.
   * @returns {Promise<{ name: string, count: number }>} - A promise that resolves to an object containing the name of the sensor and the current step count value.
   * @example
   * const result = await HealthDataPlugin.getHeartRate();
   * console.log(result.name); // Name of the sensor
   * console.log(result.count); // Current heart rate
   */
  getHeartRate(): Promise<{ name: string, count: number }>;

  /**
   * Checks the status of the permission and requests it for the first time if it hasn't been granted.
   * The permission status remains unchanged once it has been granted for the rest of the application usage.
   * @param {CheckPermissionOptions} [options] - The options object.
   * @returns {Promise<CheckPermissionResult>} - A promise that resolves to an object containing the permission status.
   * @example
   * const result = await HealthDataPlugin.checkPermission();
   * console.log(result.granted); // true if the permission is granted, false otherwise
   * console.log(result.asked); // true if the permission has been asked before, false otherwise
   * console.log(result.neverAsked); // true if the permission has never been asked before, false otherwise
   * console.log(result.denied); // true if the permission is denied, false otherwise
   */
  checkPermission(options?: CheckPermissionOptions): Promise<CheckPermissionResult>;

  /**
   * Opens the app settings screen for the current app.
   * @returns {Promise<void>} - A promise that resolves once the app settings screen is opened.
   * @example
   * await HealthDataPlugin.openAppSettings();
   */
  openAppSettings(): Promise<void>;
}


export interface CheckPermissionOptions {
  /**
   * If this is set to `true`, the user will be prompted for the permission.
   * The prompt will only show if the permission was not yet granted and also not denied completely yet.
   *
   * @default false
   * @since 0.0.1
   */
  force?: boolean;
}

export interface CheckPermissionResult {
  /**
   * When set to `true`, the permission is granted.
   */
  granted?: boolean;

  /**
   * When set to `true`, the permission is denied and cannot be prompted for.
   * The `openAppSettings` method should be used to let the user grant the permission.
   *
   * @since 0.0.1
   */
  denied?: boolean;

  /**
   * When this is set to `true`, the user was just prompted the permission.
   * Ergo: a dialog, asking the user to grant the permission, was shown.
   *
   * @since 0.0.1
   */
  asked?: boolean;

  /**
   * When this is set to `true`, the user has never been prompted the permission.
   *
   * @since 0.0.1
   */
  neverAsked?: boolean;

  /**
   * iOS only
   * When this is set to `true`, the permission cannot be requested for some reason.
   *
   * @since 0.0.1
   */
  restricted?: boolean;

  /**
   * iOS only
   * When this is set to `true`, the permission status cannot be retrieved.
   *
   * @since 0.0.1
   */
  unknown?: boolean;
}