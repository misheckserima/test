# Full Stack TypeScript Application

This is a simple full-stack application that demonstrates CRUD operations using:

- **Frontend**: React with TypeScript (deployed on Vercel)
- **Backend**: Node.js with Express and TypeScript (deployed on Render)
- **Database**: MongoDB Atlas

## Project Structure

```
├── frontend/         # React TypeScript frontend
└── backend/          # Express TypeScript backend
```

## Features

- Form to collect text, name, and age
- Display data from MongoDB database
- Full CRUD operations

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example` and add your MongoDB Atlas connection string:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
   PORT=5000
   NODE_ENV=development
   ```

4. Start the development server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example` and add your API URL:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```
   npm run dev
   ```

## Deployment

### MongoDB Atlas

1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Create a database user with read/write privileges
4. Whitelist your IP address or use 0.0.0.0/0 for development
5. Get your connection string from the Connect dialog

### Backend Deployment (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Select the backend directory
4. Add the following environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `NODE_ENV`: production
5. Deploy the service

### Frontend Deployment (Vercel)

1. Create a new project on Vercel
2. Connect your GitHub repository
3. Select the frontend directory
4. Add the following environment variables:
   - `VITE_API_URL`: Your Render backend URL + /api (e.g., https://your-backend.onrender.com/api)
5. Deploy the project

## API Endpoints

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a single user
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user