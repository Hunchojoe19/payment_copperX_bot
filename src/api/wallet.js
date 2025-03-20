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
exports.getWallets = getWallets;
exports.getWalletBalances = getWalletBalances;
exports.setDefaultWallet = setDefaultWallet;
exports.getTransactionHistory = getTransactionHistory;
const index_1 = __importDefault(require("./index"));
function getWallets() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield index_1.default.get('/wallets');
        return response.data;
    });
}
function getWalletBalances() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield index_1.default.get('/wallets/balances');
        return response.data;
    });
}
function setDefaultWallet(walletId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield index_1.default.put('/wallets/default', { walletId });
    });
}
function getTransactionHistory() {
    return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10) {
        const response = yield index_1.default.get(`/transfers?page=${page}&limit=${limit}`);
        return response.data;
    });
}
