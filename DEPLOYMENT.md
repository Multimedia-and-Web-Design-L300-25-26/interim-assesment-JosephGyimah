# Deployment Guide

This guide covers deploying the Coinbase Clone application to Render (backend) and Netlify (frontend).

## Backend Deployment (Render)

### Prerequisites
- Render account (free tier available at https://render.com)
- MongoDB Atlas account (free tier at https://www.mongodb.com/cloud/atlas)
- GitHub account with your backend repository

### Steps

1. **MongoDB Setup**
   - Create a MongoDB Atlas cluster (free M0 tier)
   - Create a database user with a strong password
   - Get your connection string (MONGODB_URI format)
   - Add Render's IP to MongoDB IP whitelist or allow 0.0.0.0/0

2. **Create Render Web Service**
   - Go to https://render.com/dashboard
   - Click "New +" → "Web Service"
   - Connect your GitHub repository (interim-assesment-JosephGyimah)
   - Configure:
     - **Name**: coinbase-backend
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Plan**: Free tier is fine for testing

3. **Set Environment Variables in Render**
   - In the web service settings, scroll to "Environment"
   - Add the following variables:
     ```
     NODE_ENV=production
     PORT=5000
     MONGODB_URI=<your-mongodb-connection-string>
     JWT_SECRET=<use-a-strong-random-string>
     JWT_EXPIRE=30d
     FRONTEND_URL=<your-netlify-frontend-url>
     ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for build and deployment (takes ~2-3 minutes)
   - Copy your backend URL (e.g., `https://coinbase-backend-xyz.onrender.com`)

5. **Test**
   - Visit `https://your-backend-url/` → Should see "Coinbase Clone Backend API is running"
   - Test an endpoint: `https://your-backend-url/api/crypto`

## Frontend Deployment (Netlify)

### Prerequisites
- Netlify account (free at https://netlify.com)
- GitHub account with your frontend repository

### Steps

1. **Connect GitHub Repository**
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Select GitHub and choose `coinbase-clone-JosephGyimah` repository

2. **Configure Build Settings**
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 20

3. **Set Environment Variables**
   - In "Site settings" → "Build & deploy" → "Environment"
   - Add: `VITE_BACKEND_URL=<your-render-backend-url>`
     (e.g., `https://coinbase-backend-xyz.onrender.com`)

4. **Deploy**
   - Netlify will automatically build and deploy when you push to main
   - Or manually trigger a deploy in the dashboard
   - Copy your frontend URL (e.g., `https://your-site.netlify.app`)

5. **Test**
   - Visit your frontend URL
   - Sign up with a test account
   - Login and view profile
   - Browse cryptocurrencies

## Post-Deployment Checklist

- [ ] Backend health check: `GET /` returns success message
- [ ] Crypto endpoints work: `GET /api/crypto`, `GET /api/crypto/gainers`
- [ ] Auth endpoints work: `POST /api/auth/register`, `POST /api/auth/login`
- [ ] Frontend can sign up and login
- [ ] Profile page shows user data
- [ ] Crypto pages display data from backend
- [ ] CORS headers allow frontend → backend communication

## Troubleshooting

**Backend won't start**
- Check `npm start` script in package.json
- Verify MONGODB_URI is correct in Render env vars
- Check Render build logs for errors

**Frontend build fails**
- Check Node version (should be 18+)
- Run `npm run build` locally to test
- Check for missing environment variables

**"Cannot connect to backend" errors**
- Verify VITE_BACKEND_URL is set in Netlify
- Check CORS settings: Backend should allow your frontend URL
- Test backend directly from browser

**CORS Errors**
- Backend CORS is configured to use FRONTEND_URL env var
- Update FRONTEND_URL in Render to your Netlify domain
- Restart backend service in Render dashboard

## Local Development

To run locally before deployment:

**Backend**
```bash
cd interim-assesment-JosephGyimah
npm install
npm run seed  # Populate sample data
npm run dev   # Start with nodemon
```

**Frontend**
```bash
cd coinbase-clone-JosephGyimah
npm install
npm run dev   # Start Vite dev server on :3000
```

Visit http://localhost:5173 (frontend dev server)
