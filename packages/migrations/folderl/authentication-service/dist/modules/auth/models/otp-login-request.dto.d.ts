import { Model } from '@loopback/repository';
export declare class OtpLoginRequest extends Model {
    key: string;
    otp: string;
    constructor(data?: Partial<OtpLoginRequest>);
}
