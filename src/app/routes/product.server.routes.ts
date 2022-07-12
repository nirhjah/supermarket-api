import {Express} from "express";
import * as products from '../controllers/product.server.controller';
module.exports = ( app: Express ) => {
    app.route( '/api/products' )
        .get( products.list )


    app.route( '/api/products/:id' )
        .get( products.read )

};