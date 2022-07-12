import { getPool } from "../../config/db";
import Logger from "../../config/logger";
import {ResultSetHeader} from "mysql2";
const getAll = async () : Promise<Product[]> => {
    Logger.info(`Getting all products from the database`);
    const conn = await getPool().getConnection();
    const query = 'select * from products';
    const [ rows ] = await conn.query( query );
    conn.release();
    return rows;
};


const getOne = async (id: number) : Promise<Product[]> => {
    Logger.info(`Getting product ${id} from the database`);
    const conn = await getPool().getConnection();
    const query = 'select * from products where product_id = ?';
    const [ rows ] = await conn.query( query, [ id ] );
    conn.release();
    return rows;
};

const insert = async (username: string) : Promise<any> => {
    return null;
};
const alter = async (id: number, username: string) : Promise<any> => {
    return null;
};
const remove = async (id: number) : Promise<any> => {
    return null;
};
export { getAll, getOne, insert, alter, remove }