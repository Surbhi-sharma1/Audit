import { Getter } from '@loopback/core';
import { juggler } from '@loopback/repository';
import { DefaultUserModifyCrudRepository, IAuthUserWithPermissions } from '@sourceloop/core';
import { Role } from '../models';
export declare class RoleRepository extends DefaultUserModifyCrudRepository<Role, typeof Role.prototype.id> {
    protected readonly getCurrentUser: Getter<IAuthUserWithPermissions | undefined>;
    constructor(dataSource: juggler.DataSource, getCurrentUser: Getter<IAuthUserWithPermissions | undefined>);
}
