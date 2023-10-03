"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueResponse = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const repository_1 = require("@loopback/repository");
let ValueResponse = class ValueResponse extends repository_1.Model {
    constructor(data) {
        super(data);
        this.currValue = data === null || data === void 0 ? void 0 : data.currValue;
        this.oldValue = data === null || data === void 0 ? void 0 : data.oldValue;
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        jsonSchema: {
            nullable: true,
        },
    }),
    tslib_1.__metadata("design:type", Number)
], ValueResponse.prototype, "currValue", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        jsonSchema: {
            nullable: true,
        },
    }),
    tslib_1.__metadata("design:type", Number)
], ValueResponse.prototype, "oldValue", void 0);
ValueResponse = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], ValueResponse);
exports.ValueResponse = ValueResponse;
//# sourceMappingURL=value-response.model.js.map