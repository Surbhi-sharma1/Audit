import { UserModifiableEntity, ConfigKey } from '@sourceloop/core';
export declare class TenantConfig extends UserModifiableEntity {
    id?: string;
    configKey: ConfigKey;
    configValue?: object;
    tenantId: string;
    constructor(data?: Partial<TenantConfig>);
}
