import { Provider } from '@loopback/context';
import { AzureAdPostVerifyFn } from './types';
export declare class AzurePostVerifyProvider implements Provider<AzureAdPostVerifyFn> {
    value(): AzureAdPostVerifyFn;
}
