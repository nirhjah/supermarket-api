import {Express} from "express";
import * as products from '../controllers/user_product.server.controller';
import {parsePostProduct} from "../middleware/post.middleware";
module.exports = ( app: Express ) => {

    app.route( '/api/user_products' )
        .get( products.listuser )
        .post( parsePostProduct, products.addProduct )

    app.route( '/api/user_products/:id' )
        .get( products.readuserproduct )
        .delete( products.deleteProduct )



};