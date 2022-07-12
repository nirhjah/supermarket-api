import Logger from "../../config/logger";
import {getPool} from "../../config/db";

const getAllUserProducts = async () : Promise<Product[]> => {
    Logger.info(`Getting all user products from the database`);
    const conn = await getPool().getConnection();
    const query = 'select * from user_products';
    const [ rows ] = await conn.query( query );
    conn.release();
    return rows;
};

const getOneUserProduct = async (id: number) : Promise<Product[]> => {
    Logger.info(`Getting product ${id} from the database`);
    const conn = await getPool().getConnection();
    const query = 'select * from user_products where product_id = ?';
    const [ rows ] = await conn.query( query, [ id ] );
    conn.release();
    return rows;
};

const removeProduct = async (id: number): Promise<void> => {
    const query = `DELETE FROM \`user_products\` WHERE product_id = ?`;
    const [result] = await getPool().query(query, [id])
}

const createProduct = async(product: Product): Promise<number> => {
    const query = `INSERT INTO \`user_products\` (product_id, product, aisle, amount ) VALUES (?)`;
    const [result] = await getPool().query(query, [Object.values(product)])
    return result.insertId;
}


export { getAllUserProducts, getOneUserProduct, removeProduct, createProduct }