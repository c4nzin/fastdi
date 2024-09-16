import { Constructible } from "src/types/constructible";
import { LIFE_CYCLE, DESIGN_PARAM_TYPES, PROVIDERS } from "../constants";
import { LifeCycle } from "../enums/life-cycle.enum";
import { Instances } from "src/interfaces/instances.interface";
import { NotFoundException } from "../exceptions/not-found.exception";

export class Container {
  private static modules = new Set();
  private static instances: Instances = new Map();

  public static get<T = any>(token: Constructible): T {
    //Getting lifecycle metadata if its provided the actual value will be handling as Transient

    const lifeCycle =
      Reflect.getMetadata(LIFE_CYCLE, token) || LifeCycle.Singleton;

    /*
      Handling transient enum
     */
    if (lifeCycle === LifeCycle.Transient) {
      const dependencies = Reflect.getMetadata(DESIGN_PARAM_TYPES, token) || [];

      const injections: Constructible[] = dependencies.map(
        (dep: Constructible) => Container.get(dep)
      );

      return new token(...injections);
    }

    //If transient type isn't provided so the lib will handle DI as singleton
    if (!this.instances.has(token)) {
      const dependencies = Reflect.getMetadata(DESIGN_PARAM_TYPES, token) || [];

      const injections: Constructible[] = dependencies.map(
        (dep: Constructible) => Container.get(dep)
      );

      const instance: Constructible = new token(...injections);

      this.instances.set(token, instance);
    }

    const instance: Constructible | undefined = this.instances.get(token);

    if (!instance) {
      throw new NotFoundException(
        `Instance for ${token.name} not found in the container.`
      );
    }

    return instance as T;
  }

  //TODO: Move loadmodules into a new file
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

  public static clear() {
    this.instances.clear();
    this.modules.clear();
  }
}
