/// <reference types="i18n" />
import { BindingKey } from '@loopback/core';
import { ExpressRequestHandler } from '@loopback/rest';
import { HttpMethod } from './enums';
import { CoreConfig } from './types';
export declare namespace SFCoreBindings {
    const i18n: BindingKey<i18nAPI>;
    const config: BindingKey<CoreConfig>;
    const EXPRESS_MIDDLEWARES: BindingKey<ExpressRequestHandler[]>;
}
export type OasHiddenApi = {
    path: string;
    httpMethod: HttpMethod;
};
export declare namespace OASBindings {
    const HiddenEndpoint: BindingKey<OasHiddenApi[]>;
}
