"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreComponent = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const i18n_1 = require("i18n");
const loopback4_helmet_1 = require("loopback4-helmet");
const loopback4_ratelimiter_1 = require("loopback4-ratelimiter");
const swstats = tslib_1.__importStar(require("swagger-stats"));
const components_1 = require("./components");
const operation_spec_enhancer_1 = require("./enhancer/operation-spec-enhancer");
const keys_1 = require("./keys");
let CoreComponent = class CoreComponent {
    constructor(application, coreConfig, expressMiddlewares) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        this.application = application;
        this.coreConfig = coreConfig;
        this.expressMiddlewares = expressMiddlewares;
        this.localeObj = {};
        this.providers = {};
        this.bindings = [];
        const middlewares = [];
        if (this.expressMiddlewares) {
            middlewares.push(...this.expressMiddlewares);
        }
        // Mount logger component
        this.application.component(components_1.LoggerExtensionComponent);
        this.application.component(loopback4_helmet_1.Loopback4HelmetComponent);
        this.application.component(loopback4_ratelimiter_1.RateLimiterComponent);
        // Enable OBF
        if (((_a = this.coreConfig) === null || _a === void 0 ? void 0 : _a.enableObf) && ((_b = this.coreConfig) === null || _b === void 0 ? void 0 : _b.openapiSpec)) {
            const middlewareConfig = Object.assign((_c = this.coreConfig.swaggerStatsConfig) !== null && _c !== void 0 ? _c : {}, {
                name: (_d = this.coreConfig) === null || _d === void 0 ? void 0 : _d.name,
                uriPath: (_f = (_e = this.coreConfig) === null || _e === void 0 ? void 0 : _e.obfPath) !== null && _f !== void 0 ? _f : `/obf`,
                swaggerSpec: (_g = this.coreConfig) === null || _g === void 0 ? void 0 : _g.openapiSpec,
                authentication: (_h = this.coreConfig.authentication) !== null && _h !== void 0 ? _h : false,
            });
            const swStatsMiddleware = swstats.getMiddleware({
                ...middlewareConfig,
                onAuthenticate: this.coreConfig.swaggerAuthenticate
                    ? this.coreConfig.swaggerAuthenticate
                    : (req, username, password) => {
                        return (username === this.coreConfig.swaggerUsername &&
                            password === this.coreConfig.swaggerPassword);
                    },
            });
            middlewares.push(swStatsMiddleware);
        }
        if ((_j = this.coreConfig) === null || _j === void 0 ? void 0 : _j.authenticateSwaggerUI) {
            this.application.component(components_1.SwaggerAuthenticationComponent);
        }
        // Configure locale provider
        if ((_k = this.coreConfig) === null || _k === void 0 ? void 0 : _k.configObject) {
            (0, i18n_1.configure)({ ...this.coreConfig.configObject, register: this.localeObj });
        }
        else {
            (0, i18n_1.configure)({
                locales: [
                    "en" /* LocaleKey.en */,
                    "es" /* LocaleKey.es */,
                    "pt-br" /* LocaleKey.ptBr */,
                    "pt-pt" /* LocaleKey.ptPt */,
                    "es-co" /* LocaleKey.esCo */,
                ],
                fallbacks: {
                    ["es" /* LocaleKey.es */]: 'en',
                    ["es-co" /* LocaleKey.esCo */]: 'en',
                    ["pt-br" /* LocaleKey.ptBr */]: 'en',
                    ["pt-pt" /* LocaleKey.ptPt */]: 'en',
                },
                register: this.localeObj,
                directoryPermissions: '777',
                directory: `${__dirname}/../locales`,
                // sonarignore:start
                /* eslint-disable @typescript-eslint/no-explicit-any */
                objectNotation: '->',
                // sonarignore:end
            });
        }
        this.application.bind(keys_1.SFCoreBindings.EXPRESS_MIDDLEWARES).to(middlewares);
        this.bindings.push(core_1.Binding.bind(keys_1.OASBindings.HiddenEndpoint).to([]));
        this.bindings.push(core_1.Binding.bind(keys_1.SFCoreBindings.i18n).to(this.localeObj));
        this.application.add((0, core_1.createBindingFromClass)(operation_spec_enhancer_1.OperationSpecEnhancer));
    }
};
CoreComponent = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)(core_1.CoreBindings.APPLICATION_INSTANCE)),
    tslib_1.__param(1, (0, core_1.inject)(keys_1.SFCoreBindings.config, { optional: true })),
    tslib_1.__param(2, (0, core_1.inject)(keys_1.SFCoreBindings.EXPRESS_MIDDLEWARES, { optional: true })),
    tslib_1.__metadata("design:paramtypes", [rest_1.RestApplication, Object, Array])
], CoreComponent);
exports.CoreComponent = CoreComponent;
//# sourceMappingURL=component.js.map