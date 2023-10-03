"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultTransactionalUserModifyRepository = void 0;
const rest_1 = require("@loopback/rest");
const loopback4_soft_delete_1 = require("loopback4-soft-delete");
class DefaultTransactionalUserModifyRepository extends loopback4_soft_delete_1.DefaultTransactionSoftCrudRepository {
    constructor(entityClass, dataSource, getCurrentUser) {
        super(entityClass, dataSource);
        this.getCurrentUser = getCurrentUser;
    }
    async create(entity, options) {
        var _a;
        let currentUser = await this.getCurrentUser();
        currentUser = currentUser !== null && currentUser !== void 0 ? currentUser : options === null || options === void 0 ? void 0 : options.currentUser;
        if (!currentUser) {
            throw new rest_1.HttpErrors.Forbidden("Invalid Credentials" /* AuthErrorKeys.InvalidCredentials */);
        }
        const uid = (_a = currentUser === null || currentUser === void 0 ? void 0 : currentUser.userTenantId) !== null && _a !== void 0 ? _a : currentUser === null || currentUser === void 0 ? void 0 : currentUser.id;
        entity.createdBy = uid;
        entity.modifiedBy = uid;
        return super.create(entity, options);
    }
    async createAll(entities, options) {
        var _a;
        let currentUser = await this.getCurrentUser();
        currentUser = currentUser !== null && currentUser !== void 0 ? currentUser : options === null || options === void 0 ? void 0 : options.currentUser;
        if (!currentUser) {
            throw new rest_1.HttpErrors.Forbidden("Invalid Credentials" /* AuthErrorKeys.InvalidCredentials */);
        }
        const uid = (_a = currentUser === null || currentUser === void 0 ? void 0 : currentUser.userTenantId) !== null && _a !== void 0 ? _a : currentUser === null || currentUser === void 0 ? void 0 : currentUser.id;
        entities.forEach(entity => {
            entity.createdBy = uid !== null && uid !== void 0 ? uid : '';
            entity.modifiedBy = uid !== null && uid !== void 0 ? uid : '';
        });
        return super.createAll(entities, options);
    }
    async save(entity, options) {
        var _a;
        const currentUser = await this.getCurrentUser();
        if (!currentUser) {
            throw new rest_1.HttpErrors.Forbidden("Invalid Credentials" /* AuthErrorKeys.InvalidCredentials */);
        }
        const uid = (_a = currentUser === null || currentUser === void 0 ? void 0 : currentUser.userTenantId) !== null && _a !== void 0 ? _a : currentUser === null || currentUser === void 0 ? void 0 : currentUser.id;
        entity.modifiedBy = uid;
        return super.save(entity, options);
    }
    async update(entity, options) {
        var _a;
        const currentUser = await this.getCurrentUser();
        if (!currentUser) {
            throw new rest_1.HttpErrors.Forbidden("Invalid Credentials" /* AuthErrorKeys.InvalidCredentials */);
        }
        const uid = (_a = currentUser === null || currentUser === void 0 ? void 0 : currentUser.userTenantId) !== null && _a !== void 0 ? _a : currentUser === null || currentUser === void 0 ? void 0 : currentUser.id;
        entity.modifiedBy = uid;
        return super.update(entity, options);
    }
    async updateAll(data, where, options) {
        var _a;
        let currentUser = await this.getCurrentUser();
        currentUser = currentUser !== null && currentUser !== void 0 ? currentUser : options === null || options === void 0 ? void 0 : options.currentUser;
        if (!currentUser) {
            throw new rest_1.HttpErrors.Forbidden("Invalid Credentials" /* AuthErrorKeys.InvalidCredentials */);
        }
        const uid = (_a = currentUser === null || currentUser === void 0 ? void 0 : currentUser.userTenantId) !== null && _a !== void 0 ? _a : currentUser === null || currentUser === void 0 ? void 0 : currentUser.id;
        data.modifiedBy = uid;
        return super.updateAll(data, where, options);
    }
    async updateById(id, data, options) {
        var _a;
        let currentUser = await this.getCurrentUser();
        currentUser = currentUser !== null && currentUser !== void 0 ? currentUser : options === null || options === void 0 ? void 0 : options.currentUser;
        if (!currentUser) {
            throw new rest_1.HttpErrors.Forbidden("Invalid Credentials" /* AuthErrorKeys.InvalidCredentials */);
        }
        const uid = (_a = currentUser === null || currentUser === void 0 ? void 0 : currentUser.userTenantId) !== null && _a !== void 0 ? _a : currentUser === null || currentUser === void 0 ? void 0 : currentUser.id;
        data.modifiedBy = uid;
        return super.updateById(id, data, options);
    }
    async replaceById(id, data, options) {
        var _a;
        const currentUser = await this.getCurrentUser();
        if (!currentUser) {
            throw new rest_1.HttpErrors.Forbidden("Invalid Credentials" /* AuthErrorKeys.InvalidCredentials */);
        }
        const uid = (_a = currentUser === null || currentUser === void 0 ? void 0 : currentUser.userTenantId) !== null && _a !== void 0 ? _a : currentUser === null || currentUser === void 0 ? void 0 : currentUser.id;
        data.modifiedBy = uid;
        return super.replaceById(id, data, options);
    }
}
exports.DefaultTransactionalUserModifyRepository = DefaultTransactionalUserModifyRepository;
//# sourceMappingURL=default-transactional-user-modify-repository.base.js.map