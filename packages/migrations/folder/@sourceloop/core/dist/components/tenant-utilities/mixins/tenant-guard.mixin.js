"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantGuardMixin = void 0;
const tslib_1 = require("tslib");
const rest_1 = require("@loopback/rest");
const core_1 = require("@loopback/core");
const keys_1 = require("../keys");
function TenantGuardMixin(superClass) {
    class GuardedRepo extends superClass {
        async find(filter, options) {
            if (await this.tenantGuardService.skipTenantGuard()) {
                return super.find(filter, options);
            }
            const newFilter = await this.tenantGuardService.find(filter);
            return super.find(newFilter, options);
        }
        async findOne(filter, options) {
            if (await this.tenantGuardService.skipTenantGuard()) {
                return super.findOne(filter, options);
            }
            const newFilter = await this.tenantGuardService.findOne(filter);
            return super.findOne(newFilter, options);
        }
        async findById(id, filter, options) {
            if (await this.tenantGuardService.skipTenantGuard()) {
                return super.findById(id, filter, options);
            }
            const newFilter = await this.tenantGuardService.findById(id, filter);
            const record = await super.findOne(newFilter, options);
            if (record) {
                return record;
            }
            throw new rest_1.HttpErrors.NotFound();
        }
        async count(where, options) {
            if (await this.tenantGuardService.skipTenantGuard()) {
                return super.count(where, options);
            }
            const newWhere = await this.tenantGuardService.count(where);
            return super.count(newWhere, options);
        }
        async exists(id, options) {
            if (await this.tenantGuardService.skipTenantGuard()) {
                return super.exists(id, options);
            }
            const where = await this.tenantGuardService.exists(id);
            const result = await super.findOne({
                where,
            }, options);
            return !!result;
        }
        async create(data, options) {
            if (await this.tenantGuardService.skipTenantGuard()) {
                return super.create(data, options);
            }
            const newData = await this.tenantGuardService.create(data);
            return super.create(newData, options);
        }
        async createAll(data, options) {
            if (await this.tenantGuardService.skipTenantGuard()) {
                return super.createAll(data, options);
            }
            const newData = await this.tenantGuardService.createAll(data);
            return super.createAll(newData, options);
        }
        async save(entity, options) {
            if (await this.tenantGuardService.skipTenantGuard()) {
                return super.save(entity, options);
            }
            const newEntity = await this.tenantGuardService.save(entity);
            return super.save(newEntity, options);
        }
        async update(entity, options) {
            if (await this.tenantGuardService.skipTenantGuard()) {
                return super.update(entity, options);
            }
            const args = await this.tenantGuardService.update(entity);
            const { count } = await super.updateAll(args.data, args.where, options);
            if (count === 0) {
                throw new rest_1.HttpErrors.NotFound();
            }
        }
        async updateAll(data, where, options) {
            if (await this.tenantGuardService.skipTenantGuard()) {
                return super.updateAll(data, where, options);
            }
            const newArgs = await this.tenantGuardService.updateAll(data, where);
            return super.updateAll(newArgs.data, newArgs.where, options);
        }
        async updateById(id, data, options) {
            if (await this.tenantGuardService.skipTenantGuard()) {
                return super.updateById(id, data, options);
            }
            const args = await this.tenantGuardService.updateById(id, data);
            const { count } = await super.updateAll(args.data, args.where, options);
            if (count === 0) {
                throw new rest_1.HttpErrors.NotFound();
            }
        }
        async replaceById(id, data, options) {
            if (await this.tenantGuardService.skipTenantGuard()) {
                return super.replaceById(id, data, options);
            }
            const args = await this.tenantGuardService.replaceById(id, data);
            const record = await super.findOne({
                where: args.where,
            }, options);
            if (!record) {
                throw new rest_1.HttpErrors.NotFound();
            }
            await super.replaceById(id, args.data, options);
        }
        async delete(entity, options) {
            if (await this.tenantGuardService.skipTenantGuard()) {
                return super.delete(entity, options);
            }
            const args = await this.tenantGuardService.delete(entity);
            const { count } = await super.deleteAll(args.where, options);
            if (count === 0) {
                throw new rest_1.HttpErrors.NotFound();
            }
        }
        async deleteAll(where, options) {
            if (await this.tenantGuardService.skipTenantGuard()) {
                return super.deleteAll(where, options);
            }
            const newWhere = await this.tenantGuardService.deleteAll(where);
            return super.deleteAll(newWhere, options);
        }
        async deleteById(id, options) {
            if (await this.tenantGuardService.skipTenantGuard()) {
                return super.deleteById(id, options);
            }
            const newWhere = await this.tenantGuardService.deleteById(id);
            const { count } = await super.deleteAll(newWhere, options);
            if (count === 0) {
                throw new rest_1.HttpErrors.NotFound();
            }
        }
    }
    tslib_1.__decorate([
        (0, core_1.inject)(keys_1.TenantUtilitiesBindings.GuardService),
        tslib_1.__metadata("design:type", Object)
    ], GuardedRepo.prototype, "tenantGuardService", void 0);
    return GuardedRepo;
}
exports.TenantGuardMixin = TenantGuardMixin;
//# sourceMappingURL=tenant-guard.mixin.js.map