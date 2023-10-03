import { Model } from '@loopback/repository';
export declare class ValueResponse extends Model {
    currValue?: number;
    oldValue?: number;
    constructor(data?: Partial<ValueResponse>);
}
