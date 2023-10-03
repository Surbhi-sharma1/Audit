import { Entity } from '@loopback/repository';
import { LoginType } from '../enums/login-type.enum';
export declare class LoginActivity extends Entity {
    id?: string;
    actor: string;
    tenantId?: string;
    loginTime: Date;
    tokenPayload?: string;
    loginType: LoginType;
    deviceInfo: string;
    ipAddress: string;
    constructor(data?: Partial<LoginActivity>);
}
