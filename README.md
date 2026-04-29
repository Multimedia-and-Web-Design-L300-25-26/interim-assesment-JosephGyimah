[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/bMYWKvYv)
# Interim Assessment: Full-Stack Integration – Coinbase Clone

In this assignment, you will integrate your cloned coinbase frontend with a backend API to build a functional cryptocurrency platform with authentication and dynamic data.

You are required to implement the features using Node.js with MongoDB as the database. Create proper data models (schemas) and structure your project using best practices (models, routes, and controllers). All features must be exposed through RESTful APIs for the frontend to consume.

## 1. Authentication System (JWT-Based)

### Register (GET /register)

Create a user account using:

- Name
- Email
- Password

Send data to the backend API and ensure it is properly stored in the database. Also handle success and error responses appropriately, returning clear and meaningful feedback based on the outcome of each request.

### Login (GET /login)

Authenticate users using email and password, store the returned JWT token securely (preferably using HTTP-only cookies), and redirect the user to the homepage after a successful login.

## 2. Protected User Profile Page

### Create a User Dashboard/Profile Page(GET /profile)

Fetch and display:

- User name
- Email
- Any other relevant info from backend

**NOTE:** This page must be protected and only accessible to authenticated users with a valid JWT token. If the user is not authenticated, they should be redirected to the login page.

## 3. Crypto Data Integration

### GET /crypto (All Tradable Cryptocurrencies)

Fetch all available cryptocurrencies from the backend and display them on the frontend.

### GET /crypto/gainers (Top Gainers)

Fetch cryptocurrencies with the highest percentage increase in price, sorted from highest to lowest.

### GET /crypto/new (New Listings)

Fetch the most recently added cryptocurrencies, sorted from newest to oldest.

### POST /crypto (Add New Cryptocurrency)

Create a new cryptocurrency using:

- Name
- Symbol
- Price
- Image
- 24h Change (percentage change in price over the last 24 hours, e.g. +2.5)

Send data to the backend API and ensure it is properly stored in the database (MongoDB). Also handle success and error responses appropriately, returning clear and meaningful feedback based on the outcome of each request.

---

Push your backend code to GitHub Classroom, deploy the backend (recommended: Render), and integrate it into your Coinbase clone frontend repository. After completing the integration, deploy the updated frontend as well. Finally, submit the links to your deployed backend, deployed frontend, and your updated Coinbase clone repository via the Google Form attached.

**NOTE:** Ensure that all submitted links are accurate and working, as no marks will be awarded for invalid or inaccessible submissions.

---

## Implementation Status ✅

### Backend Implementation (This Repository)
All backend features have been implemented and are ready for deployment.

#### Completed Features:
- ✅ **Authentication System (JWT-Based)**
	- User registration with email validation and password hashing
	- Secure login with JWT token generation
	- HTTP-only cookie storage for tokens
	- Protected user profile endpoint

- ✅ **User Profile Management**
	- Protected `/profile` endpoint requiring valid JWT
	- Returns user name, email, and metadata
	- Automatic access control via middleware

- ✅ **Cryptocurrency Data Integration**
	- GET `/crypto` - All cryptocurrencies
	- GET `/crypto/gainers` - Top gainers (sorted by highest % change)
	- GET `/crypto/new` - New listings (sorted by newest first)
	- POST `/crypto` - Add new cryptocurrency with validation

- ✅ **Database & Data Models**
	- MongoDB integration with Mongoose ODM
	- User model with email uniqueness and password validation
	- Cryptocurrency model with all required fields
	- Proper indexing and validation

- ✅ **Error Handling & Validation**
	- Clear, meaningful error messages for all scenarios
	- Input validation on all endpoints
	- Proper HTTP status codes (201, 400, 401, 404, 500)

### Project Structure
```
.
├── server.js                 # Main Express application
├── config/
│   └── db.js                 # MongoDB connection configuration
├── models/
│   ├── User.js               # User schema and methods
│   └── Cryptocurrency.js     # Cryptocurrency schema
├── controllers/
│   ├── authController.js     # Authentication logic
│   └── cryptoController.js   # Cryptocurrency operations
├── routes/
│   ├── auth.js               # Authentication endpoints
│   └── crypto.js             # Cryptocurrency endpoints
├── middleware/
│   └── auth.js               # JWT verification middleware
├── seed.js                   # Database seeding script
├── package.json              # Dependencies and scripts
└── Documentation/
		├── API_DOCUMENTATION.md  # Complete API reference
		├── SETUP.md              # Installation and deployment guide
		├── TESTING.md            # Test cases and validation
		└── DEPLOYMENT_CHECKLIST.md # Pre-deployment verification
```

### Quick Start

1. **Install Dependencies**
	 ```bash
	 npm install
	 ```

2. **Configure Environment**
	 ```bash
	 cp .env.example .env
	 # Update .env with your MongoDB URI
	 ```

3. **Seed Database**
	 ```bash
	 npm run seed
	 ```

4. **Start Development Server**
	 ```bash
	 npm run dev
	 ```

Server runs on `http://localhost:5000`

### Testing
See [TESTING.md](./TESTING.md) for comprehensive test cases.

Quick test all endpoints:
```bash
# Health check
curl http://localhost:5000/

# Get all cryptos
curl http://localhost:5000/crypto

# Get top gainers
curl http://localhost:5000/crypto/gainers
```

### Deployment
Backend is ready for deployment to Render. See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for step-by-step instructions.

### API Documentation
Complete API reference with cURL examples available in [API_DOCUMENTATION.md](./API_DOCUMENTATION.md).

---

## Next Steps: Frontend Integration

1. Update frontend repository: [coinbase-clone-JosephGyimah](https://github.com/Multimedia-and-Web-Design-L300-25-26/coinbase-clone-JosephGyimah)
2. Connect frontend to backend API
3. Deploy frontend
4. Submit links to Google Form

---

**Backend Status:** ✅ Complete and Ready for Deployment
**Implementation Date:** April 2026
