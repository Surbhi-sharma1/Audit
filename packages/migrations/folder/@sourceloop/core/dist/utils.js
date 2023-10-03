"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimitKeyGenPublic = exports.rateLimitKeyGen = exports.getDOBFromAge = exports.getAge = exports.getErrorString = void 0;
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const request_ip_1 = require("request-ip");
const moment_1 = tslib_1.__importDefault(require("moment"));
// sonarignore:start
/* eslint-disable @typescript-eslint/no-explicit-any */
const getErrorString = (error) => {
    // sonarignore:end
    if ((0, lodash_1.isString)(error)) {
        return error;
    }
    else if (JSON.stringify(error) !== '{}') {
        return JSON.stringify(error);
    }
    else {
        return error;
    }
};
exports.getErrorString = getErrorString;
const getAge = (dob) => {
    const currentMoment = (0, moment_1.default)();
    const dobMoment = (0, moment_1.default)(dob);
    return currentMoment.diff(dobMoment, 'years');
};
exports.getAge = getAge;
const getDOBFromAge = (age) => {
    const dobMoment = (0, moment_1.default)().subtract(age, 'years');
    return dobMoment.toDate();
};
exports.getDOBFromAge = getDOBFromAge;
const rateLimitKeyGen = (req) => {
    var _a, _b, _c;
    const clientIp = (0, request_ip_1.getClientIp)(req);
    const key = (_c = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.replace(/bearer /i, '')) !== null && _c !== void 0 ? _c : clientIp;
    return `${process.env.RATE_LIMIT_KEY_PREFIX}_${key}`;
};
exports.rateLimitKeyGen = rateLimitKeyGen;
const rateLimitKeyGenPublic = (req) => {
    const clientIp = (0, request_ip_1.getClientIp)(req);
    return `${process.env.RATE_LIMIT_KEY_PREFIX}_${clientIp}_${req.method}_${req.url}`;
};
exports.rateLimitKeyGenPublic = rateLimitKeyGenPublic;
//# sourceMappingURL=utils.js.map