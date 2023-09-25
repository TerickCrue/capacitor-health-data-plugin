export interface HealthDataPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
