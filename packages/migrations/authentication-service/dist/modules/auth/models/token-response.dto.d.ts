import { CoreModel } from '@sourceloop/core';
export declare class TokenResponse extends CoreModel<TokenResponse> {
    accessToken: string;
    refreshToken: string;
    expires: number;
    pubnubToken?: string;
}
