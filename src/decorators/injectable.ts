import { INJECTABLE, LIFE_CYCLE } from "../constants";
import { LifeCycle } from "../enums/life-cycle.enum";

export function Injectable(
  options: { lifeCycle?: LifeCycle } = {}
): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata(INJECTABLE, true, target);
    Reflect.defineMetadata(
      LIFE_CYCLE,
      options.lifeCycle || LifeCycle.Singleton,
      target
    );
  };
}
