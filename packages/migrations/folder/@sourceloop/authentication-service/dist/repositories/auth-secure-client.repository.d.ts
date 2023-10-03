import { juggler } from '@loopback/repository';
import { DefaultSoftCrudRepository } from '@sourceloop/core';
import { AuthSecureClient } from '../models';
export declare class AuthSecureClientRepository extends DefaultSoftCrudRepository<AuthSecureClient, typeof AuthSecureClient.prototype.id> {
    constructor(dataSource: juggler.DataSource);
}
