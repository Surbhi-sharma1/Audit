import { CoreEntity } from '@sourceloop/core';
export declare class OtpCache extends CoreEntity<OtpCache> {
    otp?: string;
    userId?: string;
    otpSecret?: string;
    clientId: string;
    clientSecret: string;
}
