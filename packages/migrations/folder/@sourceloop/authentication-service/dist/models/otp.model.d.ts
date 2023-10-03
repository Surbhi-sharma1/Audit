import { Entity } from '@loopback/repository';
export declare class Otp extends Entity {
    otp: string;
    username: string;
    constructor(data?: Partial<Otp>);
}
