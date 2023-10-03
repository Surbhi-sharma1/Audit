import { BaseEntity } from './base-entity.model';
export declare abstract class UserModifiableEntity extends BaseEntity {
    createdBy?: string;
    modifiedBy?: string;
}
