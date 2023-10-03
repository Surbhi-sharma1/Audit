import { AnyObject, Model } from '@loopback/repository';
export declare class SignupRequestDto<T = AnyObject> extends Model {
    email: string;
    data?: T;
    constructor(data?: Partial<SignupRequestDto<T>>);
}
