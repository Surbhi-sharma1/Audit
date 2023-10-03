"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModifiableEntityMixin = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const base_entity_mixin_1 = require("./base-entity.mixin");
function UserModifiableEntityMixin(base, config) {
    var _a, _b;
    class UserModifiableEntity extends (0, base_entity_mixin_1.BaseEntityMixin)(base, {
        createdOn: config === null || config === void 0 ? void 0 : config.createdOn,
        modifiedOn: config === null || config === void 0 ? void 0 : config.modifiedOn,
    }) {
    }
    tslib_1.__decorate([
        (0, repository_1.property)({
            type: 'string',
            name: 'created_by',
            ...((_a = config === null || config === void 0 ? void 0 : config.createdBy) !== null && _a !== void 0 ? _a : {}),
        }),
        tslib_1.__metadata("design:type", String)
    ], UserModifiableEntity.prototype, "createdBy", void 0);
    tslib_1.__decorate([
        (0, repository_1.property)({
            type: 'string',
            name: 'modified_by',
            ...((_b = config === null || config === void 0 ? void 0 : config.modifiedBy) !== null && _b !== void 0 ? _b : {}),
        }),
        tslib_1.__metadata("design:type", String)
    ], UserModifiableEntity.prototype, "modifiedBy", void 0);
    return UserModifiableEntity;
}
exports.UserModifiableEntityMixin = UserModifiableEntityMixin;
//# sourceMappingURL=user-modifiable-entity.mixin.js.map