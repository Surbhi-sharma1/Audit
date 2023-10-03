import { TenantStatus, UserModifiableEntity } from '@sourceloop/core';
import { TenantConfig } from './tenant-config.model';
export declare class Tenant extends UserModifiableEntity<Tenant> {
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
}
export type TenantWithRelations = Tenant;
