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
  DELETE FROM users WHERE user_id = $1 RETURNING *;
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
  submitReportQ 
};