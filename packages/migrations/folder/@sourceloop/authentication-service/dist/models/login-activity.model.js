"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginActivity = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let LoginActivity = class LoginActivity extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        id: true,
    }),
    tslib_1.__metadata("design:type", String)
], LoginActivity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        name: 'actor',
    }),
    tslib_1.__metadata("design:type", String)
], LoginActivity.prototype, "actor", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        name: 'tenant_id',
    }),
    tslib_1.__metadata("design:type", String)
], LoginActivity.prototype, "tenantId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        default: () => new Date(),
        name: 'login_time',
    }),
    tslib_1.__metadata("design:type", Date)
], LoginActivity.prototype, "loginTime", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        name: 'token_payload',
    }),
    tslib_1.__metadata("design:type", String)
], LoginActivity.prototype, "tokenPayload", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        name: 'login_type',
    }),
    tslib_1.__metadata("design:type", String)
], LoginActivity.prototype, "loginType", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        name: 'device_info',
    }),
    tslib_1.__metadata("design:type", String)
], LoginActivity.prototype, "deviceInfo", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        name: 'ip_address',
    }),
    tslib_1.__metadata("design:type", String)
], LoginActivity.prototype, "ipAddress", void 0);
LoginActivity = tslib_1.__decorate([
    (0, repository_1.model)({
        description: `This is to maintain the daily login activity.`,
        name: 'login_activity',
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], LoginActivity);
exports.LoginActivity = LoginActivity;
//# sourceMappingURL=login-activity.model.js.map