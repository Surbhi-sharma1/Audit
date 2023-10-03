import { RefreshTokenRequest } from '../../../models';
export declare class ResetPassword extends RefreshTokenRequest {
    username: string;
    password: string;
    oldPassword?: string;
    constructor(data?: Partial<ResetPassword>);
}
