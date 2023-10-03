import { Getter } from '@loopback/core';
import { BelongsToAccessor, juggler } from '@loopback/repository';
import { DefaultSoftCrudRepository } from '@sourceloop/core';
import { User, UserCredentials, UserCredentialsRelations } from '../models';
import { UserRepository } from './user.repository';
export declare class UserCredentialsRepository extends DefaultSoftCrudRepository<UserCredentials, typeof UserCredentials.prototype.id, UserCredentialsRelations> {
    protected userRepositoryGetter: Getter<UserRepository>;
    readonly user: BelongsToAccessor<User, typeof UserCredentials.prototype.id>;
    constructor(dataSource: juggler.DataSource, userRepositoryGetter: Getter<UserRepository>);
}
