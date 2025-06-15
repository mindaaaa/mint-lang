export class Environment {
  private values = new Map<string, any>();

  define(name: string, value: any) {
    this.values.set(name, value);
  }

  get(name: string): any {
    if (!this.values.has(name)) {
      throw new Error(`정의되지 않은 변수: ${name}`);
    }
    return this.values.get(name);
  }
}
