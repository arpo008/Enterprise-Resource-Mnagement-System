
import { User } from './user';

export interface UserManagement {
    addNewUser(user: User): Promise<Object>; 
    removeUser(number : Number): Promise<Object>;
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

export interface Observable {
    loadObserversFromDatabase(): Promise<Object>;
    addObserver(observer: Employee): Promise<Object>;
    removeObserver(observer: Employee): Promise<Object>;
    notifyObservers(taskId: number): Promise<Object>;
}