import { ReferenceObject, SecuritySchemeObject } from '@loopback/openapi-v3';
export declare const OPERATION_SECURITY_SPEC: {
    HTTPBearer: never[];
}[];
export type SecuritySchemeObjects = {
    [securityScheme: string]: SecuritySchemeObject | ReferenceObject;
};
export declare const SECURITY_SCHEME_SPEC: SecuritySchemeObjects;
