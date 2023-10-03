import { Provider } from '@loopback/context';
import { OtpSenderFn } from './types';
export declare class OtpSenderProvider implements Provider<OtpSenderFn> {
    value(): OtpSenderFn;
}
