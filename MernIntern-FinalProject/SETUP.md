# Quiz Portal - Setup Guide

## Prerequisites
- Node.js installed
- MongoDB Compass installed and running locally
- MongoDB running on `mongodb://localhost:27017`

## Installation

### 1. Install Dependencies

**Root Level:**
```bash
cd "c:\Users\Admin\OneDrive\Desktop\ASSIGNMENT I\MernIntern-FinalProject"
npm run install-all
```

### 2. MongoDB Setup

- Open MongoDB Compass
- Connect to `mongodb://localhost:27017`
- Create database: `quiz-portal`

### 3. Environment Configuration

**Backend (.env):**
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/quiz-portal
```

## Running the Application

### Option 1: Run Both in Parallel
```bash
npm run dev
```

### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
npm run backend
```

**Terminal 2 - Frontend:**
```bash
npm run frontend
```

## Access Points

- **Frontend:** http://localhost:3001
- **Backend API:** http://localhost:5000
- **Status Check:** http://localhost:5000/api/status

## Admin Panel Features

### System Status Page
- View Backend Server Status
- View MongoDB Database Status
- Real-time connectivity monitoring (updates every 5 seconds)
- Access via Admin Dashboard → System Status tab

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/users` - Get all users

### Quiz Management
- `POST /api/quiz/create` - Create quiz
- `GET /api/quiz` - Get all quizzes
- `GET /api/quiz/:id` - Get quiz by ID
- `POST /api/quiz/submit` - Submit quiz
- `GET /api/quiz/results/all` - Get all results

### System Status
- `GET /api/status` - Check backend and database status

## Folder Structure

```
MernIntern-FinalProject/
├── Backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Quiz.js
│   │   └── Result.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── quizRoutes.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── quizController.js
│   ├── data/
│   │   ├── quizzes.json
│   │   └── users.json
│   ├── .env
│   ├── server.js
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── Pages/
│   │   │   ├── Admin.js
│   │   │   ├── SystemStatus.js
│   │   │   └── ...
│   │   ├── Styles/
│   │   │   ├── SystemStatus.css
│   │   │   └── ...
│   │   ├── api.js
│   │   └── ...
│   └── package.json
└── package.json
```

## Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify database exists in MongoDB Compass

### Backend Not Connecting
- Check if port 5000 is available
- Verify all dependencies are installed
- Check console for error messages

### Frontend Cannot Reach Backend
- Ensure backend is running on port 5000
- Check CORS settings in server.js
- Verify API_BASE_URL in api.js
