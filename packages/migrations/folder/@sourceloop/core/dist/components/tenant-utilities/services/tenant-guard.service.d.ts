import { Getter } from '@loopback/core';
import { DataObject, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { EntityWithTenantId, ITenantGuard, UserInToken } from '../types';
export declare class TenantGuardService<T extends EntityWithTenantId, ID> implements ITenantGuard<T, ID> {
    readonly getCurrentUser: Getter<UserInToken>;
    constructor(getCurrentUser: Getter<UserInToken>);
    skipTenantGuard(): Promise<boolean>;
    find(filter?: Filter<T>): Promise<Filter<T>>;
    findOne(filter?: Filter<T>): Promise<Filter<T>>;
    findById(id: ID, filter?: FilterExcludingWhere<T>): Promise<Filter<T>>;
    count(where?: Where<T>): Promise<Where<T>>;
    exists(id: ID): Promise<Where<T>>;
    create(data: DataObject<T>): Promise<DataObject<T>>;
    createAll<R extends DataObject<T> | T>(data: R[]): Promise<R[]>;
    save(entity: T): Promise<T>;
    replaceById(id: ID, data: DataObject<T>): Promise<{
        data: DataObject<T>;
        where: Where<T>;
    }>;
    updateById<R extends DataObject<T> | T>(id: ID, data: R): Promise<{
        data: R;
        where: Where<T>;
    }>;
    update(data: T): Promise<{
        data: T;
        where: Where<T>;
    }>;
    updateAll(data: DataObject<T>, where?: Where<T>): Promise<{
        data: DataObject<T>;
        where: Where<T>;
    }>;
    deleteById(id: ID): Promise<Where<T>>;
    delete(entity: T): Promise<{
        where: Where<T>;
        entity: T;
    }>;
    deleteAll(where?: Where<T>): Promise<Where<T>>;
    private checkTenantId;
    private addTenantId;
    private addTenantIDMultiple;
    private addTenantToWhere;
    private addTenantToFilter;
    private buildWhere;
}
