import { CoreModel } from '@sourceloop/core';
import { User } from './user.model';
export declare class ForgetPasswordResponseDto extends CoreModel<ForgetPasswordResponseDto> {
    code: string;
    expiry: number;
    email: string;
    user: User;
}
