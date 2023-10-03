import { Model } from '@loopback/repository';
export declare class OtpSendRequest extends Model {
    client_id: string;
    client_secret: string;
    key: string;
    constructor(data?: Partial<OtpSendRequest>);
}
