# Bet Site

A comprehensive sports betting application built with Django REST Framework and React.

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

### League and Matches System
- [x] Browse leagues
- [x] View league details
- [x] View upcoming and past matches
- [x] Match status tracking

### UI/UX Features
- [x] Responsive design using Tailwind CSS
- [x] Toast notifications for user feedback
- [x] Dynamic forms with validation
- [x] Error handling
- [x] Card-based match display

## System Requirements

- Python 3.12+
- Node.js 18+ 
- NPM 9+

## Installation and Setup

### Backend Setup
1. Clone the repository
   ```
   git clone https://github.com/yourusername/bettting-site.git
   cd bettting-site
   ```

2. Set up environment variables
   ```
   cd server
   cp .env.example .env
   # Update SECRET_KEY
   ```

3. Set up Python virtual environment
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

4. Install dependencies and set up database
   ```
   cd server
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```

### Frontend Setup
1. Install dependencies and start development server
   ```
   cd client
   npm install
   npm run dev
   ```

2. Access the application at http://localhost:5173

## API Documentation

- Swagger UI: http://localhost:8000/swagger/
- ReDoc: http://localhost:8000/redoc/

## Project Structure

- `server/` - Django Backend
  - `accounts/` - User management and authorization
  - `sports/` - Sports betting management
- `client/` - React Frontend
  - `src/components/` - React components
    - `atoms/` - Basic UI components
    - `molecules/` - Composite components
    - `organisms/` - Complex components combining molecules
    - `ui/` - Reusable UI components (shadcn/ui)
  - `src/pages/` - Application pages
  - `src/services/` - API integration
  - `src/context/` - React contexts for state management
  - `src/hooks/` - Custom React hooks

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
- React Hook Form
- Radix UI primitives
