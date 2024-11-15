CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    address TEXT,
    gender CHAR(1),
    dob DATE,
    telephone VARCHAR(15),
    age INT,
    salary DECIMAL(10, 2),
    image bytea,
    role VARCHAR(100)  -- Column to specify user types like 'Admin', 'HR Manager', 'Product Manager', etc.
);

CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    assigned_to INT REFERENCES users(user_id),
    assigned_by INT REFERENCES users(user_id),
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    due_date DATE,
    status VARCHAR(50)
);
CREATE TABLE performance_reports (
    report_id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES users(user_id),
    reported_by INT REFERENCES users(user_id),
    review_date DATE,
    score INT CHECK (score BETWEEN 0 AND 100),  -- Assuming score is a percentage
    notes TEXT,
    UNIQUE (employee_id, review_date)
);
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) CHECK (price >= 0),
    category VARCHAR(255),
    stock_quantity INT CHECK (stock_quantity >= 0),  -- Adding a check constraint for non-negative stock quantities
    image bytea,  -- Storing images as binary data
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

CREATE TABLE sales_records (
    record_id SERIAL PRIMARY KEY,
    sold_by INT REFERENCES users(user_id),  -- User who made the sale
    sale_date DATE,  -- Date of the sale
    total_amount DECIMAL(10, 2)  -- Total amount of the sale (optional, can be calculated)
);

CREATE TABLE sales_products (
    record_id INT REFERENCES sales_records(record_id),  -- Link to sales_records
    product_id INT REFERENCES products(product_id),  -- Link to products
    quantity_sold INT CHECK (quantity_sold >= 0),  -- Quantity of the product sold
    PRIMARY KEY (record_id, product_id)  -- Composite primary key
);

CREATE TABLE attendance (
    attendance_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id), -- User who is logging in
    date DATE DEFAULT CURRENT_DATE, -- Date of the attendance record
    clock_in_time TIMESTAMP, -- Time when the employee logs in
    clock_out_time TIMESTAMP, -- Time when the employee logs out
    total_hours DECIMAL(5, 2) GENERATED ALWAYS AS (EXTRACT(EPOCH FROM (clock_out_time - clock_in_time)) / 3600) STORED, -- Total hours worked
    status VARCHAR(50) DEFAULT 'active', -- 'active' means the employee is still logged in, 'completed' means they've logged out
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO users (first_name, last_name, address, gender, dob, telephone, age, salary, image, role)
VALUES 
('Alice', 'Smith', '123 Main St, Cityville', 'F', '1990-05-15', '123-456-7890', 34, 75000.50, '\\x89504e470d0a1a0a...', 'Admin'),
('Bob', 'Johnson', '456 Elm St, Townsville', 'M', '1985-09-10', '234-567-8901', 39, 65000.00, '\\x89504e470d0a1a0a...', 'HR Manager'),
('Charlie', 'Brown', '789 Maple St, Villagetown', 'M', '1992-12-05', '345-678-9012', 31, 55000.75, '\\x89504e470d0a1a0a...', 'Product Manager');

INSERT INTO tasks (assigned_to, assigned_by, description, created_at, due_date, status)
VALUES 
(1, 2, 'Prepare quarterly financial report', '2024-11-01 10:00:00', '2024-11-30', 'In Progress'),
(2, 1, 'Organize company training session', '2024-11-05 09:30:00', '2024-11-20', 'Pending'),
(3, 1, 'Review new product design', '2024-11-10 14:00:00', '2024-12-05', 'Completed');

INSERT INTO performance_reports (employee_id, reported_by, review_date, score, notes)
VALUES 
(1, 2, '2024-11-01', 85, 'Good performance with room for improvement.'),
(2, 1, '2024-11-05', 90, 'Excellent management of HR activities.'),
(3, 1, '2024-11-10', 75, 'Needs to focus more on meeting project deadlines.');

INSERT INTO products (name, price, category, stock_quantity, image, created_at, updated_at)
VALUES 
('Laptop', 1200.00, 'Electronics', 50, '\\x89504e470d0a1a0a...', '2024-10-01 12:00:00', '2024-10-01 12:00:00'),
('Desk Chair', 150.50, 'Furniture', 200, '\\x89504e470d0a1a0a...', '2024-10-05 15:30:00', '2024-10-05 15:30:00'),
('Wireless Mouse', 25.99, 'Accessories', 300, '\\x89504e470d0a1a0a...', '2024-10-10 10:00:00', '2024-10-10 10:00:00');

INSERT INTO sales_records (sold_by, sale_date, total_amount)
VALUES 
(1, '2024-11-12', 1400.00),
(2, '2024-11-13', 300.50),
(3, '2024-11-14', 60.00);

INSERT INTO sales_products (record_id, product_id, quantity_sold)
VALUES 
(1, 1, 1),  -- 1 Laptop sold in record 1
(2, 2, 2),  -- 2 Desk Chairs sold in record 2
(3, 3, 3);  -- 3 Wireless Mice sold in record 3

INSERT INTO attendance (user_id, date, clock_in_time, clock_out_time, status)
VALUES 
(1, '2024-11-12', '2024-11-12 09:00:00', '2024-11-12 17:00:00', 'completed'),
(2, '2024-11-13', '2024-11-13 08:30:00', '2024-11-13 16:30:00', 'completed'),
(3, '2024-11-14', '2024-11-14 09:15:00', NULL, 'active');