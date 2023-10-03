import { Model } from '@loopback/repository';
export declare class AuthTokenRequest extends Model {
    code: string;
    clientId: string;
    constructor(data?: Partial<AuthTokenRequest>);
}
