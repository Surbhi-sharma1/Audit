"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginActivityController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const repositories_1 = require("../repositories");
const loopback4_authentication_1 = require("loopback4-authentication");
const loopback4_authorization_1 = require("loopback4-authorization");
const rest_1 = require("@loopback/rest");
const core_1 = require("@sourceloop/core");
const models_1 = require("../models");
const core_2 = require("@loopback/core");
const moment_1 = tslib_1.__importDefault(require("moment"));
const baseUrl = '/login-activity';
let LoginActivityController = class LoginActivityController {
    constructor(loginActivityRepo, response) {
        this.loginActivityRepo = loginActivityRepo;
        this.response = response;
    }
    async count(where) {
        return this.loginActivityRepo.count(where);
    }
    async find(filter) {
        return this.loginActivityRepo.find(filter);
    }
    async findById(id, filter) {
        return this.loginActivityRepo.findById(id, filter);
    }
    async getActiveUsers(range, startDate, endDate) {
        const activeUsersForTime = await this.loginActivityRepo.find({
            where: {
                loginTime: { between: [startDate, endDate] },
            },
        });
        //all the BL here
        const groupByDate = {};
        activeUsersForTime.forEach(item => {
            let date = '';
            const loginTime = (0, moment_1.default)(item.loginTime);
            if (range === "daily" /* ActiveUsersRange.DAILY */) {
                date = loginTime.format('YYYY-MM-DD');
            }
            else if (range === "monthly" /* ActiveUsersRange.MONTHLY */) {
                date = loginTime.format('MM-YYYY');
            }
            else {
                //intentional
            }
            if (!groupByDate[date]) {
                groupByDate[date] = {};
            }
            const type = item.loginType;
            if (!groupByDate[date][type]) {
                groupByDate[date][type] = [];
            }
            const isDuplicate = groupByDate[date][type].some(existItem => existItem.actor === item.actor);
            if (!isDuplicate) {
                groupByDate[date][type].push(item);
            }
        });
        return groupByDate;
    }
};
tslib_1.__decorate([
    (0, loopback4_authentication_1.authenticate)("bearer" /* STRATEGY.BEARER */, {
        passReqToCallback: true,
    }),
    (0, loopback4_authorization_1.authorize)({
        permissions: ["ViewLoginActivity" /* PermissionKey.ViewLoginActivity */],
    }),
    (0, rest_1.get)(`${baseUrl}/count`, {
        security: core_1.OPERATION_SECURITY_SPEC,
        responses: {
            [200 /* STATUS_CODE.OK */]: {
                description: 'LoginActivity model count',
                content: { [core_1.CONTENT_TYPE.JSON]: { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.LoginActivity))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LoginActivityController.prototype, "count", null);
tslib_1.__decorate([
    (0, loopback4_authentication_1.authenticate)("bearer" /* STRATEGY.BEARER */, {
        passReqToCallback: true,
    }),
    (0, loopback4_authorization_1.authorize)({
        permissions: ["ViewLoginActivity" /* PermissionKey.ViewLoginActivity */],
    }),
    (0, rest_1.get)(baseUrl, {
        security: core_1.OPERATION_SECURITY_SPEC,
        responses: {
            [200 /* STATUS_CODE.OK */]: {
                description: 'Array of LoginActivity model instances',
                content: {
                    [core_1.CONTENT_TYPE.JSON]: {
                        schema: {
                            type: 'array',
                            items: (0, rest_1.getModelSchemaRef)(models_1.LoginActivity, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.object('filter', (0, rest_1.getFilterSchemaFor)(models_1.LoginActivity))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LoginActivityController.prototype, "find", null);
tslib_1.__decorate([
    (0, loopback4_authentication_1.authenticate)("bearer" /* STRATEGY.BEARER */, {
        passReqToCallback: true,
    }),
    (0, loopback4_authorization_1.authorize)({
        permissions: ["ViewLoginActivity" /* PermissionKey.ViewLoginActivity */],
    }),
    (0, rest_1.get)(`${baseUrl}/{id}`, {
        security: core_1.OPERATION_SECURITY_SPEC,
        responses: {
            [200 /* STATUS_CODE.OK */]: {
                description: 'LoginActivity model instance',
                content: {
                    [core_1.CONTENT_TYPE.JSON]: {
                        schema: (0, rest_1.getModelSchemaRef)(models_1.LoginActivity, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('filter', (0, rest_1.getFilterSchemaFor)(models_1.LoginActivity))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LoginActivityController.prototype, "findById", null);
tslib_1.__decorate([
    (0, loopback4_authentication_1.authenticate)("bearer" /* STRATEGY.BEARER */, {
        passReqToCallback: true,
    }),
    (0, loopback4_authorization_1.authorize)({
        permissions: ["ViewLoginActivity" /* PermissionKey.ViewLoginActivity */],
    }),
    (0, rest_1.get)(`active-users/{range}`, {
        security: core_1.OPERATION_SECURITY_SPEC,
        responses: {
            [200 /* STATUS_CODE.OK */]: {
                description: 'LoginActivity model instance',
                content: {
                    [core_1.CONTENT_TYPE.JSON]: {
                        schema: (0, rest_1.getModelSchemaRef)(Object, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('range')),
    tslib_1.__param(1, rest_1.param.query.dateTime('startDate')),
    tslib_1.__param(2, rest_1.param.query.dateTime('endDate')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Date,
        Date]),
    tslib_1.__metadata("design:returntype", Promise)
], LoginActivityController.prototype, "getActiveUsers", null);
LoginActivityController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.LoginActivityRepository)),
    tslib_1.__param(1, (0, core_2.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.LoginActivityRepository, Object])
], LoginActivityController);
exports.LoginActivityController = LoginActivityController;
//# sourceMappingURL=login-activity.controller.js.map