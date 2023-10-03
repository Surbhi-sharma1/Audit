import { Adapter } from './i-adapter';
export declare class AnyAdapter implements Adapter<any, any> {
    adaptToModel(resp: any): any;
    adaptFromModel(data: any): any;
}
