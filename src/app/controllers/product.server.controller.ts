import * as products from '../models/product.server.model';
import Logger from "../../config/logger";
import {Request, Response} from "express";
const list = async (req:any, res:any) : Promise<any> => {
    Logger.http(`GET all products`)
    try {
        const result = await products.getAll();
        res.status( 200 ).send( result );
    } catch( err ) {
        res.status( 500 )
            .send( `ERROR getting users ${ err }` );
    }
};

const read = async (req: Request, res: Response) : Promise<void> =>
{
    Logger.http(`GET single product id: ${req.params.id}`)
    const id = req.params.id;
    try {
        const result = await products.getOne( parseInt(id, 10) );
        if( result.length === 0 ){
            res.status( 404 ).send('Product not found');
        } else {
            res.status( 200 ).send( result[0] );
        }
    } catch( err ) {
        res.status( 500 ).send( `ERROR reading product ${id}: ${ err }`
        );
    }
};


export { list, read }