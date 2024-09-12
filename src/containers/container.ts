import { LIFE_CYCLE, PARAM_TYPES, PROVIDERS } from "../constants";
import { LifeCycle } from "../enums/life-cycle.enum";

export class Container {
  private static modules = new Set();
  private static instances = new Map();

  public static get<T>(token: new (...args: any[]) => T): T {
    const lifeCycle =
      Reflect.getMetadata(LIFE_CYCLE, token) || LifeCycle.Singleton;

    if (lifeCycle === LifeCycle.Transient) {
      const dependencies =
        Reflect.getMetadata("design:paramtypes", token) || [];

      const injections = dependencies.map((dep: any) => Container.get(dep));

      return new token(...injections);
    }

    if (!this.instances.has(token)) {
      const dependencies = Reflect.getMetadata(PARAM_TYPES, token) || [];

      const injections = dependencies.map((dep: any) => Container.get(dep));

      const instance = new token(...injections);

      this.instances.set(token, instance);
    }

    return this.instances.get(token);
  }

  public static loadModules(module: any) {
    if (this.instances.has(module)) {
      const providers = Reflect.getMetadata(PROVIDERS, module) || [];

      providers.forEach((provider: any) => {
        Container.get(provider);
      });

      this.modules.add(module);
    }
  }
}
