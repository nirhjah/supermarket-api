declare namespace Express {
    export interface Request {
        authId?: number
        postProduct: Product
    }
}