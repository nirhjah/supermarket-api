import {Request, Response} from "express";
import Logger from "../../config/logger";
import * as Product from "../models/user_product.server.model";

const listuser = async (req:any, res:any) : Promise<any> => {
    Logger.http(`GET all user products`)
    try {
        const result = await Product.getAllUserProducts();
        res.status( 200 ).send( result );
    } catch( err ) {
        res.status( 500 )
            .send( `ERROR getting users ${ err }` );
    }
};


const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const productId = parseInt(req.params.id, 10);
        const product = await Product.getOneUserProduct(productId);
        if(product == null){
            res.status(404).send()
            return;
        }

        await Product.removeProduct(productId);
        res.status(200).send();
        return;
    } catch (err) {
        Logger.error(err)
        res.status(500).send()
        return;
    }
}

const addProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const productId = await Product.createProduct(req.postProduct);
        res.statusMessage = 'Created';
        res.status(201).json({productId});
    } catch (err) {
        if (err.errno === 1062) { // duplicate key entry
            res.statusMessage = "Duplicate entry"
            res.status(403).send(err.sqlMessage)
        } else {
            Logger.error(err);
            res.statusMessage = 'Internal Server Error';
            res.status(500).send();
        }
    }
}



const readuserproduct = async (req: Request, res: Response) : Promise<void> =>
{
    Logger.http(`GET single product id: ${req.params.id}`)
    const id = req.params.id;
    try {
        const result = await Product.getOneUserProduct( parseInt(id, 10) );
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


export { listuser, readuserproduct, deleteProduct, addProduct }