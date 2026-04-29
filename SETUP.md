# Backend Setup Guide

## Quick Start

### Prerequisites
- **Node.js** v14+ ([Download](https://nodejs.org/))
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - free tier available)
- **npm** or **yarn** (comes with Node.js)
- **Git**

---

## Local Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB Community Edition
# macOS: brew install mongodb-community
# Ubuntu: Follow MongoDB installation guide

# Start MongoDB service
# macOS: brew services start mongodb-community
```

**Option B: MongoDB Atlas (Recommended)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/coinbase-clone?retryWrites=true&w=majority`)

### 3. Configure Environment Variables

Create `.env` file (or update existing):
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/coinbase-clone
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/coinbase-clone?retryWrites=true&w=majority

JWT_SECRET=dev_secret_key_change_in_production_12345
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

**Important:** Change `JWT_SECRET` in production!

### 4. Seed Database with Sample Data
```bash
npm run seed
```

This will populate the database with 10 sample cryptocurrencies for testing.

### 5. Start the Development Server
```bash
npm run dev
```

Server will run on `http://localhost:5000`

You should see:
```
MongoDB Connected: cluster.mongodb.net
Server running on port 5000 in development mode
```

---

## Testing Endpoints Locally

### Using cURL

**Register a user:**
```bash
curl -X GET http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Login:**
```bash
curl -X GET http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }' \
  -c cookies.txt
```

**Get Profile (with token from cookies):**
```bash
curl -X GET http://localhost:5000/profile \
  -b cookies.txt
```

**Get all cryptos:**
```bash
curl -X GET http://localhost:5000/crypto
```

**Get top gainers:**
```bash
curl -X GET http://localhost:5000/crypto/gainers
```

**Get new listings:**
```bash
curl -X GET http://localhost:5000/crypto/new
```

**Add new crypto:**
```bash
curl -X POST http://localhost:5000/crypto \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dogecoin",
    "symbol": "DOGE",
    "price": 0.15,
    "image": "https://cryptoicons.org/api/icon/doge/200",
    "change24h": 1.2
  }'
```

### Using Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Import endpoints from `API_DOCUMENTATION.md`
3. Test each endpoint
4. For authenticated endpoints, set Cookie with JWT token from login response

---

## Project Structure

```
.
├── server.js                 # Main entry point
├── .env.example              # Environment template
├── .env                      # Local environment (add to .gitignore)
├── package.json              # Dependencies
├── seed.js                   # Database seeding script
├── config/
│   └── db.js                 # MongoDB connection
├── models/
│   ├── User.js               # User schema
│   └── Cryptocurrency.js     # Crypto schema
├── controllers/
│   ├── authController.js     # Auth logic
│   └── cryptoController.js   # Crypto logic
├── routes/
│   ├── auth.js               # Auth routes
│   └── crypto.js             # Crypto routes
├── middleware/
│   └── auth.js               # JWT verification
├── API_DOCUMENTATION.md      # API documentation
└── README.md                 # Original assignment
```

---

## Deployment to Render

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Initial backend setup"
git push origin main
```

### Step 2: Create Render Account

1. Go to https://render.com
2. Sign up with GitHub account
3. Authorize Render to access your repositories

### Step 3: Create New Web Service

1. Click "New +"
2. Select "Web Service"
3. Select your GitHub repository (`interim-assesment-JosephGyimah`)
4. Configure:
   - **Name:** `coinbase-clone-backend`
   - **Environment:** `Node`
   - **Region:** Choose closest to you
   - **Branch:** `main`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

### Step 4: Set Environment Variables

In Render dashboard, add environment variables:

```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/coinbase-clone?retryWrites=true&w=majority
JWT_SECRET=your_very_secure_random_key_here_minimum_32_chars
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend-domain.com
```

**Important:** Use strong, random `JWT_SECRET` for production!

### Step 5: Deploy

1. Click "Create Web Service"
2. Render will automatically deploy
3. Get your backend URL (e.g., `https://coinbase-clone-backend.onrender.com`)
4. Wait for build to complete (2-3 minutes)
5. Test endpoint: https://coinbase-clone-backend.onrender.com

### Step 6: Test Deployed Backend

```bash
curl https://your-render-url.onrender.com/
```

Should return:
```json
{
  "success": true,
  "message": "Coinbase Clone Backend API is running"
}
```

---

## Troubleshooting

### Issue: MongoDB Connection Error
**Solution:**
- Check MongoDB URI in `.env` is correct
- Ensure MongoDB server is running (if local)
- Verify IP whitelist in MongoDB Atlas (if using cloud)
- Check database name in connection string

### Issue: "Error: EADDRINUSE: address already in use :::5000"
**Solution:**
```bash
# Kill process using port 5000
# macOS/Linux:
lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Issue: JWT token errors
**Solution:**
- Ensure `JWT_SECRET` is set in `.env`
- Check token hasn't expired (default: 7 days)
- Verify token is being sent in cookie header

### Issue: CORS errors
**Solution:**
- Update `FRONTEND_URL` in `.env` to match your frontend domain
- Ensure frontend is sending `credentials: 'include'` in fetch requests

---

## Next Steps

1. ✅ Backend API ready at `http://localhost:5000`
2. 📋 Integrate with frontend (see integration guide)
3. 🚀 Deploy frontend
4. 📝 Submit deployment links

For frontend integration, see the main README.md and frontend repository at:
https://github.com/Multimedia-and-Web-Design-L300-25-26/coinbase-clone-JosephGyimah

---

## Useful Links

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Documentation](https://jwt.io/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Render Documentation](https://render.com/docs)
- [REST API Best Practices](https://restfulapi.net/)
