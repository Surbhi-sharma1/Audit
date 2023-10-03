import { Provider } from '@loopback/core';
import { ILogger } from '../logger.interface';
export declare class LoggerProvider implements Provider<ILogger> {
    constructor();
    logger: ILogger;
    value(): ILogger;
}
