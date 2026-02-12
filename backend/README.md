# Task Management Backend

This is a scalable REST API for a task management system, built with Node.js, Express, and MongoDB.

## Features
- JWT Authentication (via httpOnly cookies)
- Role-Based Access Control (User/Admin)
- Task CRUD operations
- Comprehensive API Documentation via Swagger
- Input Validation and Error Handling

## Getting Started
1. `cd backend`
2. `npm install`
3. Create a `.env` file (see `.env.example`)
4. `npm run dev`

## API Documentation
Once the server is running, access the interactive docs at:
`http://localhost:5000/api-docs`

## Tech Stack
- Express.js
- Mongoose (MongoDB)
- JWT & Bcryptjs
- TypeScript
- Swagger UI (OpenAPI 3.0)

## Scalability Note
To ensure this application can scale to handle millions of users and high traffic, the following strategies would be implemented:

1. **Microservices Architecture**: Decouple the authentication and task management modules into independent services. This allows scaling them independently based on demand (e.g., scaling the Auth service more during peak login times).
2. **Caching (Redis)**: Implement Redis as a caching layer to store frequently accessed data (like public tasks or user profiles) and JWT tokens (for efficient session management/revocation).
3. **Database Scalability**:
   - **Horizontal Scaling**: Use MongoDB sharding to distribute data across multiple servers.
   - **Read Replicas**: Implement read replicas to offload read-heavy traffic (like getting tasks) from the primary database node.
4. **Load Balancing**: Deploy multiple instances of each service behind a Load Balancer (like Nginx or AWS ALB) to distribute incoming traffic evenly.
5. **Containerization (Docker & K8s)**: Dockerize the application to ensure consistency across environments. Use Kubernetes for orchestration, auto-scaling, and self-healing of service instances.
6. **API Gateway**: Implement an API Gateway for centralized logging, rate limiting, and request routing.

## Deployment Guide

For the best performance and scalability, the frontend and backend should be hosted separately:

### 1. Backend (Render)
1. Sign up at [render.com](https://render.com).
2. Create a new **Web Service** and connect your GitHub repo.
3. Set **Root Directory** to `backend`.
4. Set **Build Command** to `npm install && npm run build`.
5. Set **Start Command** to `npm start`.
6. Add Environment Variables: `MONGO_URI`, `JWT_SECRET`, `PORT=5000`.

### 2. Frontend (Vercel)
1. Sign up at [vercel.com](https://vercel.com).
2. Import your GitHub repo.
3. Set **Root Directory** to `frontend`.
4. Add Environment Variable: `NEXT_PUBLIC_API_URL` (set to your Render URL + `/api`).
5. Click **Deploy**.
