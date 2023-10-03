import { DataObject, Model } from '@loopback/repository';
import { CoreModel } from '@sourceloop/core';
export declare class RefreshTokenRequest<T = DataObject<Model>> extends CoreModel<T & RefreshTokenRequest> {
    refreshToken: string;
}
