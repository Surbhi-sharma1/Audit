import { CoreModel } from '@sourceloop/core';
export declare class LoginRequest extends CoreModel<LoginRequest> {
    client_id: string;
    client_secret: string;
    username: string;
    password: string;
}
