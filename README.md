# Bet Site

A sports betting application built with Django REST Framework and React.

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
