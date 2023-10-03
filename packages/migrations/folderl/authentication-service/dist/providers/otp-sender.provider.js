"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpSenderProvider = void 0;
const rest_1 = require("@loopback/rest");
class OtpSenderProvider {
    value() {
        return async (_otp, _user) => {
            throw new rest_1.HttpErrors.NotImplemented(`OtpSenderFn not implemented`);
        };
    }
}
exports.OtpSenderProvider = OtpSenderProvider;
//# sourceMappingURL=otp-sender.provider.js.map