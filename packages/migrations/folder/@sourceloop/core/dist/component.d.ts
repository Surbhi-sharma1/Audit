/// <reference types="i18n" />
import { Binding, Component, ProviderMap } from '@loopback/core';
import { ExpressRequestHandler, RestApplication } from '@loopback/rest';
import { CoreConfig } from './types';
export declare class CoreComponent implements Component {
    private readonly application;
    private readonly coreConfig;
    private readonly expressMiddlewares;
    constructor(application: RestApplication, coreConfig: CoreConfig, expressMiddlewares: ExpressRequestHandler[]);
    localeObj: i18nAPI;
    providers?: ProviderMap;
    bindings: Binding[];
}
