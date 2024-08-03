# Asbey Boilerplate Backend

This is the backend part of the Asbey Boilerplate, designed to work seamlessly with the [Asbey Boilerplate Frontend](https://github.com/yourusername/asbey-boilerplate-frontend). This boilerplate includes basic setup and configurations to get started quickly with a Node.js backend connected to MongoDB. It also includes user account creation and authentication logic.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Database](#database)
- [Authentication](#authentication)
- [API Endpoints](#api-prepacked)
- [Contributing](#contributing)
- [License](#license)

## Features
- 🚀 User account creation and authentication
- 📦 MongoDB connection
- 🔧 RESTful API setup
- 📂 Basic project structure

## Prerequisites
- Node.js
- npm (Node Package Manager)
- MongoDB (mongoose)
- JWT (jsonwebtoken)


## Installation
1. **Clone the repository:**
    ```bash
    git clone https://github.com/asbeyy/asbey-boilerplate-backend.git
    cd asbey-boilerplate-backend
    ```


2. **Install dependencies:**
    ```bash
    npm install
    ```


## Configuration
1. **Create a `.env` file** in the root directory and add your MongoDB connection string and other environment variables:
    ```plaintext
    MONGODB_USERNAME=mongodb Username
    MONGODB_PASSWORD=mongodb Password
    MONGODB_URI=mongodb URI (ex. - @cluster3.fddfbew3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0)

    JWT_SECRET=jwt secret decode key
    PORT=4000
    ```


## Running the Application
To start the server, you can use either of the following commands:
### Using Node.js
```bash
node index.js
```
### Using Nodemon (Watches changes and reloads automatically)
```bash
nodemon 
```


## Database
The boilerplate uses MongoDB for database operations. Ensure MongoDB is running and the connection string is correctly set in the .env file.
### User Model
The User model is located in models/User.js and includes basic schema for user accounts.


## API Prepacked
The boilerplate comes with exposed API's handling the Auth process only, add as needed.
#### Authentication
The authentication logic is handled using JWT (JSON Web Tokens). The following endpoints are available:

- **POST /account/register** - Register a new user
- **POST /account/login** - Login a user
- **GET /account/login** - Send user token to valide authentication



## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any bugs or feature requests.

## License
This project is licensed under the MIT License. See the LICENSE file for details.