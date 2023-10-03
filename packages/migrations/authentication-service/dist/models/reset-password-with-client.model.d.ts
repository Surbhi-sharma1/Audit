import { CoreModel } from '@sourceloop/core';
import { IAuthClientDTO } from '..';
export declare class ResetPasswordWithClient extends CoreModel<ResetPasswordWithClient> implements IAuthClientDTO {
    token: string;
    password: string;
    client_id: string;
    client_secret: string;
}
