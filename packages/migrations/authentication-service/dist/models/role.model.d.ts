import { RoleTypes, UserModifiableEntity } from '@sourceloop/core';
export declare class Role extends UserModifiableEntity<Role> {
    id?: string;
    name: string;
    roleType: RoleTypes;
    permissions: string[];
}
export type RoleWithRelations = Role;
