"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantGuardService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const loopback4_authentication_1 = require("loopback4-authentication");
const enums_1 = require("../enums");
const error_keys_1 = require("../error-keys");
let TenantGuardService = class TenantGuardService {
    constructor(getCurrentUser) {
        this.getCurrentUser = getCurrentUser;
    }
    async skipTenantGuard() {
        const user = await this.getCurrentUser();
        return user.tenantType === enums_1.TenantType.MASTER;
    }
    find(filter) {
        return this.addTenantToFilter(filter);
    }
    async findOne(filter) {
        return this.addTenantToFilter(filter);
    }
    async findById(id, filter) {
        return this.addTenantToFilter(filter, id);
    }
    async count(where) {
        return this.addTenantToWhere(where);
    }
    async exists(id) {
        return this.addTenantToWhere(undefined, id);
    }
    create(data) {
        return this.addTenantId(data);
    }
    createAll(data) {
        return this.addTenantIDMultiple(data);
    }
    save(entity) {
        return this.addTenantId(entity);
    }
    async replaceById(id, data) {
        return this.updateById(id, data);
    }
    async updateById(id, data) {
        await this.checkTenantId(data);
        return this.addTenantToWhere(undefined, id).then(where => ({
            where,
            data,
        }));
    }
    async update(data) {
        await this.checkTenantId(data);
        return this.addTenantToWhere(undefined, data.getId()).then(newWhere => ({
            where: newWhere,
            data,
        }));
    }
    async updateAll(data, where) {
        await this.checkTenantId(data);
        return this.addTenantToWhere(where).then(newWhere => ({
            where: newWhere,
            data,
        }));
    }
    deleteById(id) {
        return this.addTenantToWhere(undefined, id);
    }
    async delete(entity) {
        await this.checkTenantId(entity);
        return this.addTenantToWhere(undefined, entity.getId()).then(where => ({
            where,
            entity,
        }));
    }
    async deleteAll(where) {
        return this.addTenantToWhere(where);
    }
    async checkTenantId(data) {
        const user = await this.getCurrentUser();
        if (!user.tenantId) {
            throw new rest_1.HttpErrors.Unauthorized(error_keys_1.TenantUtilitiesErrorKeys.TenantIdMissing);
        }
        if (data.tenantId && data.tenantId !== user.tenantId) {
            throw new rest_1.HttpErrors.Forbidden(error_keys_1.TenantUtilitiesErrorKeys.TenantIdDoesNotMatch);
        }
    }
    async addTenantId(entity) {
        const user = await this.getCurrentUser();
        await this.checkTenantId(entity);
        entity.tenantId = user.tenantId;
        return entity;
    }
    async addTenantIDMultiple(entities) {
        const user = await this.getCurrentUser();
        const tenantId = user.tenantId;
        if (tenantId) {
            entities.forEach(entity => {
                if (!entity.tenantId) {
                    entity.tenantId = tenantId;
                }
                else if (entity.tenantId !== tenantId) {
                    throw new rest_1.HttpErrors.Forbidden(`${error_keys_1.TenantUtilitiesErrorKeys.TenantIdDoesNotMatch}: ${entity.tenantId}`);
                }
                else {
                    // do nothing
                }
            });
            return entities;
        }
        throw new rest_1.HttpErrors.Unauthorized(error_keys_1.TenantUtilitiesErrorKeys.TenantIdMissing);
    }
    async addTenantToWhere(where, id) {
        const user = await this.getCurrentUser();
        if (user.tenantId) {
            return this.buildWhere(user, where, id);
        }
        throw new rest_1.HttpErrors.Unauthorized(error_keys_1.TenantUtilitiesErrorKeys.TenantIdMissing);
    }
    async addTenantToFilter(filter, id) {
        const user = await this.getCurrentUser();
        if (user.tenantId) {
            return {
                ...filter,
                where: this.buildWhere(user, filter === null || filter === void 0 ? void 0 : filter.where, id),
            };
        }
        throw new rest_1.HttpErrors.Unauthorized(error_keys_1.TenantUtilitiesErrorKeys.TenantIdMissing);
    }
    buildWhere(user, where, id) {
        const whereBuilder = new repository_1.WhereBuilder();
        const extraFilter = {
            tenantId: user.tenantId,
        };
        if (id) {
            extraFilter.id = id;
        }
        if (!where) {
            return extraFilter;
        }
        whereBuilder.and([where, extraFilter].filter(w => !!w));
        return whereBuilder.build();
    }
};
TenantGuardService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__param(0, core_1.inject.getter(loopback4_authentication_1.AuthenticationBindings.CURRENT_USER)),
    tslib_1.__metadata("design:paramtypes", [Function])
], TenantGuardService);
exports.TenantGuardService = TenantGuardService;
//# sourceMappingURL=tenant-guard.service.js.map