import { Provider } from '@loopback/context';
import { ILogger } from '@sourceloop/core';
import { OtpGenerateFn } from './types';
export declare class OtpGenerateProvider implements Provider<OtpGenerateFn> {
    private readonly logger;
    constructor(logger: ILogger);
    value(): OtpGenerateFn;
}
