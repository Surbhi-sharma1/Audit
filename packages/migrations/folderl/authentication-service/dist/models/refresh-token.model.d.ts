import { Entity } from '@loopback/repository';
export declare class RefreshToken extends Entity {
    clientId: string;
    userId: string;
    username: string;
    accessToken: string;
    externalAuthToken?: string;
    externalRefreshToken?: string;
    pubnubToken?: string;
    tenantId?: string;
    constructor(data?: Partial<RefreshToken>);
}
