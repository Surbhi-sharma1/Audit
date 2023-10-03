import { Provider } from '@loopback/context';
import { SignupRequestDto } from '../models/signup-request-dto.model';
import { PreSignupFn } from '../types';
export declare class LocalPreSignupProvider implements Provider<PreSignupFn<SignupRequestDto, {
    email: string;
}>> {
    value(): PreSignupFn<SignupRequestDto, {
        email: string;
    }>;
}
