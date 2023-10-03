import { Model } from '@loopback/repository';
export declare class SignupWithTokenReponseDto<T> extends Model {
    email: string;
    user: T;
    constructor(data?: Partial<SignupWithTokenReponseDto<T>>);
}
