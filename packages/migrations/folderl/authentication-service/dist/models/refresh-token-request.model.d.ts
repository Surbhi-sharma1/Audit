import { Model } from '@loopback/repository';
export declare class RefreshTokenRequest extends Model {
    refreshToken: string;
    constructor(data?: Partial<RefreshTokenRequest>);
}
