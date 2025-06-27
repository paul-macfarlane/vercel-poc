# Vercel Full Stack TypeScript POC

This project demonstrates how to deploy a full-stack TypeScript application to Vercel, with a React frontend and Express backend API served under the same domain. The project uses separate deployments for frontend and backend, but configures them to work together seamlessly.

## Project Structure

```
vercel-poc/
├── api/                    # Backend API
│   ├── src/
│   │   └── index.ts       # Express API entry point
│   ├── package.json       # API dependencies
│   ├── tsconfig.json      # TypeScript configuration for API
│   └── vercel.json        # Vercel configuration for API deployment
├── client/                # Frontend React app
│   ├── src/
│   │   ├── App.tsx       # Main React component
│   │   └── ...          # Other React components
│   ├── package.json      # Frontend dependencies
│   └── vercel.json       # Vercel configuration for frontend deployment
└── package.json          # Root package.json for development scripts
```

## How It Works

### Frontend (React + TypeScript)

- Built with Vite and React
- Makes API calls to `/api/*` endpoints
- Uses Vercel rewrites to route API calls to the backend deployment
- In development, CORS is enabled to allow local development

### Backend (Express + TypeScript)

- Express.js API with TypeScript
- Deployed as serverless functions on Vercel
- CORS is conditionally enabled only in development
- Endpoints are prefixed with `/api/`

### Deployment Architecture

- Frontend and backend are deployed as separate Vercel projects
- Frontend's `vercel.json` configures rewrites to route `/api/*` requests
- Backend's `vercel.json` configures serverless function handling
- All requests are served under the same domain through Vercel's routing

## Deployment Requirements

1. **Two Vercel Projects**

   - One for the frontend (`client/`)
   - One for the backend (`api/`)

2. **Frontend Configuration (`client/vercel.json`)**

   ```json
   {
     "rewrites": [
       {
         "source": "/api/:path*",
         "destination": "/api/:path*"
       }
     ]
   }
   ```

   This configuration routes API requests to the backend deployment.

3. **Backend Configuration (`api/vercel.json`)**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "src/index.ts",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/api/(.*)",
         "dest": "src/index.ts"
       }
     ]
   }
   ```
   This configuration sets up the serverless API endpoints.

## Local Development

1. Install dependencies:

   ```bash
   npm run install:all
   ```

2. Start both frontend and backend in development mode:
   ```bash
   npm run dev
   ```

This will start:

- Frontend on http://localhost:5173
- Backend on http://localhost:3001

## Deployment Steps

1. Install Vercel CLI:

   ```bash
   npm install -g vercel
   ```

2. Deploy the backend:

   ```bash
   cd api
   vercel
   ```

   Note the deployment URL for the next step.

3. Deploy the frontend:

   ```bash
   cd ../client
   vercel
   ```

4. In Vercel's dashboard:
   - Set up your custom domain on the frontend project
   - Configure environment variables if needed
   - The frontend deployment will handle routing API requests to the backend

## Environment Variables

For local development, create a `.env` file in the api directory:

```env
PORT=3001
NODE_ENV=development
```

## Key Features

1. **Separate but Integrated Deployments**

   - Frontend and backend are deployed independently
   - Vercel's routing system connects them seamlessly
   - No CORS issues in production
   - Clean API URLs (`/api/*`)

2. **Development Experience**

   - Hot reloading for both frontend and backend
   - TypeScript support throughout
   - Automatic CORS handling in development

3. **Production Benefits**
   - Independent scaling of frontend and backend
   - Serverless API deployment
   - Edge-served static files
   - Zero configuration SSL

## Notes

- The backend uses conditional CORS only in development
- No root `vercel.json` needed - each part has its own configuration
- Separate deployments allow independent scaling and updates
- TypeScript is used throughout for type safety
