"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const dotenv = tslib_1.__importStar(require("dotenv"));
const dotenvExt = tslib_1.__importStar(require("dotenv-extended"));
dotenv.config();
dotenvExt.load({
    schema: '.env.example',
    errorOnMissing: false,
    includeProcessEnv: true,
});
//# sourceMappingURL=load-env.js.map