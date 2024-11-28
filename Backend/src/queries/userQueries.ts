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

export {  
  getUserById,
  getAllUsers,
  insertNewUser,
  loginUser,
  findUserQ,
  deleteUserQ,
  updateUserSalary
};