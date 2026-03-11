# 💬 Chatify

A **full-stack real-time chat application** built using **Spring Boot** for the backend and **React** for the frontend.

Chatify allows users to communicate instantly through a simple and responsive interface.
The project demonstrates how to build a modern chat system using **Java backend services and a React client**.

---

# 🚀 Features

* ⚡ Real-time messaging
* 👥 Multi-user chat support
* 🔗 React frontend with REST/WebSocket communication
* 🧩 Spring Boot backend architecture
* 📦 Modular project structure

---

# 🛠 Tech Stack

## Backend

* Java
* Spring Boot
* Spring Web
* WebSocket (for real-time communication)

## Frontend

* React
* JavaScript
* CSS

---

# 📂 Project Structure

```
Chatify
│
├── backend
│   ├── controller
│   ├── service
│   ├── model
│   ├── repository
│   └── config
│
└── frontend
    ├── components
    ├── pages
    ├── services
    └── styles
```

The backend follows a **layered architecture** commonly used in Spring Boot applications:

```
Controller → Service → Repository → Database
```

---

# ▶️ Running the Project

## 1️⃣ Clone the repository

```bash
git clone https://github.com/Madlx-devs/Chatify.git
cd Chatify
```

---

## 2️⃣ Start the Backend

Navigate to the backend folder:

```bash
cd backend
```

Run the Spring Boot application:

```bash
./mvnw spring-boot:run
```

or

```bash
mvn spring-boot:run
```

Backend will start on:

```
http://localhost:8080
```

---

## 3️⃣ Start the Frontend

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
npm start
```

Frontend will run on:

```
http://localhost:3000
```

---

# 🧠 Learning Goals

This project was built to practice:

* Full-stack application development
* Building REST APIs with Spring Boot
* Implementing real-time communication
* Frontend and backend integration
* Modern project architecture

---

# 📸 Screenshots

Add screenshots or GIFs of the chat interface here.

Example:

```
![Chat UI](screenshots/chat-ui.png)
```

---

# 🚧 Future Improvements

Planned features and enhancements:

### 🔐 Authentication

* User registration and login
* JWT based authentication
* Secure sessions

### 💬 Chat Improvements

* Private messaging
* Chat rooms
* Message history

### 🟢 User Presence

* Online/offline status
* Typing indicators

### 💾 Persistence

* Database integration
* Stored messages and user profiles

### 🌐 Deployment

* Deploy backend to cloud
* Host frontend for public access

---

# 📌 Project Status

🚧 **Work in Progress**

More features and improvements are planned.

---

# 📜 License

This project is open source and available under the **MIT License**.
