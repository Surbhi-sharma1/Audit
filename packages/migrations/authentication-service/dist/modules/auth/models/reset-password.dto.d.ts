import { RefreshTokenRequest } from '../../../models';
export declare class ResetPassword extends RefreshTokenRequest<ResetPassword> {
    username: string;
    password: string;
    oldPassword?: string;
}
