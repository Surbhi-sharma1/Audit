import { Entity } from '@loopback/repository';
export declare class OtpCache extends Entity {
    otp?: string;
    userId?: string;
    otpSecret?: string;
    clientId: string;
    clientSecret: string;
    constructor(data?: Partial<OtpCache>);
}
