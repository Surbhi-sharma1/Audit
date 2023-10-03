"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OasKeyMap = exports.HttpMethod = void 0;
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["GET"] = "GET";
    HttpMethod["POST"] = "POST";
    HttpMethod["PUT"] = "PUT";
    HttpMethod["PATCH"] = "PATCH";
    HttpMethod["DELETE"] = "DELETE";
})(HttpMethod = exports.HttpMethod || (exports.HttpMethod = {}));
exports.OasKeyMap = {
    [HttpMethod.GET]: 'get',
    [HttpMethod.POST]: 'post',
    [HttpMethod.PUT]: 'put',
    [HttpMethod.PATCH]: 'patch',
    [HttpMethod.DELETE]: 'delete',
};
//# sourceMappingURL=http-oas.enum.js.map