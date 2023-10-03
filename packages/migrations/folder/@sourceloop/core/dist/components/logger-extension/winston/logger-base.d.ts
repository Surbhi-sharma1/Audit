import { Logger as WinstonLogger } from 'winston';
import { ILogger } from '../logger.interface';
import { LogMessage } from '../types';
export declare class WinstonLoggerBase implements ILogger {
    logger: WinstonLogger;
    log(info: LogMessage): void;
    info(message: string, key?: string): void;
    warn(message: string, key?: string): void;
    error(message: string, key?: string): void;
    debug(message: string, key?: string): void;
}
