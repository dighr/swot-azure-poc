export interface Runner {
  run(output: string): Promise<any>;
}