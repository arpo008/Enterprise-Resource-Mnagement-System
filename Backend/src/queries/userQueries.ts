const getUserById: string = `
  SELECT * FROM users WHERE id = $1;
`;

const getAllUsers: string = `
  SELECT * FROM users;
`;

const insertNewUser: string = `
  INSERT INTO users(first_name, last_name, address, gender, dob, telephone, age, salary, image, password, role) 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
  RETURNING *;
`;

const loginUser: string = `
  SELECT * FROM users WHERE user_id = $1;
`;

const findUserQ: string = `
  SELECT * FROM users WHERE user_id = $1;
`;

const deleteUserQ: string = `
  UPDATE users
  SET status = CASE
      WHEN status = 'active' THEN 'inactive'
      ELSE 'active'
  END
  WHERE user_id = $1
  RETURNING *;
`;

const updateUserSalary: string = `
  UPDATE users
  SET salary = $1
  WHERE user_id = $2
  RETURNING *;
`;

const logoutQuery: string = `
  UPDATE attendance
  SET 
      clock_out_time = CURRENT_TIMESTAMP,  -- Set clock_out_time to current time
      status = 'completed'  -- Change status to 'completed'
  WHERE user_id = $1  -- Replace $1 with the provided user_id
    AND date = CURRENT_DATE  -- Ensure the attendance record is for today
  AND status = 'active';  -- Only update if the user is still logged in

`;

const loginQuery: string = `
  INSERT INTO attendance (user_id, clock_in_time, status)
  VALUES ($1, CURRENT_TIMESTAMP, $2) 
  RETURNING *;
`;

const getAttendance: string = `
  SELECT * FROM attendance
  WHERE user_id = $1
    AND date BETWEEN $2 AND $3;
`;

const submitReportQ: string = `
  INSERT INTO performance_reports(employee_id, reported_by, review_date, score, notes)
  VALUES ($1, $2, CURRENT_DATE, $3, $4)
  RETURNING *;
`;

const getReportfrAdmninQ: string = `
  SELECT * FROM performance_reports
  WHERE employee_id = $1;
`;

const insertProductQ: string = `
  INSERT INTO products(name, price, category, stock_quantity, image, created_at, updated_at) 
  VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) 
  RETURNING *;
`;

const deleteProductQ: string = `
  DELETE FROM products WHERE product_id = $1 RETURNING *;
`;

const updateQuantityQ: string = `
  UPDATE products
  SET stock_quantity = $1, updated_at = CURRENT_TIMESTAMP
  WHERE product_id = $2
  RETURNING *;
`;

const updateProductQ: string = `
  UPDATE products
  SET name = $1, price = $2, category = $3, stock_quantity = $4, image = $5, updated_at = CURRENT_TIMESTAMP
  WHERE product_id = $6
  RETURNING *;
`;

const getSalesRecordQ: string = `
  INSERT INTO sales_records (sold_by, sale_date, total_amount)
  VALUES ($1, CURRENT_TIMESTAMP, $2)
  RETURNING record_id;
`;

const addSoldProductsQ: string = `
  INSERT INTO sales_products (record_id, product_id, quantity_sold)
  VALUES ($1, $2, $3);
`;

const getProductQ: string = `
  SELECT * FROM products WHERE product_id = $1;
`;

export {  
  getUserById,
  getAllUsers,
  insertNewUser,
  loginUser,
  findUserQ,
  deleteUserQ,
  updateUserSalary,
  logoutQuery,
  loginQuery,
  getAttendance,
  submitReportQ,
  getReportfrAdmninQ,
  insertProductQ,
  deleteProductQ,
  updateQuantityQ,
  updateProductQ,
  getSalesRecordQ,
  addSoldProductsQ,
  getProductQ
};