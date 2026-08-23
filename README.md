# 📚 StudySync

> **A modern student productivity and study management platform**

StudySync is a full-stack web application designed to help students organize their academic life in one place. It provides a centralized platform for managing notes, assignments, study sessions, and progress.

The project combines a **Lovable-built frontend** with a backend and database layer to create a practical student-focused productivity application.

---

## ✨ Features

### 🔐 Authentication

* User signup and login
* User-specific data
* Session-based authentication
* Secure access to personal content

### 📝 Notes Management

* Create notes
* View saved notes
* Edit existing notes
* Delete notes
* Notes are associated with individual users

### 📋 Assignment & Task Management

* Organize academic tasks
* Keep track of assignments
* Manage study-related activities from one dashboard

### ⏱️ Pomodoro / Study Sessions

* Dedicated study-session functionality
* Helps students maintain focused study periods
* Designed around the Pomodoro productivity technique

### 📊 Progress Tracking

* Centralized dashboard
* Overview of study-related activities
* Designed to help students understand and improve their study habits

### 🎨 Modern User Interface

The frontend was developed with **Lovable**, allowing StudySync to have a clean, responsive, and modern interface while keeping the application easy to navigate.

---

## 🏗️ Project Architecture

StudySync follows a full-stack architecture:

```text
                    ┌─────────────────────┐
                    │      StudySync      │
                    │     Web Client      │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Frontend / UI     │
                    │      Lovable        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Backend / API     │
                    │  Application Logic   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Database       │
                    │  User & Study Data  │
                    └─────────────────────┘
```

The frontend is responsible for the user experience and interface, while the backend handles application logic, authentication, and data operations.

---

## 🛠️ Tech Stack

### Frontend

* **Lovable** — UI and frontend development
* **React** — Frontend framework
* **TypeScript / JavaScript** — Application logic
* **Tailwind CSS** — Styling and responsive UI

### Backend

* **Python**
* **Flask**
* REST-style application routes
* Session-based authentication

### Database

* **SQLite** for the original local implementation
* Database-driven user and notes management

### Development Tools

* **VS Code**
* **Git**
* **GitHub**
* **Node.js / npm**

### Deployment

The project is designed to be deployable as a web application using modern hosting platforms.

---

## 📂 Project Structure

A simplified version of the project can be represented as:

```text
StudySync/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   └── ...
│
├── backend/
│   ├── app.py
│   ├── database.db
│   ├── templates/
│   └── ...
│
├── public/
│
├── package.json
├── README.md
└── ...
```

> The exact structure may differ depending on how the Lovable-generated frontend and backend are organized in the current version of the project.

---

## 🔑 Core Database Structure

The original StudySync implementation uses a relational database containing user and study-related information.

### Users

```text
users
├── id
├── fullname
├── email
└── password
```

### Notes

```text
notes
├── id
├── user_id
├── title
└── content
```

Each note is connected to its owner through `user_id`, ensuring that users can access their own notes.

---

## 🔄 How StudySync Works

A typical user flow looks like this:

```text
User
 │
 ▼
Sign Up / Login
 │
 ▼
Dashboard
 │
 ├── Notes
 │    ├── Create
 │    ├── View
 │    ├── Edit
 │    └── Delete
 │
 ├── Assignments / Tasks
 │
 ├── Study Sessions
 │
 └── Progress
```

The dashboard acts as the central hub from which students can access their academic tools.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd StudySync
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Start the frontend

```bash
npm run dev
```

The frontend development server will normally be available at:

```text
http://localhost:5173
```

### 4. Start the Flask backend

Navigate to the backend directory and run:

```bash
python app.py
```

The Flask development server will normally run at:

```text
http://127.0.0.1:5000
```

> Make sure the frontend and backend configuration point to the correct API/backend URL.

---

## 🔐 Environment Variables

If your deployment uses environment variables, create a `.env` file and add the required configuration.

Example:

```env
DATABASE_URL=your_database_url
API_URL=your_backend_url
```

**Never commit sensitive keys, passwords, API keys, or private credentials to GitHub.**

For production deployments, configure environment variables through your hosting provider instead.

---

## 🧑‍💻 Development Workflow

The project was developed using a combination of AI-assisted development and traditional coding.

### Frontend

The initial UI and frontend development was accelerated using **Lovable**, which helped create the modern interface and frontend components.

The generated code can then be edited, customized, and maintained like a normal web application.

### Backend

The backend handles:

* Authentication
* Database operations
* User-specific data
* CRUD operations
* Application logic

This separation allows the frontend to evolve without unnecessarily changing the backend.

---

## 🧠 What This Project Demonstrates

StudySync demonstrates practical experience with:

* Full-stack web development
* Frontend development
* Backend development
* Database integration
* CRUD operations
* Authentication
* REST APIs
* React-based interfaces
* Flask
* SQL databases
* Git and GitHub
* AI-assisted development
* Deployment and environment configuration

---


## 🌐 Deployment

StudySync can be deployed by hosting the frontend and backend separately or using a platform capable of serving the complete application.

Before deploying, make sure to:

1. Configure production environment variables.
2. Configure the production database.
3. Update frontend API URLs.
4. Enable appropriate CORS settings.
5. Disable development/debug mode.
6. Verify authentication and database permissions.
7. Test all CRUD operations in production.

---

## 🤝 Contributing

Contributions and suggestions are welcome.

To contribute:

```bash
git clone <YOUR_REPOSITORY_URL>
cd StudySync
git checkout -b feature/your-feature
```

Make your changes, test them, and create a pull request.

---

## 📄 License

This project is currently intended for educational and portfolio purposes.

A formal open-source license can be added later depending on how the project is distributed.

---

## 👨‍💻 About the Project

**StudySync** was created as a student-focused full-stack web development project with the goal of bringing essential academic productivity tools together into a single platform.

The project also explores how **AI-assisted development tools such as Lovable** can be combined with traditional programming, backend development, databases, and deployment workflows to build a complete application.

---

## ⭐ If You Like StudySync

If you find the project useful or interesting, consider giving the repository a ⭐ on GitHub!

**StudySync — Organize. Study. Improve.**
