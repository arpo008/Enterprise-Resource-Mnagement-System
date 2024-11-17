// models/user.js

class User {
    constructor(name, email, password, role = 'user') {
      this.id = null;  // ID will be assigned by the database
      this.name = name || 'Name Not provided';
      this.email = email || 'Email Not provided';
      this.password = password || '';
      this.role = role;  // Default role is 'user'
    }
  
    // Method to display user information
    displayUserInfo() {
      console.log(`User Info: ID = ${this.id}, Name = ${this.name}, Email = ${this.email}, Role = ${this.role}`);
    }
  }
  
  class UserBuilder {
    constructor() {
      this.user = new User();  // Start with an empty User object
    }
  
    // Set the user's name
    setName(name) {
      this.user.name = name;
      return this;  // Return the builder itself to allow method chaining
    }
  
    // Set the user's email
    setEmail(email) {
      this.user.email = email;
      return this;  // Return the builder itself to allow method chaining
    }
  
    // Set the user's password
    setPassword(password) {
      this.user.password = password;
      return this;  // Return the builder itself to allow method chaining
    }
  
    // Set the user's role
    setRole(role) {
      this.user.role = role;
      return this;  // Return the builder itself to allow method chaining
    }
  
    // Final method to build and return the user object
    build() {
      return this.user;  // Return the fully constructed User object
    }
  }
  
  export { User, UserBuilder };
  