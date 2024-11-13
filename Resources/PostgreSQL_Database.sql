-- Creating a unified users table that includes a role column
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
    image TEXT,
    role VARCHAR(100)  -- Column to specify user types like 'Admin', 'HR Manager', 'Product Manager', etc.
);

-- Creating additional tables for other parts of the system that reference the users table

CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    assigned_to INT REFERENCES users(user_id),  -- User to whom the task is assigned
    assigned_by INT REFERENCES users(user_id),  -- User who assigned the task
    description TEXT,
    due_date DATE,
    status VARCHAR(50)
);

CREATE TABLE performance_reports (
    report_id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES users(user_id),  -- Employee whom the report is about
    reported_by INT REFERENCES users(user_id),  -- User who is creating the report
    review_date DATE,
    score INT,
    notes TEXT
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2),
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
    quantity_sold INT,  -- Quantity of the product sold
    PRIMARY KEY (record_id, product_id)  -- Composite primary key
);
