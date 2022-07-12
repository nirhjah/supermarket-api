import express from "express";
import bodyParser from "body-parser"
import allowCrossOriginRequestsMiddleware from '../app/middleware/cors.middleware';


export default () => {
    const app = express();
    app.use(allowCrossOriginRequestsMiddleware);
    app.use( bodyParser.json() );
    require('../app/routes/product.server.routes.js')(app);
    require('../app/routes/user_product.server.route')(app);

    return app;
};