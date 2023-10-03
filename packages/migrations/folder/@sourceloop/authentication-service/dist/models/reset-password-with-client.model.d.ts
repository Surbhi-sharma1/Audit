import { Model } from '@loopback/repository';
import { IAuthClientDTO } from '..';
export declare class ResetPasswordWithClient extends Model implements IAuthClientDTO {
    token: string;
    password: string;
    client_id: string;
    client_secret: string;
    constructor(data?: Partial<ResetPasswordWithClient>);
}
