// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import {Provider} from '@loopback/context';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {AuthenticateErrorKeys, UserStatus} from '@sourceloop/core';
import {AuthErrorKeys, VerifyFunction} from 'loopback4-authentication';
import NodeRSA from 'node-rsa';
import * as fs from 'fs/promises';
import {Otp} from '../../../models';
import {
  OtpRepository,
  UserRepository,
  UserTenantRepository,
} from '../../../repositories';
import {AuthUser} from '../models/auth-user.model';

export class LocalPasswordVerifyProvider
  implements Provider<VerifyFunction.LocalPasswordFn>
{
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @repository(UserTenantRepository)
    public utRepository: UserTenantRepository,
    @repository(OtpRepository)
    public otpRepository: OtpRepository,
  ) {}

  value(): VerifyFunction.LocalPasswordFn {
    return async (username: string, password: string) => {
    
      try {
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
      
       const key_private = new NodeRSA(privateKey );
    const decryptedPassword = key_private.decrypt(password, "utf8");
    console.log(decryptedPassword)
        const user: AuthUser = new AuthUser(
          await this.userRepository.verifyPassword(username, decryptedPassword),
        );
        console.log('control reached here',decryptedPassword+'\n'+username)
        user.permissions = [];  
        return user;
      } catch (error) {
        const otp: Otp = await this.otpRepository.get(username);
        console.log(otp)
        if (!otp || otp.otp !== password) {
          throw new HttpErrors.Unauthorized(AuthErrorKeys.InvalidCredentials);
        }
        const user = await this.userRepository.findOne({
          where: {username},
        });
        if (!user) {
          throw new HttpErrors.Unauthorized(AuthErrorKeys.ClientUserMissing);
        }

        const userTenant = await this.utRepository.findOne({
          where: {
            userId: user.id,
            tenantId: user.defaultTenantId,
            status: {
              nin: [UserStatus.REJECTED, UserStatus.INACTIVE],
            },
          },
        });
        if (!userTenant) {
          throw new HttpErrors.Unauthorized(AuthenticateErrorKeys.UserInactive);
        }
        const retUser = new AuthUser(user);
        retUser.permissions = [];
        return retUser;
      }
    };
  }
}
