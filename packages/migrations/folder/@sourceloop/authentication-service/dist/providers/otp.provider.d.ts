import { Provider } from '@loopback/context';
import { OtpFn } from './types';
import { OtpGenerateFn, OtpSenderFn } from '../providers';
export declare class OtpProvider implements Provider<OtpFn> {
    private readonly generateOtp;
    private readonly sendOtp;
    constructor(generateOtp: OtpGenerateFn, sendOtp: OtpSenderFn);
    value(): OtpFn;
}
