# Blog Management API

## Project Description
The Blog Management API is a backend application for managing blogs, comments, and user roles. Users can create blogs, add comments, and assign roles (Admin, Editor, or User). The application is built using Node.js, Express, and MongoDB with Mongoose as the ODM.

## Features
- **Authentication**: JWT-based authentication for secure login and user verification.
- **Role-based Access Control**: Admins can manage users, assign roles, and delete content. Editors can update content assigned to them.
- **Blog Management**: Create, read, update, and delete blogs.
- **Comment Management**: Add and delete comments on blogs.
- **Editor Assignment**: Admins can assign specific blogs to editors for management.

## Prerequisites
- Node.js
- MongoDB Atlas account (I have used) or local MongoDB instance
- Git

---

## Setting Up the Project Locally

### 1. Clone the Repository
```bash
git clone https://github.com/04Lokesh04/BlogsAPI.git
cd  BlogsAPI
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Environment Variables
Create one `.env` file in the root directory and add the following variables:
```env
PORT=5000
DB_CONNECTION_STRING=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
```

### 4. Start the Application

- For production:
```bash
npm start
```

- For development (for fast reloading):
```bash
npm run dev
```

### 5. Access the Application
The API will be accessible at `http://localhost:5000`.

---

## API Documentation

### Authentication Routes

#### 1. Register User
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "name": "Admin1",
  "email": "admin1@email.com",
  "password": "admin123",
  "role": "Admin"
}
```

**Response:**
```json
{
  "message": "User registered successfully."
}
```

#### 2. Login User
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "admin1@email.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "token": "<JWT_TOKEN>"
}
```

---

### Blog Routes

#### 1. Create Blog
**POST** `/api/blogs`

**Headers:**
```json
{
  "Authorization": "Bearer <JWT_TOKEN>"
}
```

**Request Body:**
```json
{
    "title":"blog4",
    "content":"my fourth blog"
}
```

**Response:**
```json
{
    "blog": {
        "title": "blog4",
        "content": "my fourth blog",
        "author": "6791364b804c520a91206524",
        "assignedTo": null,
        "_id": "6792088e7c93101785bb9590",
        "__v": 0
    }
}
```

#### 2. Get All Blogs
**GET** `/api/blogs`

**Response:**
```json
{
    "blogs": [
        {
            "_id": "679136df804c520a9120652b",
            "title": "blog1",
            "content": "my first blog",
            "author": {
                "_id": "6791364b804c520a91206524",
                "name": "Admin1",
                "email": "Admin1@email.com"
            },
            "assignedTo": null,
            "__v": 0
        },
        {
            "_id": "679136eb804c520a9120652d",
            "title": "blog2",
            "content": "my second blog",
            "author": {
                "_id": "6791364b804c520a91206524",
                "name": "Admin1",
                "email": "Admin1@email.com"
            },
            "assignedTo": null,
            "__v": 0
        },
        {
            "assignedTo": null,
            "_id": "679136f5804c520a9120652f",
            "title": "blog3",
            "content": "my third blog",
            "author": {
                "_id": "6791364b804c520a91206524",
                "name": "Admin1",
                "email": "Admin1@email.com"
            },
            "__v": 0
        },
        {
            "assignedTo": null,
            "_id": "67913d26804c520a9120654a",
            "title": "blog4",
            "content": "my fourth blog",
            "author": {
                "_id": "6791364b804c520a91206524",
                "name": "Admin1",
                "email": "Admin1@email.com"
            },
            "__v": 0
        },
        {
            "_id": "679208337c93101785bb958d",
            "title": "blog4",
            "content": "my fourth blog",
            "author": {
                "_id": "6791364b804c520a91206524",
                "name": "Admin1",
                "email": "Admin1@email.com"
            },
            "assignedTo": null,
            "__v": 0
        },
        {
            "_id": "6792088e7c93101785bb9590",
            "title": "blog4",
            "content": "my fourth blog",
            "author": {
                "_id": "6791364b804c520a91206524",
                "name": "Admin1",
                "email": "Admin1@email.com"
            },
            "assignedTo": null,
            "__v": 0
        }
    ]
}
```

---

### Comment Routes

#### 1. Add Comment
**POST** `/api/comments/:blogId`

**Headers:**
```json
{
  "Authorization": "Bearer <JWT_TOKEN>"
}
```

**Request Body:**
```json
{
  "content":"deployed blog"
}
```

**Response:**
```json
{
    "comment": {
        "content": "deployed blog",
        "blog": "6792088e7c93101785bb9590",
        "author": "6791366d804c520a91206527",
        "_id": "6792261779e0427e28c26c1d",
        "__v": 0
    }
}
```

---

## Testing the APIs

### Tools Required:
- **Postman** 

### Steps to Test:
1. Set up the environment variables in `.env`.
2. Start the application.
3. Use Postman to send HTTP requests to the endpoints.
4. Include the JWT token in the `Authorization` header for protected routes.

---

## Deployment
This project can be deployed using platform Render :(https://render.com).

---


