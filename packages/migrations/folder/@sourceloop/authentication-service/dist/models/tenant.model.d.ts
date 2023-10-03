import { UserModifiableEntity, TenantStatus } from '@sourceloop/core';
import { TenantConfig } from './tenant-config.model';
export declare class Tenant extends UserModifiableEntity {
    id?: string;
    name: string;
    key: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    status: TenantStatus;
    tenantConfigs: TenantConfig[];
    constructor(data?: Partial<Tenant>);
}
export type TenantWithRelations = Tenant;
