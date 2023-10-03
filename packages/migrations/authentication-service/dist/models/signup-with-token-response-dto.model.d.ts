import { CoreModel } from '@sourceloop/core';
export declare class SignupWithTokenReponseDto<T> extends CoreModel<SignupWithTokenReponseDto<T>> {
    email: string;
    user: T;
}
