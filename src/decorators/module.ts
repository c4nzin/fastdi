import { PROVIDERS } from "../constants";

export function Module(metadata: { providers: any[] }): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata(PROVIDERS, metadata.providers, target);
  };
}
