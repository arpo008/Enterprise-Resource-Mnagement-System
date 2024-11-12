# Enterprise Resource Management System (ERP)

## Overview
This project is an Enterprise Resource Management System designed to streamline operations, manage resources, and enhance administrative control through a role-based access system. It is built using Node.js and Express, leveraging object-oriented programming principles to organize user roles and functionalities.

## Features

- **User Management**: Handle creation, modification, and deletion of user profiles across different roles including Admin, HR Manager, Product Manager, and Shop Manager.
- **Role-Based Access Control**: Restrict or allow access to various parts of the system based on the user's role.
- **Product Management**: Add, delete, update, and manage products.
- **Task Management**: Assign and track tasks for employees, ensuring efficient workflow management.
- **Security**: Implement secure access and data handling to protect sensitive information.

## System Design

### Class Diagram
The system utilizes a class-based structure to define user roles and their interactions:

- **User (Abstract Class)**: Base class for all user types with common attributes such as ID, name, and salary.
- **Admin, HR Manager, Product Manager, Shop Manager**: Classes derived from User, each with methods tailored to their responsibilities.
- **Product and Task**: Essential entities managed by user roles through specific class methods.

![Class Diagram](/Resources/Class_Daigram.jpg) 

### Architectural Overview
- **Backend**: Node.js with Express framework.
- **Database**: PostgreSQL for storing user data, product details, and task information.
- **Frontend**: (Optional) Describe if there's any frontend component.

## Installation

### Prerequisites
- Node.js
- npm
- PostgreSQL

### Setup
Clone the repository and install the dependencies.
