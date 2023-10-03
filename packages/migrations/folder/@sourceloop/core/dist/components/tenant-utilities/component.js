"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantUtilitiesComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const logger_extension_1 = require("../logger-extension");
const keys_1 = require("./keys");
const tenant_guard_service_1 = require("./services/tenant-guard.service");
let TenantUtilitiesComponent = class TenantUtilitiesComponent {
    constructor(app, configuration) {
        app.component(logger_extension_1.LoggerExtensionComponent);
        app.bind(keys_1.TenantUtilitiesBindings.GuardService).toClass(tenant_guard_service_1.TenantGuardService);
    }
};
TenantUtilitiesComponent = tslib_1.__decorate([
    (0, core_1.injectable)({
        tags: { [core_1.ContextTags.KEY]: keys_1.TenantUtilitiesBindings.Component },
    }),
    tslib_1.__param(0, (0, core_1.inject)(core_1.CoreBindings.APPLICATION_INSTANCE)),
    tslib_1.__param(1, (0, core_1.config)({ optional: true })),
    tslib_1.__metadata("design:paramtypes", [core_1.Application, Object])
], TenantUtilitiesComponent);
exports.TenantUtilitiesComponent = TenantUtilitiesComponent;
//# sourceMappingURL=component.js.map