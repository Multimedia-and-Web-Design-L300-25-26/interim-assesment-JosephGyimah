# Deployment Checklist

## Pre-Deployment Verification ✅

### Code Quality
- [x] All syntax valid (tested with `node -c`)
- [x] No console.error without try-catch
- [x] Proper error handling on all endpoints
- [x] CORS configured for frontend communication
- [x] HTTP-only cookies for JWT storage
- [x] Password hashing with bcryptjs
- [x] Input validation on all endpoints

### Dependencies
- [x] All required packages in package.json
- [x] No unused dependencies
- [x] Security vulnerabilities checked (3 high severity - OK for dev)
- [x] nodemon for development only

### Environment Configuration
- [x] .env.example created with all required variables
- [x] .env.example added to git
- [x] .env added to .gitignore (never commit secrets)
- [x] All env variables documented in SETUP.md

### Database
- [x] Mongoose connection configured
- [x] User model with validation
- [x] Cryptocurrency model with validation
- [x] seed.js ready for database population
- [x] MongoDB Atlas connection string format documented

### API Endpoints
- [x] GET /register - Create user account
- [x] GET /login - Authenticate user
- [x] GET /logout - Clear session
- [x] GET /profile - Protected user profile
- [x] GET /crypto - All cryptocurrencies
- [x] GET /crypto/gainers - Top gainers by change
- [x] GET /crypto/new - New listings by date
- [x] POST /crypto - Add new cryptocurrency

### Authentication
- [x] JWT token generation
- [x] Token stored in HTTP-only cookie
- [x] Protected routes with verifyToken middleware
- [x] Proper 401 error handling for missing/invalid tokens
- [x] Password validation with bcryptjs

### Error Handling
- [x] 400 - Bad Request (missing/invalid data)
- [x] 401 - Unauthorized (auth failures)
- [x] 404 - Route not found
- [x] 500 - Server errors
- [x] All errors return meaningful messages

### Testing
- [x] Local testing guide created (TESTING.md)
- [x] API documentation with cURL examples (API_DOCUMENTATION.md)
- [x] Test cases documented for all endpoints
- [x] Seed data script ready
- [x] Validation tested for edge cases

### Documentation
- [x] README.md - Assignment requirements (original)
- [x] SETUP.md - Installation and deployment guide
- [x] API_DOCUMENTATION.md - Full API reference
- [x] TESTING.md - Test cases and validation
- [x] Code comments for complex logic
- [x] Environment variables documented

---

## Deployment Steps (Render)

### Step 1: GitHub Push
```bash
git add .
git commit -m "feat: Initialize Coinbase Clone Backend

- Express.js server with MongoDB
- JWT-based authentication
- User registration/login/profile
- Cryptocurrency CRUD operations
- Comprehensive API documentation
- Ready for Render deployment"
git push origin main
```

### Step 2: Render Setup
1. Log in to https://render.com
2. Create new Web Service
3. Connect GitHub repository
4. Configure settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variables (see below)
6. Deploy

### Step 3: Environment Variables (Render Dashboard)

```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://[username]:[password]@[cluster].mongodb.net/coinbase-clone?retryWrites=true&w=majority
JWT_SECRET=your_very_strong_random_secret_here_minimum_32_characters_long
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend-url.vercel.app
```

**Important:** Generate a strong JWT_SECRET using:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 4: Test Deployed Backend
```bash
# Replace with your Render URL
curl https://coinbase-clone-backend.onrender.com/

# Should return:
# {"success":true,"message":"Coinbase Clone Backend API is running"}
```

### Step 5: Verify All Endpoints
1. Test register: POST to `/register`
2. Test login: POST to `/login`
3. Test profile: GET to `/profile` with token
4. Test cryptos: GET to `/crypto`
5. Test gainers: GET to `/crypto/gainers`
6. Test new: GET to `/crypto/new`
7. Test add crypto: POST to `/crypto`

---

## Post-Deployment

### Monitor Deployment
- Check Render dashboard for logs
- Verify no startup errors
- Monitor initial requests

### Update Frontend
1. Get deployed backend URL from Render
2. Update frontend `.env` or config with backend URL
3. Test all frontend API calls
4. Deploy frontend
5. Final end-to-end testing

### Documentation
- [ ] Share backend URL with team
- [ ] Share deployment instructions
- [ ] Document any custom configurations
- [ ] Add monitoring/logging as needed

---

## Troubleshooting

### Build Fails
- Check Node version (should be v14+)
- Verify package.json `"main"` points to server.js
- Check start command: `npm start`

### Runtime Errors
- Check environment variables in Render dashboard
- Verify MONGODB_URI is correct and IP whitelisted
- Check JWT_SECRET is strong enough
- Review application logs in Render

### Connection Issues
- Test MongoDB Atlas connection string
- Verify whitelist includes Render IP
- Check CORS configuration matches frontend URL

### Performance
- Monitor request/response times
- Check MongoDB query efficiency
- Consider caching strategies
- Enable gzip compression (already in Express)

---

## Final Checklist Before Submission

- [ ] Backend deployed to Render and accessible
- [ ] All API endpoints tested and working
- [ ] MongoDB database seeded with sample data
- [ ] Frontend updated and connected to backend
- [ ] Frontend deployed and tested
- [ ] JWT authentication working end-to-end
- [ ] Protected routes properly secured
- [ ] Error messages clear and helpful
- [ ] CORS configured correctly
- [ ] All documentation updated
- [ ] GitHub links are correct and accessible

---

## Submission Links (To Be Updated)

1. **Backend Repository:** https://github.com/Multimedia-and-Web-Design-L300-25-26/interim-assesment-JosephGyimah
2. **Backend Deployed URL:** https://coinbase-clone-backend.onrender.com (UPDATE THIS)
3. **Frontend Repository:** https://github.com/Multimedia-and-Web-Design-L300-25-26/coinbase-clone-JosephGyimah
4. **Frontend Deployed URL:** (UPDATE THIS)

---

**Date Deployed:** [TO BE FILLED]
**Deployed By:** Joseph Gyimah
**Status:** ✅ READY FOR DEPLOYMENT

For questions or issues, refer to:
- SETUP.md - Installation guide
- API_DOCUMENTATION.md - API reference
- TESTING.md - Testing procedures
