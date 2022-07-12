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
exports.parsePostProduct = void 0;
const logger_1 = __importDefault(require("../../config/logger"));
const parsePostProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = {
            product_id: -1, product: "", aisle: -1, amount: 1
        };
        if (req.body.hasOwnProperty('product_id'))
            product.product_id = req.body.product_id;
        else
            throw new Error('Invalid or empty product id');
        if (req.body.hasOwnProperty('product'))
            product.product = req.body.product;
        else
            throw new Error('No product');
        if (req.body.hasOwnProperty('aisle'))
            product.aisle = req.body.aisle;
        else
            throw new Error('No aisle');
        if (req.body.hasOwnProperty('amount'))
            product.amount = req.body.amount;
        else
            throw new Error('No amount');
        req.postProduct = product;
        next();
    }
    catch (err) {
        logger_1.default.error(err);
        res.statusMessage = 'Bad Request';
        res.status(400).send();
        return;
    }
});
exports.parsePostProduct = parsePostProduct;
//# sourceMappingURL=post.middleware.js.map