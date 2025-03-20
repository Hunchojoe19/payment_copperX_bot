"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
const apiClient = axios_1.default.create({
    baseURL: config_1.config.copperxApiBaseUrl,
    headers: {
        // Authorization: `Bearer ${config.copperxApiToken}`,
        'Content-Type': 'application/json',
    },
});
exports.default = apiClient;
