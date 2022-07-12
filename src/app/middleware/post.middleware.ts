import {NextFunction, Request, Response} from "express";
import Logger from "../../config/logger";

const parsePostProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        const product: Product = {
            product_id:-1, product: "", aisle: -1, amount: 1
        }
        if (req.body.hasOwnProperty('product_id') )
            product.product_id = req.body.product_id
        else
            throw new Error('Invalid or empty product id')
        if (req.body.hasOwnProperty('product'))
            product.product = req.body.product
        else
            throw new Error('No product')
        if (req.body.hasOwnProperty('aisle'))
            product.aisle = req.body.aisle
        else
            throw new Error('No aisle')
        if (req.body.hasOwnProperty('amount'))
            product.amount = req.body.amount
        else
            throw new Error('No amount')


        req.postProduct = product
        next()
    } catch (err) {
        Logger.error(err)
        res.statusMessage = 'Bad Request';
        res.status(400).send();
        return;
    }
}



export {parsePostProduct}