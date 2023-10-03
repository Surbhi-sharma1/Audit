"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OASBindings = exports.SFCoreBindings = void 0;
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const core_1 = require("@loopback/core");
const constants_1 = require("./constants");
var SFCoreBindings;
(function (SFCoreBindings) {
    SFCoreBindings.i18n = core_1.BindingKey.create(`${constants_1.BINDING_PREFIX}.i18n`);
    SFCoreBindings.config = core_1.BindingKey.create('sf.packages.core.config');
    SFCoreBindings.EXPRESS_MIDDLEWARES = core_1.BindingKey.create(`sf.packages.core.expressMiddlewares`);
})(SFCoreBindings = exports.SFCoreBindings || (exports.SFCoreBindings = {}));
const hiddenKey = 'sf.oas.hiddenEndpoints';
var OASBindings;
(function (OASBindings) {
    OASBindings.HiddenEndpoint = core_1.BindingKey.create(hiddenKey);
})(OASBindings = exports.OASBindings || (exports.OASBindings = {}));
//# sourceMappingURL=keys.js.map