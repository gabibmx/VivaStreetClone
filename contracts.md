# API Contracts - Vivastreet Node.js Backend

## Authentication Endpoints

### POST /api/auth/register
Register a new user (customer or model)

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "age": "number",
  "userType": "customer|model"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "user": { user_object },
    "token": "jwt_token"
  }
}
```

### POST /api/auth/login
Login existing user

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login exitoso",
  "data": {
    "user": { user_object },
    "token": "jwt_token"
  }
}
```

### GET /api/auth/me
Get current user information (requires token)

**Headers:** `Authorization: Bearer {token}`

**Response:**
```json
{
  "success": true,
  "data": {
    "user": { user_object }
  }
}
```

## Profile Endpoints

### GET /api/profiles
Get all profiles with filtering and pagination

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20, max: 50)
- `location` (optional): City name or "all"
- `minAge` (optional): Minimum age or "all"
- `maxAge` (optional): Maximum age or "all"
- `ethnicity` (optional): Ethnicity or "all"
- `category` (optional): "Independiente" | "Agencia" | "all"
- `sortBy` (optional): "featured" | "newest" | "price-low" | "price-high" | "popular"
- `search` (optional): Search term

**Response:**
```json
{
  "success": true,
  "data": {
    "profiles": [
      {
        "id": "profile_id",
        "name": "string",
        "age": "number",
        "location": "string",
        "description": "string",
        "images": ["url1", "url2"],
        "verified": "boolean",
        "featured": "boolean",
        "online": "boolean",
        "incall": "€150/h",
        "outcall": "€200/h",
        "services": ["service1", "service2"],
        "ethnicity": "string",
        "category": "string",
        "rating": "number",
        "views": "number"
      }
    ],
    "pagination": {
      "page": "number",
      "limit": "number",
      "total": "number",
      "pages": "number"
    }
  }
}
```

### GET /api/profiles/:id
Get single profile by ID

**Response:**
```json
{
  "success": true,
  "data": {
    "profile": {
      "id": "profile_id",
      "name": "string",
      "age": "number",
      "location": "string",
      "description": "string",
      "images": ["url1", "url2"],
      "verified": "boolean",
      "featured": "boolean",
      "online": "boolean",
      "incall": "€150/h",
      "outcall": "€200/h",
      "services": ["service1", "service2"],
      "ethnicity": "string",
      "category": "string",
      "rating": "number",
      "reviewCount": "number",
      "views": "number",
      "availability": { schedule_object },
      "lastActive": "date"
    }
  }
}
```

### PUT /api/profiles/:id
Update profile (models only, requires token)

**Headers:** `Authorization: Bearer {token}`

**Request Body:** (all fields optional)
```json
{
  "name": "string",
  "age": "number",
  "location": "string",
  "description": "string",
  "services": ["service1", "service2"],
  "ethnicity": "string",
  "category": "string",
  "rates": {
    "incall": "€150/h",
    "outcall": "€200/h"
  }
}
```

## Message Endpoints

### POST /api/messages
Send a message (requires token)

**Headers:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "receiverId": "user_id",
  "profileId": "profile_id",
  "content": "string"
}
```

### GET /api/messages/conversation/:userId/:profileId
Get conversation between two users (requires token)

**Headers:** `Authorization: Bearer {token}`

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page

### GET /api/messages/conversations
Get user conversations/inbox (requires token)

**Headers:** `Authorization: Bearer {token}`

### GET /api/messages/unread-count
Get unread message count (requires token)

**Headers:** `Authorization: Bearer {token}`

## Booking Endpoints

### POST /api/bookings
Create a new booking (customers only, requires token)

**Headers:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "modelId": "user_id",
  "profileId": "profile_id",
  "date": "2024-01-15T00:00:00.000Z",
  "time": "19:00",
  "duration": 2,
  "serviceType": "incall|outcall",
  "services": ["service1", "service2"],
  "location": {
    "address": "string",
    "city": "string",
    "notes": "string"
  },
  "pricing": {
    "hourlyRate": 150,
    "totalAmount": 300
  },
  "customerPhone": "string",
  "customerNotes": "string",
  "paymentMethod": "cash|card|transfer"
}
```

### GET /api/bookings
Get user bookings (requires token)

**Headers:** `Authorization: Bearer {token}`

**Query Parameters:**
- `status` (optional): Filter by status
- `page` (optional): Page number
- `limit` (optional): Items per page

### GET /api/bookings/:id
Get single booking (requires token)

**Headers:** `Authorization: Bearer {token}`

### PATCH /api/bookings/:id/status
Update booking status (requires token)

**Headers:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "status": "confirmed|cancelled|completed|no-show",
  "notes": "string (optional)"
}
```

### GET /api/bookings/stats/overview
Get booking statistics (requires token)

**Headers:** `Authorization: Bearer {token}`

## Status Endpoint (Legacy Support)

### GET /api/status
Get status checks (for compatibility)

### POST /api/status
Create status check (for compatibility)

**Request Body:**
```json
{
  "client_name": "string"
}
```

## Frontend Integration Changes Required

1. **Replace mock data in frontend components:**
   - Update `mockData.js` to fetch from `/api/profiles`
   - Remove hardcoded profile data

2. **Integrate authentication:**
   - Update `AuthContext.js` to use `/api/auth/login` and `/api/auth/register`
   - Store JWT token in localStorage
   - Add token to API requests

3. **Update API calls:**
   - Replace mock API calls with real backend endpoints
   - Add proper error handling
   - Implement loading states

4. **Add token-based authentication:**
   - Include `Authorization: Bearer {token}` header in authenticated requests
   - Handle token expiration
   - Redirect to login on 401 errors

5. **Profile management:**
   - Allow models to update their profiles via `/api/profiles/:id`
   - Implement image upload functionality
   - Add online status management

6. **Messaging system:**
   - Implement real-time messaging using `/api/messages` endpoints
   - Add conversation management
   - Show unread message counts

7. **Booking system:**
   - Integrate booking creation for customers
   - Add booking management for models
   - Implement status updates

## Database Collections

- **users**: User accounts (customers and models)
- **profiles**: Model profiles with details and media
- **messages**: Messages between users
- **bookings**: Booking requests and confirmations
- **statuschecks**: Legacy status checks