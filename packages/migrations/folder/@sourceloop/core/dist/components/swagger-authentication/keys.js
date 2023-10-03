"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerAuthenticationBindings = void 0;
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const core_1 = require("@loopback/core");
const constants_1 = require("../../constants");
var SwaggerAuthenticationBindings;
(function (SwaggerAuthenticationBindings) {
    SwaggerAuthenticationBindings.VERIFIER = core_1.BindingKey.create(`${constants_1.BINDING_PREFIX}.swagger-auth.verifier`);
})(SwaggerAuthenticationBindings = exports.SwaggerAuthenticationBindings || (exports.SwaggerAuthenticationBindings = {}));
//# sourceMappingURL=keys.js.map