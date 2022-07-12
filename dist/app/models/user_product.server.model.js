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
exports.createProduct = exports.removeProduct = exports.getOneUserProduct = exports.getAllUserProducts = void 0;
const logger_1 = __importDefault(require("../../config/logger"));
const db_1 = require("../../config/db");
const getAllUserProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Getting all user products from the database`);
    const conn = yield (0, db_1.getPool)().getConnection();
    const query = 'select * from user_products';
    const [rows] = yield conn.query(query);
    conn.release();
    return rows;
});
exports.getAllUserProducts = getAllUserProducts;
const getOneUserProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Getting product ${id} from the database`);
    const conn = yield (0, db_1.getPool)().getConnection();
    const query = 'select * from user_products where product_id = ?';
    const [rows] = yield conn.query(query, [id]);
    conn.release();
    return rows;
});
exports.getOneUserProduct = getOneUserProduct;
const removeProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `DELETE FROM \`user_products\` WHERE product_id = ?`;
    const [result] = yield (0, db_1.getPool)().query(query, [id]);
});
exports.removeProduct = removeProduct;
const createProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `INSERT INTO \`user_products\` (product_id, product, aisle, amount ) VALUES (?)`;
    const [result] = yield (0, db_1.getPool)().query(query, [Object.values(product)]);
    return result.insertId;
});
exports.createProduct = createProduct;
//# sourceMappingURL=user_product.server.model.js.map