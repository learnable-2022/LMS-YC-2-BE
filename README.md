# LMS-YC-2-BE

# LEARNZ
This application is designed to serve as the backend for a Learning Management System (LMS) for Young Children within the age bracket of (7-13). It provides a reliable and efficient way to manage and deliver data for various LMS functionalities Learning management system. 

# Functionalities
A User(child) can create an account and sign in to view and use the application, update their account using their id, delete their account using their id and view their profile.

An admin(Tutor) can create an account uniquely, sign in to view and use the application, update their account using their id, delete their account using their id, view their profile, upload course(s) on the application, delete course(s), update course(s), view all courses, view a single course and track progress on the course.

# Prerequisites
Node.js 14 or higher installed on your machine.
Latest version of the following:
+ NodeJS 
+ ExpressJs
+ Mongoose
+ bcrypt
+ joi
+ passport
+ express-session
+ MongoDB Atlas account.

# Installations
+ Open terminal and clone the repository (git clone `name of repo`)
+ Download `Postman` or `ThunderClient` to simulate running the code as a user on the client side.
+ Install the dependencies by using `npm install`
+ Create a `.env` file in the root directory and set the following environment variables: PORT=3000, DATABASE_URI='mongodb+srv://yourCustomMongoDetails', SECRET_KEY='your-secret-key', COOKIE_SECRET: 'your_secret_cookie', ROUNDS: 10
+ Start or run the server with `npm start`

Here is the [Postman Documentation](https://documenter.getpostman.com/view/25807810/2s93mATfAx) to help us get started with and how to use the different requests provided.