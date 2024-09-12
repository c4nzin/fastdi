export declare class Container {
    private static modules;
    private static instances;
    static get<T>(token: new (...args: any[]) => T): T;
    static loadModules(module: any): void;
}
