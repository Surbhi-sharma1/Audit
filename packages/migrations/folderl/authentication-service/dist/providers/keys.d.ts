import { BindingKey } from '@loopback/core';
import { VerifyFunction } from 'loopback4-authentication';
import { SignupTokenHandlerFn } from '.';
import { PreSignupFn, UserSignupFn } from '../types';
import { AuthCodeGeneratorProvider } from './auth-code-generator.provider';
import { GooglePostVerifyFn, GooglePreVerifyFn, GoogleSignUpFn, InstagramPostVerifyFn, InstagramPreVerifyFn, InstagramSignUpFn, ApplePostVerifyFn, ApplePreVerifyFn, AppleSignUpFn, FacebookSignUpFn, FacebookPreVerifyFn, FacebookPostVerifyFn, KeyCloakPostVerifyFn, KeyCloakPreVerifyFn, KeyCloakSignUpFn, CodeReaderFn, CodeWriterFn, OtpGenerateFn, OtpSenderFn, OtpFn, MfaCheckFn, AzureAdSignUpFn, AzureAdPreVerifyFn, AzureAdPostVerifyFn, CognitoSignUpFn, CognitoPreVerifyFn, CognitoPostVerifyFn, JWTSignerFn, JWTVerifierFn, SamlSignUpFn, SamlPostVerifyFn, SamlPreVerifyFn } from './types';
export declare namespace SignUpBindings {
    const GOOGLE_SIGN_UP_PROVIDER: BindingKey<GoogleSignUpFn>;
    const INSTAGRAM_SIGN_UP_PROVIDER: BindingKey<InstagramSignUpFn>;
    const APPLE_SIGN_UP_PROVIDER: BindingKey<AppleSignUpFn>;
    const FACEBOOK_SIGN_UP_PROVIDER: BindingKey<FacebookSignUpFn>;
    const KEYCLOAK_SIGN_UP_PROVIDER: BindingKey<KeyCloakSignUpFn>;
    const AZURE_AD_SIGN_UP_PROVIDER: BindingKey<AzureAdSignUpFn>;
    const COGNITO_SIGN_UP_PROVIDER: BindingKey<CognitoSignUpFn>;
    const SAML_SIGN_UP_PROVIDER: BindingKey<SamlSignUpFn>;
    const PRE_LOCAL_SIGNUP_PROVIDER: BindingKey<PreSignupFn<any, any>>;
    const LOCAL_SIGNUP_PROVIDER: BindingKey<UserSignupFn<any, any>>;
    const SIGNUP_HANDLER_PROVIDER: BindingKey<SignupTokenHandlerFn>;
}
export declare namespace VerifyBindings {
    const GOOGLE_PRE_VERIFY_PROVIDER: BindingKey<GooglePreVerifyFn>;
    const GOOGLE_POST_VERIFY_PROVIDER: BindingKey<GooglePostVerifyFn>;
    const INSTAGRAM_POST_VERIFY_PROVIDER: BindingKey<InstagramPostVerifyFn>;
    const INSTAGRAM_PRE_VERIFY_PROVIDER: BindingKey<InstagramPreVerifyFn>;
    const APPLE_PRE_VERIFY_PROVIDER: BindingKey<ApplePreVerifyFn>;
    const APPLE_POST_VERIFY_PROVIDER: BindingKey<ApplePostVerifyFn>;
    const FACEBOOK_POST_VERIFY_PROVIDER: BindingKey<FacebookPostVerifyFn>;
    const FACEBOOK_PRE_VERIFY_PROVIDER: BindingKey<FacebookPreVerifyFn>;
    const KEYCLOAK_PRE_VERIFY_PROVIDER: BindingKey<KeyCloakPreVerifyFn>;
    const KEYCLOAK_POST_VERIFY_PROVIDER: BindingKey<KeyCloakPostVerifyFn>;
    const COGNITO_PRE_VERIFY_PROVIDER: BindingKey<CognitoPreVerifyFn>;
    const COGNITO_POST_VERIFY_PROVIDER: BindingKey<CognitoPostVerifyFn>;
    const SAML_PRE_VERIFY_PROVIDER: BindingKey<SamlPreVerifyFn>;
    const SAML_POST_VERIFY_PROVIDER: BindingKey<SamlPostVerifyFn>;
    const OTP_PROVIDER: BindingKey<OtpFn>;
    const OTP_GENERATE_PROVIDER: BindingKey<OtpGenerateFn>;
    const OTP_SENDER_PROVIDER: BindingKey<OtpSenderFn>;
    const MFA_PROVIDER: BindingKey<MfaCheckFn>;
    const BEARER_SIGNUP_VERIFY_PROVIDER: BindingKey<VerifyFunction.GenericAuthFn<any>>;
    const AZURE_AD_PRE_VERIFY_PROVIDER: BindingKey<AzureAdPreVerifyFn>;
    const AZURE_AD_POST_VERIFY_PROVIDER: BindingKey<AzureAdPostVerifyFn>;
}
export declare namespace AuthCodeBindings {
    const CODEWRITER_PROVIDER: BindingKey<CodeWriterFn>;
    const CODEREADER_PROVIDER: BindingKey<CodeReaderFn>;
    const AUTH_CODE_GENERATOR_PROVIDER: BindingKey<AuthCodeGeneratorProvider>;
    const JWT_SIGNER: BindingKey<JWTSignerFn<object>>;
    const JWT_VERIFIER: BindingKey<JWTVerifierFn<string>>;
}
