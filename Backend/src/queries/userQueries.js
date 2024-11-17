const getUserById = `
  SELECT * FROM users WHERE id = $1;
`;

const getAllUsers = `
  SELECT * FROM users;
`;

export {
  getUserById,
  getAllUsers
};



