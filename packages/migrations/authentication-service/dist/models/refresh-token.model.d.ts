import { CoreEntity } from '@sourceloop/core';
export declare class RefreshToken extends CoreEntity<RefreshToken> {
    clientId: string;
    userId: string;
    username: string;
    accessToken: string;
    externalAuthToken?: string;
    externalRefreshToken?: string;
    pubnubToken?: string;
    tenantId?: string;
}
