"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantUtilitiesBindings = exports.TenantUtilitiesNamespace = void 0;
const core_1 = require("@loopback/core");
exports.TenantUtilitiesNamespace = 'sourceloop.tenant.utilities';
var TenantUtilitiesBindings;
(function (TenantUtilitiesBindings) {
    TenantUtilitiesBindings.Component = core_1.BindingKey.create(`${exports.TenantUtilitiesNamespace}.TenantUtilitiesComponent`);
    TenantUtilitiesBindings.GuardService = core_1.BindingKey.create(`${exports.TenantUtilitiesNamespace}.TenantGuardService`);
})(TenantUtilitiesBindings = exports.TenantUtilitiesBindings || (exports.TenantUtilitiesBindings = {}));
//# sourceMappingURL=keys.js.map