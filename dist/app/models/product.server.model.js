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
exports.remove = exports.alter = exports.insert = exports.getOne = exports.getAll = void 0;
const db_1 = require("../../config/db");
const logger_1 = __importDefault(require("../../config/logger"));
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Getting all products from the database`);
    const conn = yield (0, db_1.getPool)().getConnection();
    const query = 'select * from products';
    const [rows] = yield conn.query(query);
    conn.release();
    return rows;
});
exports.getAll = getAll;
const getOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Getting product ${id} from the database`);
    const conn = yield (0, db_1.getPool)().getConnection();
    const query = 'select * from products where product_id = ?';
    const [rows] = yield conn.query(query, [id]);
    conn.release();
    return rows;
});
exports.getOne = getOne;
const insert = (username) => __awaiter(void 0, void 0, void 0, function* () {
    return null;
});
exports.insert = insert;
const alter = (id, username) => __awaiter(void 0, void 0, void 0, function* () {
    return null;
});
exports.alter = alter;
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return null;
});
exports.remove = remove;
//# sourceMappingURL=product.server.model.js.map