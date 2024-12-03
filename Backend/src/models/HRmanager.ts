import { User } from './user';
import DatabaseSingleton from '../database/index';
import { insertNewUser, deleteUserQ, findUserQ, updateUserSalary, getAttendance, submitReportQ} from '../queries/userQueries';
import { UserManagement, PerformanceManagement } from './interfaces';


export class HRmanager extends User implements UserManagement, PerformanceManagement {
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
            "HR Manager"  // Set the role as Admin for the Admin class
        );
    }

    async addNewUser(user: User): Promise<Object> {
        
        // if (user.role !== 'Admin') {
        //     return {'message': 'Only Admin can add new users'};
        // }

        // const result = await db.query(
        //     'INSERT INTO users(first_name, last_name, address, gender, dob, telephone, age, salary, image, password, role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *', 
        //     [user.first_name, user.last_name, user.address, user.gender, user.dob, user.telephone, user.age, user.salary, user.image, user.password, user.role]
        //   ); 
        // if (result.rows.length > 0) {
        //     return result.rows[0];
        // } else {
        //     return {'message': 'User not added'};
        // }
        return {'message': 'User not added'};
    }

    async removeUser(number: Number) : Promise<Object> {
        
        // let result;
        // result = await db.query( 'SELECT * FROM users WHERE user_id = $1', [number] );
        // if (result.rows.length === 0) {
        //     return {'message': 'User not found'};
        // }

        // if (result.rows[0].role === 'Admin') {

        //     return {'message': 'Cannot delete Admin'};
        // } else if ( result.rows[0].role === 'HR Manager') {

        //     return {'message': 'Cannot delete HR Manager'};
        // } else if ( result.rows[0].user_id === this.user_id) {

        //     return {'message': 'Cannot delete yourself'};
        // }

        // result = await db.query(
        //     'DELETE FROM users WHERE user_id = $1 RETURNING *', 
        //     [number]
        //   ); 
        // if (result.rows.length > 0) {
        //     return result.rows[0];
        // } else {
        //     return {};
        // }
        return {'message': 'User not added'};
    }

    async addIncrement(number: number, increment: number) : Promise<Object> {
        
        const db = DatabaseSingleton.getInstance().getClient();
        let result = await db.query(findUserQ, [number]);

        if (result.rows.length === 0) {
            return {'message': 'User not found'};
        }

        let salary = Number(result.rows[0].salary);
        
        increment /= 100;
        let temp = salary * increment;
        salary = salary + temp;
        if (salary < 0) {
            salary = 1;
        }

        result = await db.query(updateUserSalary, [salary, number]);

        if (result.rows.length === 0) {
            return {'message': 'User not found'};
        } 

        const user = result.rows[0];

        if (result.rows.length === 0) {
            return {'message': 'User not found'};
        } else {
            return {'message': 'New salary is ' + user.salary + 'BDT'};
        }
        
    }

    async getAttendece(user_id: number, date1: string, date2: string ): Promise<Object> {
        
        const db = DatabaseSingleton.getInstance().getClient();
        let result = await db.query(getAttendance, [user_id, date1, date2]);

        if (result.rows.length > 0) {
            return { 'message' : 'User Founded', 'Attendence': result.rows};
        } else {
            return {'message': 'No Data Found'};
        }
    }

    async submitReport(id: number, score : number, comment : string): Promise<Object> {


        const db = DatabaseSingleton.getInstance().getClient();
        let result = await db.query(findUserQ, [id]);

        if (result.rows.length === 0) {
            return {'message': 'User not found'};
        } else if ( result.rows[0].role === 'Admin') {
            return {'message': 'You cannot submit report for ADMIN'};
        } else if ( result.rows[0].role === 'HR Manager') {
            return {'message': 'You cannot submit report for Yourself'};
        }
        
        result = await db.query(submitReportQ, [id, this.user_id, score, comment]);
        
        if (result.rows.length > 0) {
            return { 'message' : 'Report Submitted'};
        } else {
            return {'message': 'Report not submitted'};
        }
    }
}