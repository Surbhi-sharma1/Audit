import { UserModifiableEntity, RoleTypes } from '@sourceloop/core';
export declare class Role extends UserModifiableEntity {
    id?: string;
    name: string;
    roleType: RoleTypes;
    permissions: string[];
    constructor(data?: Partial<Role>);
}
export type RoleWithRelations = Role;
