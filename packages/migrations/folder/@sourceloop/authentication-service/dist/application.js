"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationServiceApplication = void 0;
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const boot_1 = require("@loopback/boot");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const path = tslib_1.__importStar(require("path"));
const component_1 = require("./component");
class AuthenticationServiceApplication extends (0, boot_1.BootMixin)((0, repository_1.RepositoryMixin)(rest_1.RestApplication)) {
    constructor(options = {}) {
        super(options);
        this.static('/', path.join(__dirname, '../public'));
        this.component(component_1.AuthenticationServiceComponent);
        this.projectRoot = __dirname;
        this.bootOptions = {
            controllers: {
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true,
            },
        };
    }
}
exports.AuthenticationServiceApplication = AuthenticationServiceApplication;
//# sourceMappingURL=application.js.map