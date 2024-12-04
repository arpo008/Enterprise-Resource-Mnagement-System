// Purpose: Service for adding increment to user's salary.
import { Request, Response } from 'express';
import { User, UserBuilder } from '../models/user';
import { Admin} from '../models/Admin';
import { HRmanager} from '../models/HRmanager';
import { ProductManager} from '../models/ProductManager';
import { Seller } from '../models/shopListener';
import { ProductFactory } from '../models/extendedProduct';
import { ShopManager} from '../models/ShopManager';
import { EmployeeFactory } from '../models/shopListener';
import { verifyToken } from './handleJWTService'; 

import DatabaseSingleton from '../database/index';
import bcrypt from 'bcrypt';
import { z } from 'zod';

const updateQuantitySchema = z.object({
    "id": z.number(),
    "quantity": z.number(),
});

const ProductSchema = z.object({
    "id": z.number(),
    "name": z.string() ,
    "price": z.number(),
    "category": z.string(),
    "quantity": z.number(),
    "image": z.union([z.instanceof(Buffer), z.null()]), 
});

const ProductListSchema = z.object({
    products: z.array(
      z.object({
        id: z.number().int(),           // Ensures 'id' is an integer
        quantity: z.number().int().min(0) // Ensures 'quantity' is a non-negative integer
      })
    )
});

export class productService {
    
    async updatQuantity (req: Request, res: Response): Promise<void> {

        try {

            const token = req.headers.authorization?.split(' ')[1];

            if ( !token ) {
                res.status(401).json({ message: 'Login First' });
                return;
            }

            const tokenVerified = verifyToken(token);

            if ( tokenVerified == null ) {
                res.status(401).json({ message: 'Invalid Token' });
                return;
            }

            const parsedBody = updateQuantitySchema.parse(req.body);
            let { id, quantity} = parsedBody;


            const userBuilder = new UserBuilder()
                    .setId(tokenVerified.user_id)
                    .setRole(tokenVerified.role);
            
            let admin;
            if ( tokenVerified.role === 'Admin' ) {
                admin = new Admin (userBuilder.build());
            } else if ( tokenVerified.role === 'Product Manager' ) {
                admin = new ProductManager(userBuilder.build());
            } else {
                res.status(401).json({ message: 'You are Unauthorized for this' });
                return;
            }

            admin?.updateQuantity(id, quantity).then((result) => {
                res.status(200).json(result);
            }
            ).catch((error : any) => {
                res.status(500).json({ message: error.message });
            });


        } catch (error: any) {
            console.error('Error executing query:', error.message);
            if (error instanceof z.ZodError) {
                res.status(400).json({ message: "Invalid data type"});
            } else {
                res.status(500).json({ message: error.message });
            }
        }

    }

    async getAllProduct (req: Request, res: Response): Promise<void> {

        try {

            const token = req.headers.authorization?.split(' ')[1];

            if ( !token ) {
                res.status(401).json({ message: 'Login First' });
                return;
            }

            const tokenVerified = verifyToken(token);

            if ( tokenVerified == null ) {
                res.status(401).json({ message: 'Invalid Token' });
                return;
            }

            const userBuilder = new UserBuilder()
                    .setId(tokenVerified.user_id)
                    .setRole(tokenVerified.role);
            
            let admin;
            if ( tokenVerified.role === 'Admin' ) {
                admin = new Admin (userBuilder.build());
            } else if ( tokenVerified.role === 'Product Manager' ) {
                admin = new ProductManager(userBuilder.build());
            } else if ( tokenVerified.role === 'Seller' ) {
                const employeeFactory = new EmployeeFactory();
                admin = employeeFactory.getEmployee(userBuilder.build());

                if ( admin instanceof Seller ) {
                    admin = admin as Seller;
                } else {
                    res.status(401).json({ message: 'You are Unauthorized for this' });
                    return;
                }

            } else {
                res.status(401).json({ message: 'You are Unauthorized for this' });
                return;
            }

            admin?.getAllProducts().then((result) => {
                res.status(200).json(result);
            }
            ).catch((error : any) => {
                res.status(500).json({ message: error.message });
            });


        } catch (error: any) {
            console.error('Error executing query:', error.message);
            if (error instanceof z.ZodError) {
                res.status(400).json({ message: "Invalid data type"});
            } else {
                res.status(500).json({ message: error.message });
            }
        }

    }

    async updateProduct (req: Request, res: Response): Promise<void> {
            
        try {

            const token = req.headers.authorization?.split(' ')[1];

            if ( !token ) {
                res.status(401).json({ message: 'Login First' });
                return;
            }

            const tokenVerified = verifyToken(token);

            if ( tokenVerified == null ) {
                res.status(401).json({ message: 'Invalid Token' });
                return;
            }

            const parsedBody = ProductSchema.parse(req.body);
            let { id, name, price, category, quantity, image} = parsedBody;

            const userBuilder = new UserBuilder()
                    .setId(tokenVerified.user_id)
                    .setRole(tokenVerified.role);

            let admin;
            if ( tokenVerified.role === 'Admin' ) {
                admin = new Admin (userBuilder.build());
            } else if ( tokenVerified.role === 'Product Manager' ) {
                admin = new ProductManager(userBuilder.build());
            } else {
                res.status(401).json({ message: 'You are Unauthorized for this' });
                return;
            }

            admin?.updateProduct(id, name, price, category, quantity, image).then((result) => {
                res.status(200).json(result);
            }
            ).catch((error : any) => {
                res.status(500).json({ message: error.message });
            });

        } catch (error: any) {
            console.error('Error executing query:', error.message);
            if (error instanceof z.ZodError) {
                res.status(400).json({ message: "Invalid data type"});
            } else {
                res.status(500).json({ message: error.message });
            }
        }

    }

    async buyProduct (req: Request, res: Response): Promise<void> {
                
        try {

            const token = req.headers.authorization?.split(' ')[1];

            if ( !token ) {
                res.status(401).json({ message: 'Login First' });
                return;
            }

            const tokenVerified = verifyToken(token);

            if ( tokenVerified == null ) {
                res.status(401).json({ message: 'Invalid Token' });
                return;
            }

            const parsedBody = ProductListSchema.parse(req.body);
            let { products } = parsedBody;

            const userBuilder = new UserBuilder()
                    .setId(tokenVerified.user_id)
                    .setRole(tokenVerified.role);

            let admin;
            if ( tokenVerified.role === 'Seller' ) {
                const employeeFactory = new EmployeeFactory();
                admin = employeeFactory.getEmployee(userBuilder.build());

                if ( admin instanceof Seller ) {
                    admin = admin as Seller;
                } else {
                    res.status(401).json({ message: 'You are Unauthorized for this' });
                    return;
                }
            } else {
                res.status(401).json({ message: 'You are Unauthorized for this' });
                return;
            }

            admin?.buyProduct(products).then((result) => {
                res.status(200).json(result);
            }
            ).catch((error : any) => {
                res.status(500).json({ message: error.message });
            });

        } catch (error: any) {
            console.error('Error executing query:', error.message);
            if (error instanceof z.ZodError) {
                res.status(400).json({ message: "Invalid data type"});
            } else {
                res.status(500).json({ message: error.message });
            }
        }

    }
}

