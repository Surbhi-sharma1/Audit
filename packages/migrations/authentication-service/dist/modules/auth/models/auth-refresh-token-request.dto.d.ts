import { CoreModel } from '@sourceloop/core';
export declare class AuthRefreshTokenRequest extends CoreModel<AuthRefreshTokenRequest> {
    refreshToken: string;
    tenantId?: string;
}
