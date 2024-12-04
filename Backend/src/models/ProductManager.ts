
import { User } from "./user";
import { Product } from "./interfaces";
import DatabaseSingleton from '../database/index';
import { insertProductQ, updateProductQ } from '../queries/userQueries';
import { ProductFactory } from './extendedProduct';

export class ProductManager extends User {
    constructor(user: User) {
        // Directly pass the user data to the parent class (User)
        super(
            user.user_id,
            user.first_name,
            user.last_name,
            user.address,
            user.gender,
            user.dob,
            user.telephone,
            user.age,
            user.salary,
            user.password,
            user.image,
            "Product Manager"
        );
    }

    async addProduct(name: string, price: number, category: string, quantity: number, image: Buffer | null): Promise<Object> {
        
        const db = DatabaseSingleton.getInstance().getClient();
        const product = await db.query('SELECT * FROM products WHERE name = $1', [name]);

        if (product.rows.length > 0) {
            throw new Error ('Product already exists');  
        }

        try {
            const tempo = ProductFactory.createProduct(name, price, category, quantity, image);

            if (price < 0) {
                throw new Error ('Price cannot be negative');
            }

            if ( quantity < 0 ) {
                throw new Error ('Quantity cannot be negative');
            }
        } catch (error : any) {
            throw new Error (error.message);
        }
        
        const result = await db.query(insertProductQ, [ name, price, category, quantity, image ]);

        if (result.rows.length > 0) {
            return { 'message' : 'Product Added', 'product_id': result.rows[0].product_id};
        } else {
            throw new Error ('Product not added');
        }
    }

    async removeProduct(id: number): Promise<Object> {
        throw new Error("Method not implemented.");
    }

    async updateQuantity(id: number, quantity: number): Promise<Object> {
            
        const db = DatabaseSingleton.getInstance().getClient();
        let result = await db.query('SELECT * FROM products WHERE product_id = $1', [id]);

        if (result.rows.length === 0) {
            throw new Error ('Product not found');
        }

        if (quantity < 0) {
            throw new Error ('Quantity cannot be negative');
        }

        quantity += result.rows[0].stock_quantity;

        result = await db.query('UPDATE products SET stock_quantity = $1 WHERE product_id = $2', [quantity, id]);

        if (result.rows.length > 0) {
            return { 'message' : 'Quantity Updated', 'product_id': result.rows[0].product_id, 'new_quantity': result.rows[0].stock_quantity};
        } else {
            throw new Error ('Quantity not updated');
        }
    }

    async getAllProducts(): Promise<Object> {
        
        const db = DatabaseSingleton.getInstance().getClient();
        const result = await db.query('SELECT * FROM products');

        if (result.rows.length > 0) {
            return { 'message' : 'Products Found', 'Products': result.rows};
        } else {
            return {'message': 'No Products Found'};
        }
    }

    async updateProduct(id: number, name: string, price: number, category: string, quantity: number, image: Buffer | null): Promise<Object> {
        
        try {
            const tempo = ProductFactory.createProduct(name, price, category, quantity, image);

            if (price < 0) {
                throw new Error ('Price cannot be negative');
            }

            if ( quantity < 0 ) {
                throw new Error ('Quantity cannot be negative');
            }

            const db = DatabaseSingleton.getInstance().getClient();
            let result = await db.query(updateProductQ, [name, price, category, quantity, image, id]);

            if (result.rows.length > 0) {
                return { 'message' : 'Product Updated', 'product_id': result.rows[0].product_id};
            } else {
                throw new Error ('Product not existed');
            }
        } catch (error : any) {
            throw new Error (error.message);
        }
        
    }
}