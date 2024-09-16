import { Constructible } from "src/types/constructible";
export declare class Container {
    private static modules;
    private static instances;
    static get<T = any>(token: Constructible): T;
    static loadModules(module: any): void;
}
