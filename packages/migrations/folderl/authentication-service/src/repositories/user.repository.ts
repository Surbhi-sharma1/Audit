// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DataObject,
  HasManyRepositoryFactory,
  HasOneRepositoryFactory,
  juggler,
  repository,
} from '@loopback/repository';
import {Options} from '@loopback/repository/src/common-types';
import {HttpErrors} from '@loopback/rest';
import {
  AuthenticateErrorKeys,
  AuthProvider,
  DefaultUserModifyCrudRepository,
  IAuthUserWithPermissions,
  ILogger,
  LOGGER,
  UserStatus,
} from '@sourceloop/core';
import * as bcrypt from 'bcrypt';
import {AuthenticationBindings, AuthErrorKeys} from 'loopback4-authentication';
import {
  Tenant,
  User,
  UserCredentials,
  UserRelations,
  UserTenant,
} from '../models';
import {AuthDbSourceName} from '../types';
import {OtpRepository} from './otp.repository';
import {TenantRepository} from './tenant.repository';
import {UserCredentialsRepository} from './user-credentials.repository';
import {UserTenantRepository} from './user-tenant.repository';
import NodeRSA from 'node-rsa';
import * as fs from 'fs/promises';
const saltRounds = 10;
export class UserRepository extends DefaultUserModifyCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly credentials: HasOneRepositoryFactory<
    UserCredentials,
    typeof User.prototype.id
  >;
  public readonly tenant: BelongsToAccessor<Tenant, typeof User.prototype.id>;

  public readonly userTenants: HasManyRepositoryFactory<
    UserTenant,
    typeof User.prototype.id
  >;

  constructor(
    @inject(`datasources.${AuthDbSourceName}`)
    dataSource: juggler.DataSource,
    @repository.getter(UserCredentialsRepository)
    getUserCredsRepository: Getter<UserCredentialsRepository>,
    @repository.getter(OtpRepository)
    public getOtpRepository: Getter<OtpRepository>,
    @inject.getter(AuthenticationBindings.CURRENT_USER)
    protected readonly getCurrentUser: Getter<
      IAuthUserWithPermissions | undefined
    >,
    @repository.getter('TenantRepository')
    protected tenantRepositoryGetter: Getter<TenantRepository>,
    @repository.getter('UserTenantRepository')
    protected userTenantRepositoryGetter: Getter<UserTenantRepository>,
    @inject(LOGGER.LOGGER_INJECT) private readonly logger: ILogger,
  ) {
    super(User, dataSource, getCurrentUser);
    this.userTenants = this.createHasManyRepositoryFactoryFor(
      'userTenants',
      userTenantRepositoryGetter,
    );
    this.registerInclusionResolver(
      'userTenants',
      this.userTenants.inclusionResolver,
    );
    this.tenant = this.createBelongsToAccessorFor(
      'defaultTenant',
      tenantRepositoryGetter,
    );
    this.registerInclusionResolver(
      'defaultTenant',
      this.tenant.inclusionResolver,
    );

    this.credentials = this.createHasOneRepositoryFactoryFor(
      'credentials',
      getUserCredsRepository,
    );
    this.registerInclusionResolver(
      'credentials',
      this.credentials.inclusionResolver,
    );
  }

  async create(entity: DataObject<User>, options?: Options): Promise<User> {
    const user = await super.create(entity, options);
    try {
      // Add temporary password for first time
      const password = (await bcrypt.hash(
        process.env.USER_TEMP_PASSWORD as string,
        saltRounds,
      )) as string;
      const creds = new UserCredentials({
        authProvider: 'internal',
        password,
      });
      await this.credentials(user.id).create(creds);
    } catch (err) {
      throw new HttpErrors.UnprocessableEntity('Error while hashing password');
    }
    return user;
  }

  async createWithoutPassword(
    entity: DataObject<User>,
    options?: Options,
  ): Promise<User> {
    return super.create(entity, options);
  }

  async verifyPassword(username: string, password: string): Promise<User> {
    const privateKey=
    "-----BEGIN RSA PRIVATE KEY-----\n" +
    "MIICXgIBAAKBgQD5ChQUKNk2c7P0qc0mHait5H2rEtWz+030lFnKQJ323M6Rd2il\n" +
    "QdVXYB0blJMPfKZtP4oJMxjCdyp8VBxKtH6fraX2nF9OsusIyh25y7RPiFI8tzOG\n" +
    "VvMNpU1sPLqCuL7qrg8+v3SIv6+ekbbYy0uP2fG9oh12dXhj5JW8z5BRCwIDAQAB\n" +
    "AoGBAIH/Us/bKteTuiJC6MW2wbBUD41XfZo/2keLkPtUk6CjTmj8rfFl1hmQIGGf\n" +
    "QszYwn9QpZt7wrbwQYs41LPiWB22iYyenc8Q4bzvU9LBJDl4kBUNbTWsIpf/DEit\n" +
    "R/ytkohPxMqKszBtZcTW4cizT4mwH2UJ/n6HZ4X7/F0UqKwxAkEA/WUka4ERpSLZ\n" +
    "vxXb+ID5uJzhNMU5gqRyi5NfTcRYCAwZcpVD6qaoP2JV9FNsW/bYEBZxxlc7uS8z\n" +
    "GTKD5SPHNQJBAPuZeSeV9AcWAqUS9Ls3kOw1MC98NeuykLtBwLaA4CGJNi2nfYGu\n" +
    "1AegYA/vuLmuoOR5RdTkrp73Y5Bq3LcTfz8CQEKNlxQ5USYbUi+TETRiw7QOWEQg\n" +
    "7Or4QDGSonxtbmWmr+RdefoejaAgNs02QAajfboz+uwKK2CHGherIeNEE2UCQQDu\n" +
    "KLS6eANqwbb3Mx5eKZcRQLe/+z+/QGQoHXGiUBPZKt0SEj2HiEpEfdbwvuaJPXgn\n" +
    "TXSAtYdmCp9AkSckVVxZAkEA0T7FQeho6g1mriPtST49CpWaN/ykh7ok2R9SWplA\n" +
    "7igRORdo1DqTTW9O7+HW/CmjgviVT+A3AhcribBKfUeYow==\n" +
    "-----END RSA PRIVATE KEY-----";
  
   // const privateKey= (await fs.readFile(
   //   process.env.JWT_PUBLIC_KEY ?? '',
   // )) as Buffer;
   let key_private = new NodeRSA(privateKey );
let decryptedPassword = key_private.decrypt(password, "utf8");
console.log(decryptedPassword)
    const user = await super.findOne({
      where: {username: username.toLowerCase()},
    });
    const creds = user && (await this.credentials(user.id).get());
    if (!user || user.deleted) {
      throw new HttpErrors.Unauthorized(AuthenticateErrorKeys.UserDoesNotExist);
    } else if (
      !creds?.password ||
      creds.authProvider !== AuthProvider.INTERNAL ||
      !(await bcrypt.compare(password, creds.password))
    ) {
      this.logger.error('User creds not found in DB or is invalid');
      throw new HttpErrors.Unauthorized(AuthErrorKeys.InvalidCredentials);
    } else {
      return user;
    }
  }

  async updatePassword(
    username: string,
    password: string,
    newPassword: string,
  ): Promise<User> {
    const user = await super.findOne({where: {username}});
    const creds = user && (await this.credentials(user.id).get());
    if (!user || user.deleted || !creds || !creds.password) {
      throw new HttpErrors.Unauthorized(AuthenticateErrorKeys.UserDoesNotExist);
    } else if (creds.authProvider !== AuthProvider.INTERNAL) {
      throw new HttpErrors.BadRequest(
        AuthenticateErrorKeys.PasswordCannotBeChanged,
      );
    } else if (!(await bcrypt.compare(password, creds.password))) {
      throw new HttpErrors.Unauthorized(AuthErrorKeys.WrongPassword);
    } else if (await bcrypt.compare(newPassword, creds.password)) {
      throw new HttpErrors.Unauthorized(
        'Password cannot be same as previous password!',
      );
    } else {
      // Do nothing
    }
    await this.credentials(user.id).patch({
      password: await bcrypt.hash(newPassword, saltRounds),
    });
    return user;
  }

  async changePassword(
    username: string,
    newPassword: string,
    oldPassword?: string,
  ): Promise<User> {
    const user = await super.findOne({where: {username}});
    const creds = user && (await this.credentials(user.id).get());
// decryprt oldPassword
// decrypt newPassword
//  env private
    if (oldPassword) {
      // This method considers old password as OTP
      const otp = await (await this.getOtpRepository()).get(username);
      if (!otp || otp.otp !== oldPassword) {
        throw new HttpErrors.Unauthorized(AuthErrorKeys.WrongPassword);
      }
    }

    if (creds?.authProvider !== AuthProvider.INTERNAL) {
      throw new HttpErrors.Unauthorized(
        AuthenticateErrorKeys.PasswordCannotBeChanged,
      );
    }

    if (!user || user.deleted || !creds || !creds.password) {
      throw new HttpErrors.Unauthorized(AuthenticateErrorKeys.UserDoesNotExist);
      // decryprt 
    } else if (await bcrypt.compare(newPassword, creds.password)) {
      throw new HttpErrors.Unauthorized(
        'Password cannot be same as previous password!',
      );
    } else {
      // DO nothing
    }
    await this.credentials(user.id).patch({
      password: await bcrypt.hash(newPassword, saltRounds),
    });
    return user;
  }

  async updateLastLogin(userId: string): Promise<void> {
    await super.updateById(
      userId,
      {
        lastLogin: Date.now(),
      },
      {
        currentUser: {id: userId},
      },
    );
  }

  async firstTimeUser(userId: string): Promise<boolean> {
    const user = await super.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new HttpErrors.NotFound(AuthenticateErrorKeys.UserDoesNotExist);
    }

    const userTenant = await (
      await this.userTenantRepositoryGetter()
    ).findOne({
      where: {
        userId,
        tenantId: user.defaultTenantId,
        status: {
          inq: [UserStatus.REGISTERED, UserStatus.PASSWORD_CHANGE_NEEDED],
        },
      },
    });
    return !!userTenant;
  }
}
