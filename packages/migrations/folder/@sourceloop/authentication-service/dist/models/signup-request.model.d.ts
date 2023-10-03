import { Model } from '@loopback/repository';
export declare class SignupRequest extends Model {
    email: string;
    expiry: string;
    constructor(data?: Partial<SignupRequest>);
}
