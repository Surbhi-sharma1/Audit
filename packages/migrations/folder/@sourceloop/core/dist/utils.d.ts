import { Request } from '@loopback/rest';
export declare const getErrorString: (error: any) => any;
export declare const getAge: (dob: Date) => number;
export declare const getDOBFromAge: (age: number) => Date;
export declare const rateLimitKeyGen: (req: Request) => string;
export declare const rateLimitKeyGenPublic: (req: Request) => string;
