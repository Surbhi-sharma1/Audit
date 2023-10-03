/// <reference types="express" />
import { Request, OperationArgs } from '@loopback/rest';
/**
 * A function to perform REST req/res logging action
 */
export type LogFn = (req: Request, args: OperationArgs, result: any) => Promise<void>;
export interface LogMessage {
    key?: string;
    message: string;
    level: number;
    timestamp?: Date;
}
