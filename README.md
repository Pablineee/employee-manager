# Employee Manager

A full-stack employee management system with a secure Angular frontend and Apollo Server backend built with Node.js. This project includes a MongoDB database for persistent data storage and emphasizes security, modular design, and scalability.

## Tech Stack

- **Frontend**: Angular
- **Backend**: Apollo Server (Node.js + Express)
- **Database**: MongoDB
- **GraphQL**: For flexible and efficient data queries
- **Authentication**: Custom registration code system
- **Security**: Input validation, secure authentication, backend/frontend protections

---

## Features

### Authentication & Security
- **User registration with registration code requirement**
- **Secure backend & frontend implementation**
- **Basic validation and form-level protection**

### Employee Management
- Full **CRUD operations** for employee records
- **GraphQL API** for streamlined data queries
- Data stored and retrieved from MongoDB

---

## Project Structure

### 📁 `backend/`
- `models/` — Mongoose models for users and employees
- `schema/` — GraphQL schema definitions
- `resolver/` — Resolver functions for GraphQL
- `utils/` — Custom utilities (e.g., date formatting, validation)
- `config/` — Configuration files (DB, environment setup)
- `server.js` — Main Apollo Server setup

### 📁 `frontend/`
- `src/` — Angular component structure for employee management
- `public/` — Static assets
- `.angular/` — Cache and build artifacts
- Angular modules include routing, forms, GraphQL service integration, and component-level validation

---

## Features in Progress

- [ ] **Unit and integration tests**
- [ ] **Employee details modal**
- [ ] **User profile settings**
- [x] **Configure CODEOWNERS**
- [ ] **Docker containerization**
- [ ] **Email verification**
- [ ] **Forgot password / email reset functionality**
- [ ] **Role-Based Access Control (RBAC)** for different user access levels
- [x] **CI Pipeline**
- [ ] **CD Pipeline**

---

## Getting Started

### Prerequisites
- Node.js & npm
- Angular CLI
- MongoDB (local or cloud instance)

---
## Environment Variables
***The following should be stored in the backend's ```.env``` file***
```bash
MONGODB_URI=<your_mongo_connection_string>
PORT=4000
JWT_SECRET=<your_jwt_secret>
```

***The following should be stored in the frontend's***
***```/src/environments/environment.ts``` file***
```bash
export const env = {
    REGISTRATION_CODE: 'your_registration_code'
};
```

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
ng serve
```

---
## Future Enhancements

- Add dark mode and custom theme options
- Integrate logs & analytics dashboard
- Expand to support multiple departments/teams
- Admin dashboard for user management (RBAC)
- Mobile responsiveness optimization
- Email templates and notification system
- Centralized error logging and monitoring

---

## License

This project is licensed under the [GNU GPLv3 License](LICENSE).

---

## Contact

For issues, questions, or feature requests, feel free to reach out or open an issue in the repository.

- Developer: **Pablo Arango-Gomez**
- Email: _PabloGomezDeveloper@gmail.com_

---
