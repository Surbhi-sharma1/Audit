import { SoftCrudRepository, SoftDeleteEntity } from 'loopback4-soft-delete';
export declare class DefaultSoftCrudRepository<T extends SoftDeleteEntity, ID, Relations extends object = {}> extends SoftCrudRepository<T, ID, Relations> {
}
