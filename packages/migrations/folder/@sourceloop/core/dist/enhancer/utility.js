"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiHide = void 0;
const enums_1 = require("../enums");
function apiSearchFunction(apiSearch, path) {
    Object.values(enums_1.HttpMethod).forEach(method => {
        if (path[enums_1.OasKeyMap[method]] && apiSearch[1]['httpMethod'] === method) {
            delete path[enums_1.OasKeyMap[method]];
        }
    });
}
function apiHide(arrayApiSearch, paths) {
    arrayApiSearch.forEach(apiSearch => {
        for (const path in paths) {
            if (path === apiSearch[1]['path']) {
                apiSearchFunction(apiSearch, paths[path]);
            }
        }
    });
}
exports.apiHide = apiHide;
//# sourceMappingURL=utility.js.map