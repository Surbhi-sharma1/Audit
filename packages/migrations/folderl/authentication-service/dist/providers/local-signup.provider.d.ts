import { Provider } from '@loopback/context';
import { LocalUserProfileDto } from '../models/local-user-profile';
import { UserSignupFn } from '../types';
export declare class LocalSignupProvider implements Provider<UserSignupFn<LocalUserProfileDto, LocalUserProfileDto>> {
    value(): UserSignupFn<LocalUserProfileDto, LocalUserProfileDto>;
}
