# Backend Testing Guide

## Test Cases

### Authentication Tests

#### Test 1: User Registration
**Expected Behavior:** New user can register with name, email, and password

**Steps:**
1. Send POST request to `/register` with user data
2. Verify response contains success message and JWT token
3. Verify password is hashed (not plain text in DB)
4. Verify user is created in MongoDB

**cURL Command:**
```bash
curl -X GET http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "testpass123"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "...",
    "name": "Test User",
    "email": "test@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiI..."
}
```

---

#### Test 2: Duplicate Email Registration
**Expected Behavior:** Cannot register with existing email

**Steps:**
1. Register first user
2. Try to register with same email
3. Verify error message

**cURL Command:**
```bash
curl -X GET http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Another User",
    "email": "test@example.com",
    "password": "different123"
  }'
```

**Expected Response (400):**
```json
{
  "success": false,
  "error": "Email already registered"
}
```

---

#### Test 3: User Login
**Expected Behavior:** User can login with email and password

**Steps:**
1. Register user
2. Login with correct credentials
3. Verify JWT token received
4. Verify token is valid

**cURL Command:**
```bash
curl -X GET http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpass123"
  }' \
  -c cookies.txt
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "...",
    "name": "Test User",
    "email": "test@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiI..."
}
```

---

#### Test 4: Login with Wrong Password
**Expected Behavior:** Cannot login with incorrect password

**cURL Command:**
```bash
curl -X GET http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "wrongpassword"
  }'
```

**Expected Response (401):**
```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

---

#### Test 5: Get User Profile (Protected Route)
**Expected Behavior:** Authenticated user can access profile, unauthenticated cannot

**Steps:**
1. Login and get JWT token
2. Send profile request with token
3. Verify user data returned
4. Try without token - should fail

**cURL Command (with token):**
```bash
curl -X GET http://localhost:5000/profile \
  -H "Cookie: token=your_jwt_token_here"
```

**Expected Response:**
```json
{
  "success": true,
  "user": {
    "id": "...",
    "name": "Test User",
    "email": "test@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**cURL Command (without token):**
```bash
curl -X GET http://localhost:5000/profile
```

**Expected Response (401):**
```json
{
  "success": false,
  "error": "Not authorized to access this route"
}
```

---

#### Test 6: Logout
**Expected Behavior:** User can logout, cookie is cleared

**cURL Command:**
```bash
curl -X GET http://localhost:5000/logout \
  -H "Cookie: token=your_jwt_token_here" \
  -b cookies.txt -c cookies_new.txt
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

### Cryptocurrency Tests

#### Test 7: Get All Cryptocurrencies
**Expected Behavior:** Returns all cryptocurrencies in database

**cURL Command:**
```bash
curl -X GET http://localhost:5000/crypto
```

**Expected Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "...",
      "name": "Bitcoin",
      "symbol": "BTC",
      "price": 45230.5,
      "image": "https://...",
      "change24h": 2.5,
      "createdAt": "...",
      "updatedAt": "..."
    },
    ...
  ]
}
```

---

#### Test 8: Get Top Gainers
**Expected Behavior:** Returns cryptos sorted by highest 24h change (descending)

**cURL Command:**
```bash
curl -X GET http://localhost:5000/crypto/gainers
```

**Expected Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "name": "Chainlink",
      "change24h": 6.3
    },
    {
      "name": "Cardano",
      "change24h": 5.1
    },
    {
      "name": "Solana",
      "change24h": 4.8
    },
    ...
  ]
}
```

**Verification:** Ensure `change24h` values are in descending order.

---

#### Test 9: Get New Listings
**Expected Behavior:** Returns cryptos sorted by newest first (descending by createdAt)

**cURL Command:**
```bash
curl -X GET http://localhost:5000/crypto/new
```

**Expected Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "name": "Most Recent Crypto",
      "createdAt": "2024-01-20T15:45:00.000Z"
    },
    {
      "name": "Second Recent Crypto",
      "createdAt": "2024-01-20T15:30:00.000Z"
    },
    ...
  ]
}
```

**Verification:** Ensure most recent cryptos appear first.

---

#### Test 10: Add New Cryptocurrency
**Expected Behavior:** Successfully create new cryptocurrency

**cURL Command:**
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

**Expected Response (201):**
```json
{
  "success": true,
  "message": "Cryptocurrency added successfully",
  "data": {
    "_id": "...",
    "name": "Dogecoin",
    "symbol": "DOGE",
    "price": 0.15,
    "image": "https://cryptoicons.org/api/icon/doge/200",
    "change24h": 1.2,
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---

#### Test 11: Duplicate Cryptocurrency Symbol
**Expected Behavior:** Cannot add crypto with existing symbol

**cURL Command:**
```bash
curl -X POST http://localhost:5000/crypto \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bitcoin Cash Clone",
    "symbol": "BTC",
    "price": 100,
    "image": "https://...",
    "change24h": 0
  }'
```

**Expected Response (400):**
```json
{
  "success": false,
  "error": "Cryptocurrency with this symbol already exists"
}
```

---

#### Test 12: Add Crypto with Missing Fields
**Expected Behavior:** Validation fails with clear error message

**cURL Command:**
```bash
curl -X POST http://localhost:5000/crypto \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Incomplete Crypto",
    "symbol": "INC"
  }'
```

**Expected Response (400):**
```json
{
  "success": false,
  "error": "Please provide name, symbol, price, image, and 24h change percentage"
}
```

---

## Quick Test All Endpoints

Run this script to test all endpoints:

```bash
#!/bin/bash

BASE_URL="http://localhost:5000"

echo "=== Testing Backend API ==="

# Test health check
echo -e "\n1. Health Check:"
curl -s $BASE_URL | jq .

# Test Register
echo -e "\n2. Register User:"
REGISTER=$(curl -s -X GET $BASE_URL/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"pass123"}')
echo $REGISTER | jq .
TOKEN=$(echo $REGISTER | jq -r '.token')

# Test Login
echo -e "\n3. Login User:"
curl -s -X GET $BASE_URL/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass123"}' | jq .

# Test Profile (Protected)
echo -e "\n4. Get Profile:"
curl -s -X GET $BASE_URL/profile \
  -H "Cookie: token=$TOKEN" | jq .

# Test Get All Cryptos
echo -e "\n5. Get All Cryptocurrencies:"
curl -s $BASE_URL/crypto | jq .

# Test Get Gainers
echo -e "\n6. Get Top Gainers:"
curl -s $BASE_URL/crypto/gainers | jq '.[].data[0:3]'

# Test Get New Listings
echo -e "\n7. Get New Listings:"
curl -s $BASE_URL/crypto/new | jq '.[].data[0:3]'

# Test Add Crypto
echo -e "\n8. Add New Cryptocurrency:"
curl -s -X POST $BASE_URL/crypto \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test Coin",
    "symbol":"TST",
    "price":99.99,
    "image":"https://example.com/tst.png",
    "change24h":5.0
  }' | jq .

echo -e "\n✓ All tests completed!"
```

---

## Expected Results Summary

| Test | Expected Status | Validation |
|------|-----------------|-----------|
| Register | 201 | User created, token returned |
| Duplicate Email | 400 | Error message clear |
| Login Success | 200 | Token returned |
| Login Fail | 401 | Invalid credentials |
| Profile (Auth) | 200 | User data returned |
| Profile (No Auth) | 401 | Unauthorized |
| Logout | 200 | Success message |
| Get All Cryptos | 200 | Array returned |
| Get Gainers | 200 | Sorted by change24h DESC |
| Get New | 200 | Sorted by createdAt DESC |
| Add Crypto | 201 | Crypto created |
| Duplicate Symbol | 400 | Error message clear |
| Missing Fields | 400 | Validation error |

---

## Automated Testing

To run with Postman:

1. Create new Postman Collection
2. Add requests for each endpoint
3. Set up tests for each request
4. Use variables for token storage between requests
5. Run collection

Example test script in Postman:
```javascript
// After login, save token
var jsonData = pm.response.json();
pm.environment.set("token", jsonData.token);
```

Then use in next request:
```
Cookie: token={{token}}
```

---

## Performance Testing

Once all tests pass, test under load:

```bash
# Install Apache Bench (macOS)
brew install httpd

# Test GET /crypto with 1000 requests
ab -n 1000 -c 10 http://localhost:5000/crypto

# Expected: >100 req/sec on development machine
```

---

## Next: Frontend Integration

After all tests pass locally:
1. Deploy to Render (see SETUP.md)
2. Update frontend to use deployed API URL
3. Test frontend authentication flow
4. Deploy frontend
5. Final end-to-end testing
