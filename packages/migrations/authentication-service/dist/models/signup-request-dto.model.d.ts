import { AnyObject } from '@loopback/repository';
import { CoreModel } from '@sourceloop/core';
export declare class SignupRequestDto<T = AnyObject> extends CoreModel<SignupRequestDto<T>> {
    email: string;
    data?: T;
}
