import { BindingKey } from '@loopback/core';
import { TenantUtilitiesComponent } from './component';
import { EntityWithTenantId, ITenantGuard } from './types';
export declare const TenantUtilitiesNamespace = "sourceloop.tenant.utilities";
export declare namespace TenantUtilitiesBindings {
    const Component: BindingKey<TenantUtilitiesComponent>;
    const GuardService: BindingKey<ITenantGuard<EntityWithTenantId, string | number>>;
}
