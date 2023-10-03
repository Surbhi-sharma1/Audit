// import { inject } from '@loopback/context';
// import { repository, AnyObject } from '@loopback/repository';
// import {
//   get,
//   getModelSchemaRef,
//   HttpErrors,
//   param,
//   post,
//   Request,
//   requestBody,
//   Response,
//   RestBindings,
// } from '@loopback/rest';
// import {
//   CONTENT_TYPE,
//   ILogger,
//   LOGGER,
//   STATUS_CODE,
//   X_TS_TYPE,
// } from '@sourceloop/core';
// import * as jwt from 'jsonwebtoken';
// import {
//   authenticate,
//   authenticateClient,
//   AuthenticationBindings,
//   AuthErrorKeys,
//   ClientAuthCode,
//   STRATEGY,
// } from 'loopback4-authentication';
// import { authorize } from 'loopback4-authorization';
// import * as passport from 'passport';
// import { URLSearchParams } from 'url';

// import {
//   User,
//   AuthCodeBindings,
//   CodeWriterFn,
//   AuthClientRepository,
//   AuthCodeGeneratorFn,
// } from '@sourceloop/authentication-service';
// import {
//   AuthUser,
//   TokenResponse,
// } from '@sourceloop/authentication-service/dist/modules/auth';
// import { ClientAuthRequest } from '../models/client-auth-request.dto';
// // import { parse } from 'xml2js';
// // import { verify } from 'xml-crypto';  // For signature verification

// const queryGen = (from: 'body' | 'query') => {
//   return (req: Request) => {
//     return {
//       state: `client_id=${req[from].client_id}`,
//     };
//   };
// };

// export class SamlLoginController {
//   constructor(
//     @repository(AuthClientRepository)
//     public authClientRepository: AuthClientRepository,
//     @inject(LOGGER.LOGGER_INJECT)
//     public logger: ILogger,
//     @inject(AuthCodeBindings.AUTH_CODE_GENERATOR_PROVIDER)
//     private readonly getAuthCode: AuthCodeGeneratorFn,
//   ) // private readonly getAuthCode: AuthCodeGeneratorFn,
//   { }

//   @authenticateClient(STRATEGY.CLIENT_PASSWORD)
//   @authenticate(
//     STRATEGY.SAML,
//     {
//       accessType: 'offline',
//       scope: ['profile', 'email'],
//       // authorizationURL: process.env.SAML_URL,
//       callbackURL: process.env.SAML_CALLBACK_URL,
//       clientID: process.env.SAML_CLIENT_ID,
//       clientSecret: process.env.SAML_CLIENT_SECRET,
//       tokenURL: process.env.SAML_TOKEN_URL,
//       issuer: process.env.SAML_ISSUER,
//       cert: process.env.SAML_META_DATA,
//       entryPoint: process.env.SAML_URL,
//     },
//     queryGen('body'),
//   )
//   @authorize({ permissions: ['*'] })
//   @post('/auth/saml', {
//     description: 'POST Call for saml based login',
//     responses: {
//       [STATUS_CODE.OK]: {
//         description: 'Saml Token Response',
//         content: {
//           [CONTENT_TYPE.JSON]: {
//             schema: { [X_TS_TYPE]: TokenResponse },
//           },
//         },
//       },
//     },
//   })
//   async postLoginViaSaml(
//     @requestBody({
//       content: {
//         [CONTENT_TYPE.FORM_URLENCODED]: {
//           schema: getModelSchemaRef(ClientAuthRequest),
//         },
//       },
//     })
//     clientCreds?: ClientAuthRequest, //NOSONAR
//   ): Promise<void> {
//     console.log('----clientCreds------------', clientCreds);
//     //do nothing
//   }

//   /*
//   @authenticate(
//     STRATEGY.SAML,
//     {
//       accessType: 'offline',
//       scope: ['profile', 'email'],
//       authorizationURL: process.env.SAML_URL,
//       callbackURL: process.env.SAML_CALLBACK_URL,
//       clientID: process.env.SAML_CLIENT_ID,
//       clientSecret: process.env.SAML_CLIENT_SECRET,
//       tokenURL: process.env.SAML_TOKEN_URL,
//     },
//     queryGen('query'),
//   )
//   @authorize({ permissions: ['*'] })
//   @get('/auth/saml-redirect', {
//     responses: {
//       [STATUS_CODE.OK]: {
//         description: 'Saml Redirect Token Response',
//         content: {
//           [CONTENT_TYPE.JSON]: {
//             schema: { [X_TS_TYPE]: TokenResponse },
//           },
//         },
//       },
//     },
//   })
//   async samlCallback(
//     @param.query.string('code') code: string, //NOSONAR
//     @param.query.string('state') state: string,
//     @param.query.string('session_state') sessionState: string, //NOSONAR
//     @inject(RestBindings.Http.RESPONSE) response: Response,
//     @inject(AuthenticationBindings.CURRENT_USER)
//     user: AuthUser | undefined,
//   ): Promise<void> {
//     const clientId = new URLSearchParams(state).get('client_id');
//     if (!clientId || !user) {
//       throw new HttpErrors.Unauthorized(AuthErrorKeys.ClientInvalid);
//     }
//     const client = await this.authClientRepository.findOne({
//       where: {
//         clientId,
//       },
//     });
//     if (!client?.redirectUrl) {
//       throw new HttpErrors.Unauthorized(AuthErrorKeys.ClientInvalid);
//     }
//     try {
//       const token = await this.getAuthCode(client, user);
//       response.redirect(`${client.redirectUrl}?code=${token}`);
//     } catch (error) {
//       this.logger.error(error);
//       throw new HttpErrors.Unauthorized(AuthErrorKeys.InvalidCredentials);
//     }
//   }
// */

//   @authenticate(
//     STRATEGY.SAML,
//     {
//       accessType: 'offline',
//       scope: ['profile', 'email'],
//       // authorizationURL: process.env.SAML_URL,
//       // callbackURL: process.env.SAML_CALLBACK_URL,
//       // clientID: process.env.SAML_CLIENT_ID,
//       // clientSecret: process.env.SAML_CLIENT_SECRET,
//       // tokenURL: process.env.SAML_TOKEN_URL,
//       // path: '/auth/saml-redirect',
//       issuer: process.env.SAML_ISSUER,
//       cert: process.env.SAML_CERT,
//       entryPoint: process.env.SAML_URL,
//       audience: process.env.SAML_AUDIENCE,
//       logoutUrl: process.env.SAML_LOGOUT_URL,
//       passReqToCallback: true,
//       validateInResponseTo: true,
//       additionalParams: {
//         RelayState: 'req.params.ssokey',
//       },
//     },
//     queryGen('query'),
//   )
//   @authorize({ permissions: ['*'] })
//   @post(`/auth/saml-redirect`, {
//     responses: {
//       [STATUS_CODE.OK]: {
//         description: 'okta auth callback',
//         content: {
//           [CONTENT_TYPE.JSON]: {
//             schema: { [X_TS_TYPE]: TokenResponse },
//           },
//         },
//       },
//     },
//   })
//   async oktaSamlCallback(
//     @inject(AuthenticationBindings.CURRENT_USER)
//     user: AuthUser | undefined,
//     @inject(RestBindings.Http.REQUEST) request: Request,
//     @param.query.string('client') clientId: string,
//     @inject(RestBindings.Http.RESPONSE) response: Response,
//     @requestBody({
//       content: {
//         [CONTENT_TYPE.FORM_URLENCODED]: {},
//       },
//     })
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     oktaReq: any,
//   ): Promise<void> {
//     // const clientId = 'superadmin'; //user?.authClientIds[2, 'superadmin'];
//     if (!clientId || !user) {
//       throw new HttpErrors.Unauthorized(AuthErrorKeys.ClientInvalid);
//     }
//     const client = await this.authClientRepository.findOne({
//       where: {
//         clientId,
//       },
//     });
//     if (!client?.redirectUrl) {
//       throw new HttpErrors.Unauthorized(AuthErrorKeys.ClientInvalid);
//     }
//     try {
//       const token = await this.getAuthCode(client, user);
//       console.log('--', token);
//       response.redirect(`${client.redirectUrl}?code=${token}`);
//     } catch (error) {
//       this.logger.error(error);
//       throw new HttpErrors.Unauthorized(AuthErrorKeys.InvalidCredentials);
//     }
//   }

//   /*
//   @authenticate(
//     STRATEGY.SAML,
//     {
//       accessType: 'offline',
//       scope: ['profile', 'email'],
//       // authorizationURL: process.env.SAML_URL,
//       // callbackURL: process.env.SAML_CALLBACK_URL,
//       // clientID: process.env.SAML_CLIENT_ID,
//       // clientSecret: process.env.SAML_CLIENT_SECRET,
//       // tokenURL: process.env.SAML_TOKEN_URL,
//       issuer: process.env.SAML_ISSUER,
//       cert: process.env.SAML_CERT,
//       entryPoint: process.env.SAML_URL,
//       audience: process.env.SAML_AUDIENCE,
//     },
//     queryGen('query'),
//   )
//   @authorize({ permissions: ['*'] })
//   @post('/auth/saml-redirectsssssssssssssss', {
//     responses: {
//       [STATUS_CODE.OK]: {
//         description: 'Saml Redirect Token Response',
//         content: {
//           [CONTENT_TYPE.JSON]: {
//             schema: { [X_TS_TYPE]: TokenResponse },
//           },
//         },
//       },
//     },
//   })
//   async samlValidateCallback(
//     // @param.query.string('state') state: string,
//     // @inject(RestBindings.Http.REQUEST) request: Request,
//     // @inject(RestBindings.Http.RESPONSE) encodedResponse: Response,
//     @requestBody({
//       content: {
//         [CONTENT_TYPE.FORM_URLENCODED]: {},
//       },
//     })
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     oktaReq: any,
//   ): Promise<void> {

//     // const clientId = new URLSearchParams(state).get('client_id');
//     console.log('----oktaReq****************-----', oktaReq);

//     /*
//         passport.authenticate('saml', { failureRedirect: '/', failureFlash: true })(request, response, (err: AnyObject, user: AnyObject) => {
//           console.log('----response.status---------', response.status);
//           if (err) {
//             // Handle authentication error
//             console.error(err);
//             // response.status(500).send({ error: err.message });
//             // return;
//           }
//           /*
//                 const clientId = new URLSearchParams(state).get('client_id');
//                 if (!clientId || !user) {
//                   throw new HttpErrors.Unauthorized(AuthErrorKeys.ClientInvalid);
//                 }
//                 const client = await this.authClientRepository.findOne({
//                   where: {
//                     clientId,
//                   },
//                 });
//                 if (!client?.redirectUrl) {
//                   throw new HttpErrors.Unauthorized(AuthErrorKeys.ClientInvalid);
//                 }
//                 try {
//                   const token = await this.getAuthCode(client, user);
//                   response.redirect(`${client.redirectUrl}?code=${token}`);
//                 } catch (error) {
//                   this.logger.error(error);
//                   throw new HttpErrors.Unauthorized(AuthErrorKeys.InvalidCredentials);
//                 }
//                 *
//       });
//       */
//   // }

//   /*
  
//       // async function validateSamlResponse(encodedResponse: string) {
//       const decodedResponse = Buffer.from(encodedResponse, 'base64').toString('utf8');
  
//       const parsedResponse = await parseStringPromise(decodedResponse);  // xml2js function to parse XML
//       const assertion = parsedResponse['samlp:Response']['saml:Assertion'];
  
//       // Check the issuer
//       if (assertion['saml:Issuer'] !== 'EXPECTED_ISSUER') {
//         throw new Error('Invalid Issuer');
//       }
  
//       // Check the audience
//       const audience = assertion['saml:Conditions']['saml:AudienceRestriction']['saml:Audience'];
//       if (audience !== 'YOUR_SERVICE_PROVIDER_ENTITY_ID') {
//         throw new Error('Invalid Audience');
//       }
  
//       // Check the signature (this is a simplified example; you may need to adjust for your specific SAML response)
//       const signature = parsedResponse['Signature'];
//       const verifier = verify(/* provide necessary params and certificate *);
//       if (!verifier.checkSignature(signature)) {
//         throw new Error('Invalid Signature');
//       }
  
//       // Extract user details as required
//       const nameID = assertion['saml:Subject']['saml:NameID'];
  
//       // Return the parsed details or any other relevant information
//       return {
//         nameID: nameID
//         // ... Extract other user details as necessary
//       };
//       *
// }
// */

//   /*convertCertificate
// cert convert to string format in saml case
// * */
//   convertCertificate(cert: string) {
//     //Certificate must be in this specific format or else the function won't accept it
//     const beginCert = '-----BEGIN CERTIFICATE-----';
//     const endCert = '-----END CERTIFICATE-----';

//     cert = cert.replace('\n', '');
//     cert = cert.replace(beginCert, '');
//     cert = cert.replace(endCert, '');

//     let result = beginCert;
//     while (cert.length > 0) {
//       if (cert.length > 64) {
//         result += '\n' + cert.substring(0, 64);
//         cert = cert.substring(64, cert.length);
//       } else {
//         result += '\n' + cert;
//         cert = '';
//       }
//     }

//     if (result[result.length] !== '\n') result += '\n';
//     result += endCert + '\n';
//     return result;
//   }
// }