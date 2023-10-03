import { inject, Provider } from '@loopback/context';
import { repository } from '@loopback/repository';
import { HttpErrors, Request } from '@loopback/rest';

import * as SamlStrategy from '@node-saml/passport-saml';
import { SamlSignUpFn, SignUpBindings, UserCredentialsRepository, UserRepository } from '@sourceloop/authentication-service';
import { AuthUser } from '@sourceloop/authentication-service/dist/modules/auth/models/auth-user.model';
import { AuthErrorKeys, VerifyFunction } from 'loopback4-authentication';

export class SamlVerifyProvider implements Provider<VerifyFunction.SamlFn> {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @repository(UserCredentialsRepository)
    public userCredsRepository: UserCredentialsRepository,
    @inject(SignUpBindings.SAML_SIGN_UP_PROVIDER)
    private readonly signupProvider: SamlSignUpFn,
  ) { }

  value(): VerifyFunction.SamlFn {
    return async (
      profile: SamlStrategy.Profile,
      cb: SamlStrategy.VerifiedCallback,
      req?: Request,
    ) => {
      console.log('----profile-----', profile);
      console.log('----cb-----', cb);
      console.log('----req-----', req);

      // value(): VerifyFunction.SamlFn {
      //   return async (accessToken, refreshToken, profile) => {
      console.log('******************local SAML provider************', profile);
     // const user = await this.signupProvider(profile);
      const user = await this.userRepository.findOne({
        where: {
          email: profile.email,
        },
      });
      if (!user?.id) {
        console.log('user',user)
        throw new HttpErrors.Unauthorized(AuthErrorKeys.InvalidCredentials);
      }
      console.log('---user-----', user);

      console.log('---user-----', user);
      if (user == null) {
        throw new HttpErrors.Unauthorized(AuthErrorKeys.CodeExpired);
      }
      // Just to check if userCreds has entry for this user for this provider
      const creds = await this.userCredsRepository.findOne({
        where: {
          userId: user.id,
         // authProvider: 'saml',
        },
      });
      console.log('----creds-----', creds);
      if (
        !creds 
      ) {
        throw new HttpErrors.Unauthorized(AuthErrorKeys.KeyInvalid);
      }

      const authUser: AuthUser = new AuthUser(user);
      authUser.permissions = [];
      return authUser;
    };
  }
}