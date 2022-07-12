"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.addProduct = exports.deleteProduct = exports.readuserproduct = exports.listuser = void 0;
const logger_1 = __importDefault(require("../../config/logger"));
const Product = __importStar(require("../models/user_product.server.model"));
const listuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.http(`GET all user products`);
    try {
        const result = yield Product.getAllUserProducts();
        res.status(200).send(result);
    }
    catch (err) {
        res.status(500)
            .send(`ERROR getting users ${err}`);
    }
});
exports.listuser = listuser;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = parseInt(req.params.id, 10);
        const product = yield Product.getOneUserProduct(productId);
        if (product == null) {
            res.status(404).send();
            return;
        }
        yield Product.removeProduct(productId);
        res.status(200).send();
        return;
    }
    catch (err) {
        logger_1.default.error(err);
        res.status(500).send();
        return;
    }
});
exports.deleteProduct = deleteProduct;
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = yield Product.createProduct(req.postProduct);
        res.statusMessage = 'Created';
        res.status(201).json({ productId });
    }
    catch (err) {
        if (err.errno === 1062) { // duplicate key entry
            res.statusMessage = "Duplicate entry";
            res.status(403).send(err.sqlMessage);
        }
        else {
            logger_1.default.error(err);
            res.statusMessage = 'Internal Server Error';
            res.status(500).send();
        }
    }
});
exports.addProduct = addProduct;
const readuserproduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.http(`GET single product id: ${req.params.id}`);
    const id = req.params.id;
    try {
        const result = yield Product.getOneUserProduct(parseInt(id, 10));
        if (result.length === 0) {
            res.status(404).send('Product not found');
        }
        else {
            res.status(200).send(result[0]);
        }
    }
    catch (err) {
        res.status(500).send(`ERROR reading product ${id}: ${err}`);
    }
});
exports.readuserproduct = readuserproduct;
//# sourceMappingURL=user_product.server.controller.js.map