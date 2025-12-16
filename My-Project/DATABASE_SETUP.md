# Menu API - Database Connected

This is an Express.js REST API connected to MongoDB using Mongoose.

## Setup Instructions

### 1. Install Dependencies

All dependencies including mongoose have been installed:

- express
- mongoose
- dotenv
- nodemon

### 2. Database Configuration

Update the `config.env` file with your MongoDB connection string:

```
db_url=mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
PORT=9000
```

### 3. Project Structure

- **db.js**: Database connection configuration
- **MenuItem.js**: Mongoose schema for menu items
- **MenuController.js**: Business logic for all menu operations
- **MenuRouter.js**: Route definitions
- **Sever.js**: Main server entry point
- **index.js**: Express app initialization

### 4. Run the Server

```bash
node Sever.js
```

The server will start on port 9000 and connect to MongoDB.

## API Endpoints

### Get All Menu Items

- **URL**: `/api/v1/menu`
- **Method**: GET
- **Response**: List of all menu items

### Get Single Menu Item

- **URL**: `/api/v1/menu/:id`
- **Method**: GET
- **Response**: Single menu item by ID

### Create Menu Item

- **URL**: `/api/v1/menu`
- **Method**: POST
- **Body**:

```json
{
  "name": "Burger",
  "description": "Tasty burger",
  "price": 150,
  "category": "Fast Food",
  "isVeg": false,
  "image": "url",
  "rating": 4.5
}
```

### Update Menu Item

- **URL**: `/api/v1/menu/:id`
- **Method**: PUT
- **Body**: Fields to update

### Delete Menu Item

- **URL**: `/api/v1/menu/:id`
- **Method**: DELETE

## Database Connection Features

✅ MongoDB connection with mongoose
✅ Database connection initiated at server startup
✅ Connection pooling with useNewUrlParser and useUnifiedTopology
✅ Error handling for database failures
✅ All CRUD operations use database instead of JSON files

## Key Changes Made

1. **Created db.js** - Centralized database connection manager
2. **Created MenuItem.js** - Mongoose schema with validation
3. **Updated MenuController.js** - Converted all operations to async/await with MongoDB queries
4. **Updated MenuRouter.js** - Clean route handlers with proper HTTP methods
5. **Updated Sever.js** - Database connection initialization
6. **Updated index.js** - Simplified with middleware and route organization
7. **Updated config.env** - Added PORT configuration

## Testing

You can test the API using:

- Postman
- Thunder Client
- cURL

Example:

```bash
curl http://localhost:9000/api/v1/menu
```
