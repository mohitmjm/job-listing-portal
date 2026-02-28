# Project Description

## Project Title
Job Listing Portal – Full Stack Web Application

## Overview

The Job Listing Portal is a full-stack web application designed to connect job seekers and employers on a centralized digital platform. 

The system allows employers to post job openings and manage applications, while job seekers can search for jobs, apply, and track their application status.

This platform streamlines the hiring process and provides a structured environment for recruitment.

---

## Objectives

- To build a secure role-based authentication system.
- To allow employers to create and manage job postings.
- To allow job seekers to browse and apply for jobs.
- To implement resume upload functionality.
- To create a scalable and structured full-stack architecture.

---

## Technologies Used

### Frontend
- React.js
- React Router
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Bcrypt (Password hashing)
- Multer (File upload handling)

---

## System Architecture

The system follows a client-server architecture:

User → React Frontend → Express API → MongoDB Database → Response → Frontend

The frontend communicates with the backend using RESTful APIs. Authentication is handled using JSON Web Tokens (JWT). Passwords are securely stored using hashing.

---

## Key Features

### Authentication & Authorization
- User registration (Seeker / Employer)
- Secure login using JWT
- Role-based route protection

### Employer Module
- Create job postings
- View posted jobs
- Delete job postings
- Manage applicants (future enhancement)

### Job Seeker Module
- Browse job listings
- View detailed job descriptions
- Apply for jobs
- Track application status
- Upload resume

### Profile Management
- Update user details
- Resume upload functionality

---

## Database Design

The system consists of three primary collections:

1. Users
2. Jobs
3. Applications

Relationships:
- One employer → many jobs
- One seeker → many applications
- One job → many applications

---

## Security Features

- Password hashing using Bcrypt
- JWT-based authentication
- Protected routes
- Role-based authorization
- Secure file upload handling

---

## Conclusion

The Job Listing Portal demonstrates a complete full-stack web development lifecycle, including frontend design, backend API development, database management, authentication, and deployment readiness.

The project is scalable and can be enhanced with advanced features such as AI-based job matching, payment integration, and cloud deployment.