import { Model } from '@loopback/repository';
export declare class LocalUserProfileDto extends Model {
    email: string;
    password: string;
    constructor(data?: Partial<LocalUserProfileDto>);
}
