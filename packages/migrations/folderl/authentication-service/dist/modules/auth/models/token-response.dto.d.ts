import { Model } from '@loopback/repository';
export declare class TokenResponse extends Model {
    accessToken: string;
    refreshToken: string;
    expires: number;
    pubnubToken?: string;
    constructor(data?: Partial<TokenResponse>);
}
