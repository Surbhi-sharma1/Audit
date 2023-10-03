import { juggler } from '@loopback/repository';
import { DefaultSoftCrudRepository } from '@sourceloop/core';
import { AuthClient } from '../models';
export declare class AuthClientRepository extends DefaultSoftCrudRepository<AuthClient, typeof AuthClient.prototype.id> {
    constructor(dataSource: juggler.DataSource);
}
