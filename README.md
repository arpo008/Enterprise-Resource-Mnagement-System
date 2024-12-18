# Enterprise Resource Management System (ERP)
## Acknowledgment  
We would like to express our sincere gratitude to **Mr. AKM Iqtidar Newaz [IqN]**, [Lecturer, Department of ECE, North South University] for their invaluable guidance, constructive feedback, and constant encouragement throughout the development of this project. Their expertise and support have been instrumental in our success.  

## Team Members  
- **Md Tanvirul Islam Niloy** - 221 2806 042  
- **Anindita Das Mishi** - 221 1364 642  
- **Arpo Roy** - 221 2656 042  
- **Raiyan Masood Hriddho** - 193 1117 042  

## Overview  
The Enterprise Resource Management System (ERP) is a robust platform designed to streamline operations, manage resources efficiently, and enhance administrative control. It features a role-based access system, leveraging Node.js and Express with object-oriented principles to organize user roles and functionalities.  

## Features  
- **User Management**: Create, update, and delete user profiles for roles such as Admin, HR Manager, Product Manager, and Shop Manager.  
- **Role-Based Access Control**: Restrict or allow access to features based on user roles.  
- **Product Management**: Add, update, delete, and manage product information.  
- **Task Management**: Assign tasks and track progress to ensure efficient workflows.  
- **Security**: Secure access and data protection for sensitive information.  

## System Design  

### Class Diagram  
![Class Diagram](/Resources/Class_Daigram.jpg) 
The system uses a class-based structure for defining user roles and their interactions:  
- **User (Abstract Class)**: Base class for all user types, with common attributes like ID, name, and salary.  
- **Admin, HR Manager, Product Manager, Shop Manager**: Derived classes with specific methods for respective roles.  
- **Product and Task**: Core entities managed by user roles using defined methods.  

### Architectural Overview  
- **Backend**: TypeScript, Node.js with the Express framework.  
- **Database**: PostgreSQL for data management.  
- **Frontend**: JavaScript and Tailwind CSS.

### Software Design Pattern
- **Singleton Design Pattern**: Manages database connections.
- **Factory Design Pattern**: Dynamically extends employee roles.
- **Builder Design Pattern**: Creates user profiles efficiently.
- **Observer Design Pattern**: Allows employees to observe updates from the Shop Manager and ADMIN.
- **Strategy Design Pattern**: Implements dynamic bag addition to the cart.
- **Composite Design Pattern**: Extends the product class for modular functionality.

## Installation  

### Prerequisites  
- Node.js 
- npm  
- PostgreSQL
- JWT, ZOD

### Setup  
1. Clone the repository:  
   ```bash
   git clone <repository-url>
2. ```bash
   cd <project-directory>
3. ```bash
   npm install.
4. Set your .env
5. ```bash
   cd <Backend>
6. ```bash
   npm run dev --- for Backend
7. for the frontend you can start with index.js.

### Database
1. The code for the Postgre SQL database is available in the Resources folder.
