export interface Adapter<T, R> {
    adaptToModel(resp: R, ...rest: any[]): T;
    adaptFromModel(data: T, ...rest: any[]): R;
}
