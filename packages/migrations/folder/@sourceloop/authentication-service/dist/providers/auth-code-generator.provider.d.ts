import { Provider } from '@loopback/context';
import { AuthCodeGeneratorFn, CodeWriterFn, MfaCheckFn } from './types';
import { OtpService } from '../services';
import { IMfaConfig, IOtpConfig } from '../types';
export declare class AuthCodeGeneratorProvider implements Provider<AuthCodeGeneratorFn> {
    private readonly otpService;
    private readonly checkMfa;
    private readonly codeWriter;
    private readonly mfaConfig;
    private readonly otpConfig;
    constructor(otpService: OtpService, checkMfa: MfaCheckFn, codeWriter: CodeWriterFn, mfaConfig: IMfaConfig, otpConfig: IOtpConfig);
    value(): AuthCodeGeneratorFn;
}
