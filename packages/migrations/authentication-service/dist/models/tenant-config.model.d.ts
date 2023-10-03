import { ConfigKey, UserModifiableEntity } from '@sourceloop/core';
export declare class TenantConfig extends UserModifiableEntity<TenantConfig> {
    id?: string;
    configKey: ConfigKey;
    configValue?: object;
    tenantId: string;
}
