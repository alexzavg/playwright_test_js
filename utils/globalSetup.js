"use strict";
// docs https://playwright.dev/docs/test-advanced#global-setup-and-teardown
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
async function globalSetup(config) {
    if (process.env.test_env) {
        // Use env-specific config
        dotenv_1.default.config({
            path: `.env.${process.env.test_env}`, // set path to parent project config
            override: true
        });
    }
}
exports.default = globalSetup;
//# sourceMappingURL=globalSetup.js.map