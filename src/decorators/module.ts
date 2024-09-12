export function Module(metadata: { providers: any[] }): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata("providers", metadata.providers, target);
  };
}
