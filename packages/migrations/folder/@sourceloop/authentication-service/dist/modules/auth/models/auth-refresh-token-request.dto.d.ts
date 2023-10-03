import { Model } from '@loopback/repository';
export declare class AuthRefreshTokenRequest extends Model {
    refreshToken: string;
    tenantId?: string;
    constructor(data?: Partial<AuthRefreshTokenRequest>);
}
