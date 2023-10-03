import { DefaultCrudRepository } from '@loopback/repository';
import { AbstractConstructorWithGuard, EntityWithTenantId } from '../types';
import { AbstractConstructor } from '../../../mixins/types';
export declare function TenantGuardMixin<M extends EntityWithTenantId, ID, Relations extends object, S extends AbstractConstructor<DefaultCrudRepository<M, ID, Relations>>>(superClass: S & AbstractConstructor<DefaultCrudRepository<M, ID, Relations>>): S & AbstractConstructor<DefaultCrudRepository<M, ID, Relations>> & AbstractConstructorWithGuard<M, ID>;
