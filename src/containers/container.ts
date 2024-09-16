import { Constructible } from "src/types/constructible";
import { LIFE_CYCLE, DESIGN_PARAM_TYPES, PROVIDERS } from "../constants";
import { LifeCycle } from "../enums/life-cycle.enum";

export class Container {
  private static modules = new Set();
  private static instances = new Map();

  public static get<T = any>(token: Constructible): T {
    const lifeCycle =
      Reflect.getMetadata(LIFE_CYCLE, token) || LifeCycle.Singleton;

    if (lifeCycle === LifeCycle.Transient) {
      const dependencies = Reflect.getMetadata(DESIGN_PARAM_TYPES, token) || [];

      const injections: Constructible[] = dependencies.map(
        (dep: Constructible) => Container.get(dep)
      );

      return new token(...injections);
    }

    if (!this.instances.has(token)) {
      const dependencies = Reflect.getMetadata(DESIGN_PARAM_TYPES, token) || [];

      const injections: Constructible[] = dependencies.map(
        (dep: Constructible) => Container.get(dep)
      );

      const instance = new token(...injections);

      this.instances.set(token, instance);
    }

    return this.instances.get(token);
  }

  public static loadModules(module: any) {
    if (this.instances.has(module)) {
      const providers: Constructible[] =
        Reflect.getMetadata(PROVIDERS, module) || [];

      providers.forEach((provider: Constructible) => {
        Container.get(provider);
      });

      this.modules.add(module);
    }
  }
}
