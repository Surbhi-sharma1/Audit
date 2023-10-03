import { Binding, Component, ProviderMap } from '@loopback/core';
import { Class, Model, Repository } from '@loopback/repository';
import { ILogger } from '../logger-extension';
import { BearerVerifierConfig } from './keys';
export declare class BearerVerifierComponent implements Component {
    private readonly config;
    logger: ILogger;
    constructor(config: BearerVerifierConfig, logger: ILogger);
    providers?: ProviderMap;
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
}
