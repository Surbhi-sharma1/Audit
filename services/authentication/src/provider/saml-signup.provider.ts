
import { inject, Provider } from '@loopback/context';
import { repository } from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';
import {
  AuthClient,
  SamlSignUpFn,
  TenantRepository,
  UserCredentialsRepository,
  UserRepository,
} from '@sourceloop/authentication-service';
import { AuthenticationBindings, AuthErrorKeys } from 'loopback4-authentication';


export class SamlSignupProvider implements Provider<SamlSignUpFn> {
  constructor(
    // @repository(UserSignupRepository)
    // public userSignupRepository: UserSignupRepository,
    @repository(UserRepository)
    public userRepository: UserRepository,
    @repository(TenantRepository)
    public tenantRepository: TenantRepository,
    @repository(UserCredentialsRepository)
    public userCredsRepository: UserCredentialsRepository,
    // @repository(TenantsAuthClientsRepository)
    // protected tenantsAuthClientsRepository: TenantsAuthClientsRepository,
    @inject(AuthenticationBindings.CURRENT_CLIENT)
    private readonly client: AuthClient | undefined,
  ) { }

  value(): SamlSignUpFn {
    return async profile => {
      console.log('-----SAML****profile-----', profile);
      // Find 1st tenant associated with this client_id
    /*  const firstTenant = await this.tenantsAuthClientsRepository.findOne({
        where: {
          authClientId: this.client?.id,
        },
      });

    //   if (!firstTenant) {
    //     throw new HttpErrors.Unauthorized(ErrorKeys.MissingTenant);
    //   }

      const tenant = await this.tenantRepository.findOne({
        where: {
          id: firstTenant.tenantId,
        },
      });
      if (!tenant) {
        throw new HttpErrors.Unauthorized(AuthErrorKeys.InvalidCredentials);
      }
      const userEmail = profile.email;
      if (!userEmail) {
        throw new HttpErrors.Unauthorized(
          `Invalid request, user's email id is mandatory.`,
        );
      }
      // find user details
      const userDetails = await this.userSignupRepository.findOne({
        where: {
          email: profile.email,
          status: 1,
        },
      });
      if (userDetails) {
        // This function checks entry in userCreds table, if not exists, then create that, also adding entry in user-tenant table ..
        await this.userSignupRepository.signupUser(
          userDetails,
          'saml',
          profile.ID,
        );
*/
        // Return user details
        const user = await this.userRepository.findOne({
          where: {
            email: profile.email,
          },
        });
        if (!user?.id) {
          throw new HttpErrors.Unauthorized(AuthErrorKeys.InvalidCredentials);
        }
        // user.authClientIds = profile.client_id as string;
        return user;
    //else {
    //     throw new HttpErrors.Unauthorized(
    //       `User is not registered into the system`,
    //     );
    //   }
    };
  }
}