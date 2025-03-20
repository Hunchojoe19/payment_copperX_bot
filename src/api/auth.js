"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestEmailOtp = requestEmailOtp;
exports.authenticateWithOtp = authenticateWithOtp;
exports.getUserProfile = getUserProfile;
exports.getKycStatus = getKycStatus;
const index_1 = __importDefault(require("./index"));
function requestEmailOtp(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield index_1.default.post('/auth/email-otp/request', { email });
        return response.data;
    });
}
function authenticateWithOtp(email, otp) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield index_1.default.post('/auth/email-otp/authenticate', { email, otp });
        return response.data;
    });
}
function getUserProfile() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield index_1.default.get('/auth/me');
        return response.data;
    });
}
function getKycStatus() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield index_1.default.get('/kycs');
        return response.data;
    });
}
