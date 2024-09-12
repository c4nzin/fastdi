import { LifeCycle } from "../enums/life-cycle.enum";

export function Injectable(
  options: { lifeCycle?: LifeCycle } = {}
): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata("injectable", true, target);
    Reflect.defineMetadata(
      "lifecycle",
      options.lifeCycle || LifeCycle.Singleton,
      target
    );
  };
}
