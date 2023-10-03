import { Model } from '@loopback/repository';
export declare class SignupRequestResponseDto extends Model {
    code: string;
    expiry: number;
    email: string;
    constructor(data?: Partial<SignupRequestResponseDto>);
}
