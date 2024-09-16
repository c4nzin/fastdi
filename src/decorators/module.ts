import { IMetaDataOptions } from "src/interfaces/metadata-options.interface";
import { PROVIDERS } from "../constants";

export function Module(metadata: IMetaDataOptions): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata(PROVIDERS, metadata.providers, target);
  };
}
