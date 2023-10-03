"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCodes = void 0;
exports.ErrorCodes = {
    [401 /* STATUS_CODE.UNAUTHORISED */]: {
        description: 'Invalid Credentials.',
    },
    [400 /* STATUS_CODE.BAD_REQUEST */]: {
        description: 'The syntax of the request entity is incorrect.',
    },
    [422 /* STATUS_CODE.UNPROCESSED_ENTITY */]: {
        description: 'The syntax of the request entity is incorrect',
    },
    [404 /* STATUS_CODE.NOT_FOUND */]: {
        description: 'The entity requested does not exist.',
    },
};
//# sourceMappingURL=status-codes.enum.js.map