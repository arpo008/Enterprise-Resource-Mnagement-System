
import { User } from './user';

export interface UserManagement {
    addNewUser(user: User): Promise<Object>; 
    removeUser(number : Number): Promise<Object>;
    getAllUsers(): Promise<Object>;
}

export interface PerformanceManagement {
    submitReport(id: number, score : number, comment : string): Promise<Object>;
}

export interface TaskManagement {
    createTask(title: string, description: string, roleRequired: string): Promise<Object>;
}

export interface Employee extends User {

    completeTask(number: Number): void;
}

export interface Product {
    updateStock(newQuantity: number): void;
    buyProduct(quantity: number): void;
    getPrice(): number;
    getType(): string;
}

export interface Products {
    "id": number;
    "quantity": number;
  }
  

export interface ProductManagement {
    addProduct(name: String, price: number, category: string, quantity: number, image: Buffer): Promise<Object>;
    removeProduct(id: number): Promise<Object>;
    updateQuantity(id: number, quantity: number): Promise<Object>;
    getAllProducts(): Promise<Object>;
    updateProduct(id: number, name: string, price: number, category: string, quantity: number, image: Buffer | null): Promise<Object>
}

export interface Observable {
    loadObserversFromDatabase(): Promise<Object>;
    addObserver(observer: Employee): Promise<Object>;
    removeObserver(observer: Employee): Promise<Object>;
    notifyObservers(taskId: number): Promise<Object>;
}