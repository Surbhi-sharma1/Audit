import { OASEnhancer, OpenApiSpec } from '@loopback/rest';
import { OasHiddenApi } from '../keys';
/**
 * A spec enhancer to modify paths
 */
export declare class OperationSpecEnhancer implements OASEnhancer {
    private readonly hidden;
    name: string;
    constructor(hidden: OasHiddenApi[]);
    modifySpec(spec: OpenApiSpec): OpenApiSpec;
}
