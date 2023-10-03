import { SignupRequestDto } from '../models/signup-request-dto.model';
import { LocalUserProfileDto } from '../models/local-user-profile';
import { SignupWithTokenReponseDto } from '../models/signup-with-token-response-dto.model';
import { PreSignupFn, UserSignupFn } from '../types';
import { SignupRequest } from '../models/signup-request.model';
import { SignupTokenHandlerFn } from '../providers';
import { AnyObject } from '@loopback/repository';
export declare class SignupRequestController {
    private readonly preSignupFn;
    private readonly userSignupFn;
    constructor(preSignupFn: PreSignupFn<LocalUserProfileDto, AnyObject>, userSignupFn: UserSignupFn<LocalUserProfileDto, AnyObject>);
    requestSignup(signUpRequest: SignupRequestDto<LocalUserProfileDto>, handler: SignupTokenHandlerFn): Promise<void>;
    signupWithToken(req: LocalUserProfileDto, signupUser: SignupRequest): Promise<SignupWithTokenReponseDto<AnyObject>>;
    verifyInviteToken(signupUser: SignupRequest): Promise<SignupRequest>;
}
