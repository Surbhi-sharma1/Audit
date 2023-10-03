"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tenantGuard = void 0;
const mixins_1 = require("../mixins");
/**
 * This function returns a class decorator that adds a tenant guard mixin
 * to the given repository class.
 *
 * @param constructor - The repository class to decorate
 */
function tenantGuard() {
    return (constructor) => {
        class GuardedRepo extends (0, mixins_1.TenantGuardMixin)(constructor) {
        }
        // This code is used to set the name of the GuardedRepo class back to the original name
        Object.defineProperty(GuardedRepo, 'name', { value: constructor.name });
        return GuardedRepo;
    };
}
exports.tenantGuard = tenantGuard;
//# sourceMappingURL=tenant-guard.decorator.js.map