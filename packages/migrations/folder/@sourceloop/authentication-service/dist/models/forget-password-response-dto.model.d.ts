import { Model } from '@loopback/repository';
import { User } from './user.model';
export declare class ForgetPasswordResponseDto extends Model {
    code: string;
    expiry: number;
    email: string;
    user: User;
    constructor(data?: Partial<ForgetPasswordResponseDto>);
}
