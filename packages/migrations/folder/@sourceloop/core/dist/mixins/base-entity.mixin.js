"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEntityMixin = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
function BaseEntityMixin(base, config) {
    var _a, _b;
    class BaseEntity extends base {
    }
    tslib_1.__decorate([
        (0, repository_1.property)({
            type: 'date',
            default: () => new Date(),
            name: 'created_on',
            ...((_a = config === null || config === void 0 ? void 0 : config.createdOn) !== null && _a !== void 0 ? _a : {}),
        }),
        tslib_1.__metadata("design:type", Date)
    ], BaseEntity.prototype, "createdOn", void 0);
    tslib_1.__decorate([
        (0, repository_1.property)({
            type: 'date',
            default: () => new Date(),
            name: 'modified_on',
            ...((_b = config === null || config === void 0 ? void 0 : config.modifiedOn) !== null && _b !== void 0 ? _b : {}),
        }),
        tslib_1.__metadata("design:type", Date)
    ], BaseEntity.prototype, "modifiedOn", void 0);
    return BaseEntity;
}
exports.BaseEntityMixin = BaseEntityMixin;
//# sourceMappingURL=base-entity.mixin.js.map