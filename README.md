# Bet Site

A sports betting application built with Django REST Framework and React.

# Project Status

![screencapture-127-0-0-1-5173-2025-02-22-11_44_42](https://github.com/user-attachments/assets/78b3ee22-76df-41e2-b303-faedb694ce35)

![screencapture-127-0-0-1-5173-login-2025-02-22-11_44_55](https://github.com/user-attachments/assets/8270c1b6-7c2e-4d2f-b64b-0e5e08fc005f)

![screencapture-127-0-0-1-5173-balance-2025-02-22-11_45_40](https://github.com/user-attachments/assets/8b86e130-f064-48f5-9620-4800dfecd912)

![screencapture-localhost-5173-user-bets-2025-03-09-10_02_19](https://github.com/user-attachments/assets/603e0225-7178-419f-8ed3-cdb3ba75a1be)

## Current Features

### Authentication System
- [x] JWT-based authentication
- [x] User registration
- [x] User login
- [ ] Email verification
- [ ] Password reset functionality

### User Balance Management
- [x] View current balance
- [x] Add balance functionality

### Betting System
- [x] Home page with available bets
- [x] Create new bets
- [x] Place bets on available events
- [x] View user's active bets
- [x] Bet results processing (When the status of the match is changed to finished)
- [x] Winnings calculation
- [x] Persistent bet selections with auto-validation on page refresh

## System Requirements

- Python 3.12+
- Node.js 18+ 
- NPM 9+

## Installation and Setup

### Backend (Django)

1. Navigate to the `server` directory:
```bash
cd server
```

2. Create and activate virtual environment:
```bash
python -m venv venv
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file in the `server` directory and add your secret key:
```plaintext
SECRET_KEY=your-secret-key-here
```

5. Run database migrations:
```bash
python manage.py migrate
```

6. Start development server:
```bash
python manage.py runserver
```

Server will be available at: http://localhost:8000

### Frontend (React)

1. In a new terminal, navigate to the `client` directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the application:
```bash
npm run dev
```

Application will be available at: http://localhost:5173

## API Documentation

- Swagger UI: http://localhost:8000/swagger/
- ReDoc: http://localhost:8000/redoc/

## Project Structure

- `server/` - Django Backend
  - `accounts/` - User management and authorization
  - `sports/` - Sports betting management
- `client/` - React Frontend
  - `src/components/` - React components
  - `src/pages/` - Application pages
  - `src/services/` - API integration
  - `src/context/` - React contexts for state management

## Technologies

### Backend
- Django
- Django REST Framework
- Simple JWT
- drf-yasg (Swagger/OpenAPI)

### Frontend
- React
- React Router
- Axios
- Tailwind CSS
- shadcn/ui
