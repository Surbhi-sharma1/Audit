import { DefaultCrudRepository } from '@loopback/repository';
import { AbstractConstructor } from '../../../mixins/types';
import { EntityWithTenantId } from '../types';
/**
 * This function returns a class decorator that adds a tenant guard mixin
 * to the given repository class.
 *
 * @param constructor - The repository class to decorate
 */
export declare function tenantGuard(): <M extends EntityWithTenantId, ID, Relations extends object, S extends AbstractConstructor<DefaultCrudRepository<M, ID, Relations>>>(constructor: S & AbstractConstructor<DefaultCrudRepository<M, ID, Relations>>) => S & AbstractConstructor<DefaultCrudRepository<M, ID, Relations>>;
