# Coinbase Clone Backend API Documentation

## Base URL
```
http://localhost:5000
```

## Authentication
Authentication uses JWT tokens stored in HTTP-only cookies. When a user registers or logs in, a JWT token is automatically set in an HTTP-only cookie and included in responses.

---

## Authentication Endpoints

### 1. Register User
**Endpoint:** `GET /register` (as per requirements, using GET)  
**Method:** GET  
**Access:** Public

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt_token_here"
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "error": "Email already registered"
}
```

---

### 2. Login User
**Endpoint:** `GET /login` (as per requirements, using GET)  
**Method:** GET  
**Access:** Public

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt_token_here"
}
```

**Error Response (401):**
```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

---

### 3. Logout User
**Endpoint:** `GET /logout`  
**Method:** GET  
**Access:** Private (Requires Valid JWT Token)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

### 4. Get User Profile
**Endpoint:** `GET /profile`  
**Method:** GET  
**Access:** Private (Requires Valid JWT Token)

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "error": "Not authorized to access this route"
}
```

---

## Cryptocurrency Endpoints

### 1. Get All Cryptocurrencies
**Endpoint:** `GET /crypto`  
**Method:** GET  
**Access:** Public

**Success Response (200):**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "crypto_id",
      "name": "Bitcoin",
      "symbol": "BTC",
      "price": 45000,
      "image": "https://example.com/btc.png",
      "change24h": 2.5,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### 2. Get Top Gainers
**Endpoint:** `GET /crypto/gainers`  
**Method:** GET  
**Access:** Public

**Description:** Returns cryptocurrencies sorted by highest 24-hour percentage change

**Success Response (200):**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "crypto_id",
      "name": "Ethereum",
      "symbol": "ETH",
      "price": 2500,
      "image": "https://example.com/eth.png",
      "change24h": 5.2,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### 3. Get New Listings
**Endpoint:** `GET /crypto/new`  
**Method:** GET  
**Access:** Public

**Description:** Returns cryptocurrencies sorted by newest first

**Success Response (200):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "crypto_id",
      "name": "New Token",
      "symbol": "NT",
      "price": 0.50,
      "image": "https://example.com/nt.png",
      "change24h": 10.0,
      "createdAt": "2024-01-20T15:45:00.000Z",
      "updatedAt": "2024-01-20T15:45:00.000Z"
    }
  ]
}
```

---

### 4. Add New Cryptocurrency
**Endpoint:** `POST /crypto`  
**Method:** POST  
**Access:** Public

**Request Body:**
```json
{
  "name": "Litecoin",
  "symbol": "LTC",
  "price": 150.75,
  "image": "https://example.com/ltc.png",
  "change24h": -1.2
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Cryptocurrency added successfully",
  "data": {
    "_id": "crypto_id",
    "name": "Litecoin",
    "symbol": "LTC",
    "price": 150.75,
    "image": "https://example.com/ltc.png",
    "change24h": -1.2,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Cryptocurrency with this symbol already exists"
}
```

---

## Error Handling

All endpoints return meaningful error messages:

**Common Errors:**
- `400 Bad Request` - Missing or invalid parameters
- `401 Unauthorized` - Invalid or missing JWT token
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

**Error Response Format:**
```json
{
  "success": false,
  "error": "Descriptive error message"
}
```

---

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repo-url>
cd interim-assesment-JosephGyimah
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`)
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB URI and JWT secret
```
MONGODB_URI=mongodb://localhost:27017/coinbase-clone
JWT_SECRET=your_secret_key_here
```

5. Start the server
```bash
npm start
```

6. For development with auto-reload
```bash
npm run dev
```

Server will run on `http://localhost:5000`

---

## Testing with cURL

### Register a new user
```bash
curl -X GET http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Login
```bash
curl -X GET http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Get Profile (with JWT token)
```bash
curl -X GET http://localhost:5000/profile \
  -H "Cookie: token=your_jwt_token_here"
```

### Get All Cryptocurrencies
```bash
curl -X GET http://localhost:5000/crypto
```

### Get Top Gainers
```bash
curl -X GET http://localhost:5000/crypto/gainers
```

### Get New Listings
```bash
curl -X GET http://localhost:5000/crypto/new
```

### Add New Cryptocurrency
```bash
curl -X POST http://localhost:5000/crypto \
  -H "Content-Type: application/json" \
  -d '{"name":"Bitcoin","symbol":"BTC","price":45000,"image":"https://example.com/btc.png","change24h":2.5}'
```

---

## Deployment

### Deploy to Render

1. Push code to GitHub
2. Create Render account at https://render.com
3. Create new "Web Service" connected to GitHub repo
4. Set environment variables in Render dashboard:
   - `MONGODB_URI` - Your MongoDB Atlas connection string
   - `JWT_SECRET` - Strong secret key for production
   - `NODE_ENV` - Set to "production"
   - `PORT` - 5000 (Render will assign automatically)

5. Deploy and test live endpoints

---

## Notes

- JWT tokens expire in 7 days (configurable via `JWT_EXPIRE`)
- Passwords are hashed using bcryptjs
- All cryptocurrency symbols are stored in uppercase
- CORS is configured to accept requests from your frontend URL
- HTTP-only cookies prevent JavaScript access to tokens (security best practice)
