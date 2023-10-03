import { Model } from '@loopback/repository';
export declare class UpsertResponse extends Model {
    created?: object;
    updated?: object;
    failed?: object;
    [prop: string]: any;
    constructor(data?: Partial<UpsertResponse>);
}
