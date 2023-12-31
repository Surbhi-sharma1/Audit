"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BearerVerifierType = exports.BearerVerifierBindings = void 0;
const context_1 = require("@loopback/context");
const constants_1 = require("../../constants");
var BearerVerifierBindings;
(function (BearerVerifierBindings) {
    BearerVerifierBindings.Config = context_1.BindingKey.create(`${constants_1.BINDING_PREFIX}.bearer-verfier.config`);
})(BearerVerifierBindings = exports.BearerVerifierBindings || (exports.BearerVerifierBindings = {}));
var BearerVerifierType;
(function (BearerVerifierType) {
    BearerVerifierType[BearerVerifierType["service"] = 0] = "service";
    BearerVerifierType[BearerVerifierType["facade"] = 1] = "facade";
})(BearerVerifierType = exports.BearerVerifierType || (exports.BearerVerifierType = {}));
//# sourceMappingURL=keys.js.map