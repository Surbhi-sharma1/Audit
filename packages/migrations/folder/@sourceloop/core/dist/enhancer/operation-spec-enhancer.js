"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationSpecEnhancer = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const utility_1 = require("./utility");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const keys_1 = require("../keys");
/**
 * A spec enhancer to modify paths
 */
let OperationSpecEnhancer = class OperationSpecEnhancer {
    constructor(hidden) {
        this.hidden = hidden;
        this.name = 'info';
    }
    // takes in the current spec, modifies it, and returns a new one
    modifySpec(spec) {
        const paths = spec.paths;
        const arrayApiSearch = Object.entries(this.hidden);
        (0, utility_1.apiHide)(arrayApiSearch, paths);
        return spec;
    }
};
OperationSpecEnhancer = tslib_1.__decorate([
    (0, core_1.injectable)(rest_1.asSpecEnhancer),
    tslib_1.__param(0, (0, core_1.inject)(keys_1.OASBindings.HiddenEndpoint)),
    tslib_1.__metadata("design:paramtypes", [Array])
], OperationSpecEnhancer);
exports.OperationSpecEnhancer = OperationSpecEnhancer;
//# sourceMappingURL=operation-spec-enhancer.js.map