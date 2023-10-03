import { Count, DataObject, Getter, juggler, Where, Entity } from '@loopback/repository';
import { Options } from 'loopback-datasource-juggler';
import { DefaultTransactionSoftCrudRepository } from 'loopback4-soft-delete';
import { IAuthUserWithPermissions } from '../components';
import { UserModifiableEntity } from '../models';
export declare abstract class DefaultTransactionalUserModifyRepository<T extends UserModifiableEntity, ID, Relations extends object = {}> extends DefaultTransactionSoftCrudRepository<T, ID, Relations> {
    protected readonly getCurrentUser: Getter<IAuthUserWithPermissions | undefined>;
    constructor(entityClass: typeof Entity & {
        prototype: T;
    }, dataSource: juggler.DataSource, getCurrentUser: Getter<IAuthUserWithPermissions | undefined>);
    create(entity: DataObject<T>, options?: Options): Promise<T>;
    createAll(entities: DataObject<T>[], options?: Options): Promise<T[]>;
    save(entity: T, options?: Options): Promise<T>;
    update(entity: T, options?: Options): Promise<void>;
    updateAll(data: DataObject<T>, where?: Where<T>, options?: Options): Promise<Count>;
    updateById(id: ID, data: DataObject<T>, options?: Options): Promise<void>;
    replaceById(id: ID, data: DataObject<T>, options?: Options): Promise<void>;
}
