import { Constructor } from '@loopback/context';
import { Entity } from '@loopback/repository';
import { AbstractConstructor, IBaseEntityConfig, IBaseEntity } from './types';
export declare function BaseEntityMixin<T extends Entity, S extends Constructor<T> | AbstractConstructor<T>>(base: S, config?: IBaseEntityConfig): typeof base & AbstractConstructor<IBaseEntity>;
