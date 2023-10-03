import { Provider } from '@loopback/context';
import { AzureAdPreVerifyFn } from './types';
export declare class AzurePreVerifyProvider implements Provider<AzureAdPreVerifyFn> {
    value(): AzureAdPreVerifyFn;
}
