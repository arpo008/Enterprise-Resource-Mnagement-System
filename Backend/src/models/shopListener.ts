
import { User } from './user';
import { Employee } from './interfaces';

export class Seller extends User implements Employee {
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
            'Seller'  // Set the role as Seller for the Seller class
        );
    }

    completeTask(number: number): void {
        console.log(`Task ${number} completed`);
    }

    completeSale(): void {
        console.log('Sale completed');
    }
}

export class ShopWorker extends User implements Employee {
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
            'Shop Worker'  // Set the role as Seller for the Seller class
        );
    }

    completeTask(number: number): void {
        console.log(`Task ${number} completed`);
    }
}

export class Cleaner extends User implements Employee {
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
            'Cleaner'  // Set the role as Seller for the Seller class
        );
    }

    completeTask(number: number): void {
        console.log(`Task ${number} completed by cleaner`);
    }
}


export class Guard extends User implements Employee {
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
            'Guard'  // Set the role as Seller for the Seller class
        );
    }

    completeTask(number: number): void {
        console.log(`Task ${number} completed`);
    }
}

export class EmployeeFactory {

    getEmployee(user: User): Employee {
        switch (user.role) {
            case 'Seller':
                return new Seller(user);
            case 'ShopWorker':
                return new ShopWorker(user);
            case 'Cleaner':
                return new Cleaner(user);
            case 'Guard':
                return new Guard(user);
            default:
                throw new Error('Invalid role');
        }
    }
}