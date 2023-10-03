import { Provider } from '@loopback/context';
import { ILogger } from '@sourceloop/core';
import { VerifyFunction } from 'loopback4-authentication';
import { SignupRequest } from '../models/signup-request.model';
export declare class SignupBearerVerifyProvider implements Provider<VerifyFunction.BearerFn<SignupRequest>> {
    logger: ILogger;
    constructor(logger: ILogger);
    value(): VerifyFunction.BearerFn<SignupRequest>;
}
