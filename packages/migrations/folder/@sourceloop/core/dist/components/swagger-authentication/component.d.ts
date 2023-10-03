import { Binding, Component, ProviderMap } from '@loopback/core';
import { Class, Model, Repository } from '@loopback/repository';
import { RestApplication } from '@loopback/rest';
export declare class SwaggerAuthenticationComponent implements Component {
    private readonly application;
    providers?: ProviderMap;
    bindings: Binding[];
    repositories?: Class<Repository<Model>>[];
    models?: Class<Model>[];
    constructor(application: RestApplication);
}
