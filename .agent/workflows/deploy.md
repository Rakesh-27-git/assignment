---
description: How to deploy the Task Management Application (Backend on Render, Frontend on Vercel)
---

# Deployment Workflow

This guide explains how to deploy the backend and frontend separately, which is the standard practice for Node.js apps.

## 1. Backend Deployment (Render)

Render is excellent for hosting Node.js APIs as they support persistent servers and Docker.

1. **Create Account**: Sign up at [render.com](https://render.com).
2. **New Web Service**: Click **New +** -> **Web Service**.
3. **Connect GitHub**: Search for and select your `assignment` repository.
4. **Configure Service**:
   - **Name**: `task-api`
   - **Root Directory**: `backend`
   - **Environment**: `Node` (or `Docker` since we added a Dockerfile)
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. **Environment Variables**: Add the following in the **Environment** tab:
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
   - `MONGO_URI`: (Your MongoDB Atlas connection string)
   - `JWT_SECRET`: (A strong random string)
6. **Deploy**: Render will automatically start the build. Once done, copy the service URL (e.g., `https://task-api.onrender.com`).

## 2. Frontend Deployment (Vercel)

Vercel is the best home for Next.js applications.

1. **Create Account**: Sign up at [vercel.com](https://vercel.com).
2. **Add New**: Click **Add New** -> **Project**.
3. **Import Repository**: Select your `assignment` repository.
4. **Configure Project**:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: `frontend`
5. **Environment Variables**: Add:
   - `NEXT_PUBLIC_API_URL`: Your Render backend URL + `/api` (e.g., `https://task-api.onrender.com/api`)
6. **Deploy**: Click **Deploy**. Vercel will provide a URL (e.g., `https://assignment-ui.vercel.app`).

## 3. Post-Deployment Verification

1. Go to your frontend URL.
2. Try to register and log in.
3. Check the Network tab in DevTools to ensure requests are hitting the Render URL.
4. (Optional) Update your `MONGO_URI` in Atlas to allow connections from Render's IP or set it to `0.0.0.0/0` (temporary for testing).
