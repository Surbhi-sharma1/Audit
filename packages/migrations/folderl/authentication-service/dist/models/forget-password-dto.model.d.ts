import { Model } from '@loopback/repository';
import { IAuthClientDTO } from '..';
export declare class ForgetPasswordDto extends Model implements IAuthClientDTO {
    username: string;
    client_id: string;
    client_secret: string;
    constructor(data?: Partial<ForgetPasswordDto>);
}
