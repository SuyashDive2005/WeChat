# 💬 WeChat - Real-Time Chat Application

<div align="center">
WeChat a real-time chat application that enables seamless end-to-end communication with online users, featuring instant messaging, live presence tracking, and secure authentication. Built with modern web technologies for production-ready performance.

</div>

---

## ✨ Core Features

### 🚀 Instant Messaging

- **Real-Time Message Delivery** - Messages arrive in milliseconds using Socket.io WebSocket technology
- **Seamless Communication** - End-to-end message transmission between users
- **Chat History** - Complete message persistence and instant retrieval
- **Typing Indicators** - Live notification when users are composing messages
- **Message Timestamps** - Accurate tracking of all message timelines

### 👁️ Live Presence Tracking

- **Online/Offline Status** - Real-time user availability indicators
- **Instant Presence Updates** - See when users go online or offline
- **Active User List** - Display of currently connected users
- **Status Persistence** - Maintains user state across page refreshes
- **Connection Monitoring** - Automatic detection of disconnections

### 🔐 Secure Authentication

- **JWT Authentication** - Stateless, token-based session management
- **Google OAuth 2.0** - Secure third-party authentication
- **Protected Routes** - Authorization middleware on all sensitive endpoints
- **Session Security** - HttpOnly cookies with secure flags

### 🎨 Beautiful User Experience

- **Modern Design** - Frosted-glass UI with blur and transparency effects
- **Responsive Interface** - Perfect on desktop, tablet, and mobile devices
- **Dark Theme** - Eye-friendly dark mode with gradient accents
- **Smooth Animations** - Professional transitions and loading states
- **Accessibility** - WCAG 2.1 compliant components
- ***

## 🛠️ Tech Stack

### Frontend Technologies

| Category          | Technology       | Version | Purpose                              |
| ----------------- | ---------------- | ------- | ------------------------------------ |
| **Framework**     | React            | 18.3+   | UI library                           |
| **Build Tool**    | Vite             | 6.3+    | Fast development & production builds |
| **Styling**       | Tailwind CSS     | 3.4+    | Utility-first CSS framework          |
| **Components**    | DaisyUI          | 4.12+   | Pre-built Tailwind components        |
| **State**         | Zustand          | 5.0+    | Lightweight state management         |
| **Real-time**     | Socket.io Client | 4.8+    | WebSocket communication              |
| **HTTP**          | Axios            | 1.7+    | Promise-based HTTP client            |
| **Routing**       | React Router     | 7.1+    | Client-side navigation               |
| **Icons**         | Lucide React     | 0.471+  | Beautiful icon library               |
| **Notifications** | React Hot Toast  | 2.5+    | Toast notifications                  |

### Backend Technologies

| Category      | Technology      | Version | Purpose                       |
| ------------- | --------------- | ------- | ----------------------------- |
| **Runtime**   | Node.js         | 18+     | JavaScript runtime            |
| **Framework** | Express.js      | 4.21+   | Web application framework     |
| **Real-time** | Socket.io       | 4.8+    | WebSocket server              |
| **ORM**       | Prisma          | 6.18+   | Next-gen database ORM         |
| **Database**  | MySQL           | 8.0+    | Relational database           |
| **Auth**      | JWT             | 9.0+    | Secure token authentication   |
| **Image**     | Cloudinary      | 2.5+    | Cloud image hosting           |
| **OAuth**     | Google Auth Lib | 10.6+   | Google authentication         |
| **CORS**      | cors            | 2.8+    | Cross-origin resource sharing |

---

## 📊 Architecture Overview

```
┌───────────────────────────────────────────────────────────┐
│                     WeChat Application                    │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  ┌──────────────────┐          ┌─────────────────────┐    │
│  │   React Frontend │◄────────►│  Express Backend    │    │
│  │   (Vite Build)   │          │  (Socket.io Server) │    │
│  └──────────────────┘          └─────────────────────┘    │
│         │ Components               │ Controllers          │
│         ├─ Navbar                  ├─ Auth Routes         │
│         ├─ Sidebar                 ├─ Message Routes      │
│         ├─ ChatContainer           └─ Socket Handlers     │
│         └─ ProfilePage                                    │
│                                                           │
│  ┌──────────────────────────────────────────────────┐     │
│  │            MySQL Database (Prisma ORM)           │     │
│  ├──────────────────────────────────────────────────┤     │
│  │ Users Table  │  Messages Table  │  Relationships │     │
│  └──────────────────────────────────────────────────┘     │
│                                                           │
│  ┌──────────────────────────┐   ┌──────────────────┐      │
│  │  Cloudinary (Images)     │   │ Google OAuth 2.0 │      │
│  └──────────────────────────┘   └──────────────────┘      │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
WeChat/
│
├── Frontend/
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ChatContainer.jsx
│   │   │   ├── ChatHeader.jsx
│   │   │   ├── MessageInput.jsx
│   │   │   ├── NoChatSelected.jsx
│   │   │   └── skeletons/
│   │   │
│   │   ├── pages/                # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignUpPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   └── SettingsPage.jsx
│   │   │
│   │   ├── store/                # Zustand state stores
│   │   │   ├── useAuthStore.js
│   │   │   ├── useChatStore.js
│   │   │   └── useThemeStore.js
│   │   │
│   │   ├── lib/                  # Utilities & helpers
│   │   │   ├── axios.js          # Axios configuration
│   │   │   └── Utils.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── public/                   # Static assets
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── Backend/
│   ├── src/
│   │   ├── controllers/          # Business logic
│   │   │   ├── auth.controller.js
│   │   │   └── message.controller.js
│   │   │
│   │   ├── routes/               # API endpoints
│   │   │   ├── auth.route.js
│   │   │   └── message.route.js
│   │   │
│   │   ├── middleware/           # Custom middleware
│   │   │   └── auth.middleware.js
│   │   │
│   │   ├── lib/                  # Helper functions
│   │   │   ├── db.js            # Database connection
│   │   │   ├── prisma.js
│   │   │   ├── socket.js        # Socket.io setup
│   │   │   ├── cloudinary.js
│   │   │   └── utils.js
│   │   │
│   │   └── index.js              # Server entry point
│   │
│   ├── prisma/
│   │   ├── schema.prisma         # Database schema
│   │   ├── migrations/           # Database migrations
│   │   └── mysql_schema.sql      # SQL setup script
│   │
│   ├── .env                      # Environment variables
│   ├── package.json
│   └── .gitignore
│
└── README.md                      # This file
```

---
