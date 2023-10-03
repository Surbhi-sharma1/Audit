import { IAuthUserWithPermissions, IUserPrefs, UserStatus } from '@sourceloop/core';
import { User } from '../../../models';
export declare class DeviceInfo {
    userAgent?: string;
    deviceId?: string;
}
export declare class AuthUser extends User<AuthUser> implements IAuthUserWithPermissions {
    permissions: string[];
    role: string;
    externalAuthToken?: string;
    deviceInfo?: DeviceInfo;
    age?: number;
    externalRefreshToken?: string;
    authClientId: number;
    userPreferences?: IUserPrefs;
    tenantId?: string;
    userTenantId?: string;
    passwordExpiryTime?: Date;
    status?: UserStatus;
    getIdentifier(): string | undefined;
}
