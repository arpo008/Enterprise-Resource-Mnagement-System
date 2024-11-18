const getUserById: string = `
  SELECT * FROM users WHERE id = $1;
`;

const getAllUsers: string = `
  SELECT * FROM users;
`;

const insertNewUser: string = `
  INSERT INTO users(first_name, last_name, address, gender, dob, telephone, age, salary, image, role) 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
  RETURNING *;
`;

export {  
  getUserById,
  getAllUsers,
  insertNewUser
};