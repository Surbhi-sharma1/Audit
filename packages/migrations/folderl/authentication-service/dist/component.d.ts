import { Binding, Component, ControllerClass, ProviderMap } from '@loopback/core';
import { Class, Model, Repository } from '@loopback/repository';
import { RestApplication } from '@loopback/rest';
import { AuthenticationConfig } from 'loopback4-authentication';
import { IAuthServiceConfig, IMfaConfig, IOtpConfig } from './types';
export declare class AuthenticationServiceComponent implements Component {
    private readonly application;
    private readonly mfaConfig;
    private readonly otpConfig;
    private readonly authConfig?;
    private readonly config?;
    constructor(application: RestApplication, mfaConfig: IMfaConfig, otpConfig: IOtpConfig, authConfig?: IAuthServiceConfig | undefined, config?: AuthenticationConfig | undefined);
    providers: ProviderMap;
    bindings: Binding[];
    /**
     * An optional list of Repository classes to bind for dependency injection
     * via `app.repository()` API.
     */
    repositories?: Class<Repository<Model>>[];
    /**
     * An optional list of Model classes to bind for dependency injection
     * via `app.model()` API.
     */
    models?: Class<Model>[];
    /**
     * An array of controller classes
     */
    controllers?: ControllerClass[];
    /**
     * Setup ServiceSequence by default if no other sequnce provided
     *
     * @param bindings Binding array
     */
    setupSequence(): void;
    setupAuthenticationComponent(secureClient?: boolean): void;
    setupAuthorizationComponent(): void;
    setupMultiFactorAuthentication(): void;
}
