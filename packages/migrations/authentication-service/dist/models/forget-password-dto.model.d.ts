import { CoreModel } from '@sourceloop/core';
import { IAuthClientDTO } from '..';
export declare class ForgetPasswordDto extends CoreModel<ForgetPasswordDto> implements IAuthClientDTO {
    username: string;
    client_id: string;
    client_secret: string;
}
