import { Model } from '@loopback/repository';
export declare class SuccessResponse extends Model {
    success?: boolean;
    [prop: string]: any;
    constructor(data?: Partial<SuccessResponse>);
}
