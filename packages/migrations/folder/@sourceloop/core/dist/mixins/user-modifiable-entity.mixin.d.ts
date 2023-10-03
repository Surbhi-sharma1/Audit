import { Constructor } from '@loopback/context';
import { Entity } from '@loopback/repository';
import { AbstractConstructor, IUserModifiableEntity, IUserModifiableEntityConfig } from './types';
export declare function UserModifiableEntityMixin<T extends Entity, S extends Constructor<T> | AbstractConstructor<T>>(base: S, config?: IUserModifiableEntityConfig): typeof base & AbstractConstructor<IUserModifiableEntity>;
