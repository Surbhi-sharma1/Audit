import { CoreEntity } from '@sourceloop/core';
import { LoginType } from '../enums/login-type.enum';
export declare class LoginActivity extends CoreEntity<LoginActivity> {
    id?: string;
    actor: string;
    tenantId?: string;
    loginTime: Date;
    tokenPayload?: string;
    loginType: LoginType;
    deviceInfo: string;
    ipAddress: string;
}
