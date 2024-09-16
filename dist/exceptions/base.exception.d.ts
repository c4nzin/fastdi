export declare class BaseException extends Error {
    readonly statusCode: number;
    constructor(message: string, statusCode: number);
}
