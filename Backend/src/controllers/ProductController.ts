// DeleteUserController.ts
import { Request, Response } from 'express';
import { productService } from '../services/ProductServices';
import { add } from 'date-fns';

const service = new productService();
export class ProductController {

    async updateQuantity (req: Request, res: Response): Promise<void> {

        try {

            await service.updatQuantity(req, res);
        } catch (error: any) {
            console.error('Error in add_Increment_Controller:', error.message);
            res.status(500).json({ message: error.message });
        }
    }

    async getAllProduct (req: Request, res: Response): Promise<void> {

        try {

            await service.getAllProduct(req, res);
        } catch (error: any) {
            console.error('Error in add_Increment_Controller:', error.message);
            res.status(500).json({ message: error.message });
        }
    }
}
