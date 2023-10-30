# boiler_plate

This boiler plate directory contain of 9 folders.

# Config Folder

Config folder contain 2 files i.e Express and database. In express.ts file,
it contain the basic express setup.

And in database.ts file, there is a configuration of postgres database.

# Controller Folder

Controller folder contain authController and userController.

In authController, there is a controller for register, login forget-password and reset password.

In userController, there is controller to get all users, get user by id and delete user.

# Helper Folder

In helpers folder, it contain 3 file. Inside authHelper.ts, it uses bcrypt package for hashing the password and compraing the password.

In jwtToken.ts, it generate the token for the user when user logs in. In Token it sends user id and name.

In SendMail.ts, a function is created to send ta mail for reset the password.

# Middleware Folder

In middlewares folder, it contains 2 file. authMiddleware.ts and reqUser.ts.

Inside authMiddlewares.ts, a function is created to verify whether the user is log in or not.

Inside reqUser, a interface is created that inherit the request method and takes 4 parameters.

# Models Folder.

Contains 3 file: Base.ts, User.ts, OTP.ts.

Base is a abstract class or parent class that have 4 columns. i.e. id, status, createdAt and UpdatedAt.

User.ts is used for creating a database table that extends that base table. Inherit all the properties of base table.

OTP.ts id used for creating a database table to store the OTP that generated. OTP has one to many relationship with User.

# Node Module

Node module contains all the packages that are installed while creating the application.

# Routes Folder

It contains 3 files, indexRoute.ts, authRoute.ts and userRoute.ts:

authRoute have the route for register, login, forget-password and reset password.

userRoute have the route for get all users, get user by id and delete user.

# Utils Folder

Contains 2 file error.ts and successResponse, Utils folder is used for the global error and global success handling.

# .env file

.env file contains every secret credentials that are used in our application, like database configuration, server configuration and mail configuration.

# server file

Server file is used for creating the server using express framework and initialize the database.

# package json

package json file have every dependencies and devDependencies that are install and it also have the script to run the application.

# tsconfig.json

The tsconfig.json file specifies the root files and the compiler options required to compile the project.

# Packages installed

# express:

node Js framework

# nodemon:

Auto run the server after any changes

# nodemailer:

Use to send email

# dotenv:

Use to add environment variables.

# bcrypt:

Use to hase the password

# cookie-parser:

Used to parses cookies attached to the client request object.

# jsonwebtoken:

Use for secure way to authenticate users and share information.

# morgan:

Use to get log requests made to Node. js server.

# pg

Use to connect postgres to nede

# speakeasy:

Used for generating OTP

# tsc:

Use to transforms TypeScript code into JavaScript code that can be executed by the browser or a server

# ts-node-dev:

Used to restarts target node process when any of required files changes.

# typeorm:

Use to make easy to link TypeScript application up to a relational database.
