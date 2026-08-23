# 🚀 InterviewPilot AI

> **AI-powered interview preparation and resume optimization platform**

InterviewPilot AI is a full-stack web application that helps job seekers prepare for technical interviews and tailor their resumes to specific job descriptions using Generative AI.

Users can provide a **job description** along with their **resume or personal information**, and InterviewPilot AI analyzes the requirements to generate relevant interview questions, identify skill gaps, create a preparation roadmap, and generate an ATS-friendly resume tailored to the target role.

---

## ✨ Features

### 🤖 AI-Powered Interview Preparation

* Generate technical interview questions based on the target job.
* Generate behavioral interview questions.
* Analyze the job description and identify important skills.
* Identify potential skill gaps between the candidate and the job requirements.
* Generate a structured **7-day interview preparation roadmap**.
* Generate an interview preparation report containing the generated insights.

### 📄 AI Resume Generation

* Generate a resume tailored to a specific job description.
* Optimize resume content for ATS compatibility.
* Generate a downloadable PDF version of the resume.
* Uses Puppeteer for server-side PDF generation.

### 🔐 Authentication

* Email/password registration and login.
* Email verification for newly registered users.
* Password hashing using bcrypt.
* JWT-based authentication using HTTP-only cookies.
* Protected routes.
* Logout functionality.
* Change password functionality.

### 🔵 Google OAuth

* Sign in using Google.
* Google account integration using Google OAuth.
* Supports users who authenticate directly through Google.

### 👤 User Account

* User profile information.
* Account settings.
* Password management.
* Authentication state management using React Context.

### 🎨 Modern UI

* Responsive React-based interface.
* Dashboard-style layout.
* Protected application routes.
* Toast notifications.
* Loading states and spinners.
* Clean and modern dark-themed interface.

---

## 🛠️ Tech Stack

### Frontend

* **React**
* **React Router**
* **Vite**
* **Tailwind CSS**
* **Axios**
* **React Context API**

### Backend

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **JWT**
* **bcryptjs**
* **cookie-parser**
* **CORS**

### AI & Other Technologies

* **Google Gemini / Google GenAI**
* **Puppeteer**
* **Nodemailer**
* **Google OAuth**

---

## 🏗️ Project Architecture

```text
InterviewPilot-AI/
│
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   │
│   ├── public/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── feature/
│   │   │   ├── auth/
│   │   │   └── interview/
│   │   ├── shared/
│   │   ├── App.jsx
│   │   ├── app.routes.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## 🔄 How InterviewPilot AI Works

```text
             ┌─────────────────────┐
             │       User          │
             └──────────┬──────────┘
                        │
                        ▼
             ┌─────────────────────┐
             │ Job Description +   │
             │ Resume / Profile    │
             └──────────┬──────────┘
                        │
                        ▼
             ┌─────────────────────┐
             │   Backend / API     │
             │     Express.js      │
             └──────────┬──────────┘
                        │
                        ▼
             ┌─────────────────────┐
             │   Google Gemini     │
             │     Analysis        │
             └──────────┬──────────┘
                        │
            ┌───────────┼───────────┐
            ▼           ▼           ▼
       Technical    Behavioral   Skill Gap
       Questions    Questions    Analysis
            │           │           │
            └───────────┼───────────┘
                        ▼
             ┌─────────────────────┐
             │ 7-Day Preparation   │
             │      Roadmap        │
             └──────────┬──────────┘
                        │
                        ▼
             ┌─────────────────────┐
             │ AI Resume Generator │
             └──────────┬──────────┘
                        │
                        ▼
             ┌─────────────────────┐
             │ Puppeteer PDF       │
             │ Generation          │
             └─────────────────────┘
```

---

## 📋 Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* MongoDB / MongoDB Atlas
* Google Gemini API key
* Google OAuth credentials

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone https://github.com/Prashantkumar22205/InterviewPilot-AI.git

cd InterviewPilot-AI
```

---

## 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file inside the `Backend` directory.

Example:

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

FRONTEND_URL=http://localhost:5173

GEMINI_API_KEY=your_gemini_api_key

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

> Use the exact environment variable names configured in your backend if they differ from the example above.

Start the backend:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:3000
```

---

## 3. Frontend Setup

Open another terminal:

```bash
cd Frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

---

# 🔐 Authentication Flow

InterviewPilot AI uses multiple authentication mechanisms.

### Email & Password

```text
Register
   ↓
Password hashed using bcrypt
   ↓
User stored in MongoDB
   ↓
Verification email sent
   ↓
User verifies email
   ↓
Login
   ↓
JWT stored in HTTP-only cookie
```

### Google OAuth

```text
User clicks "Continue with Google"
             ↓
        Google OAuth
             ↓
       Backend verifies
             ↓
      User created/found
             ↓
       JWT authentication
```

---

# 🤖 AI Integration

InterviewPilot AI uses Google's Generative AI capabilities to process job descriptions and candidate information.

The AI is used for tasks such as:

* Technical question generation
* Behavioral question generation
* Job requirement analysis
* Skill-gap analysis
* Interview preparation planning
* Resume generation
* Resume customization according to job requirements

The AI-generated output is structured before being presented to the frontend.

---

# 📄 Resume PDF Generation

The application uses **Puppeteer** to convert the generated resume into a downloadable PDF.

The flow is:

```text
AI-generated resume
        ↓
Resume HTML
        ↓
Puppeteer
        ↓
Chrome
        ↓
PDF
        ↓
User Download
```

The production deployment is configured to install and run Chromium appropriately for the server environment.

---

# 🗄️ Database

MongoDB is used as the primary database.

Mongoose is used for database modeling and interaction.

The application stores information such as:

* User accounts
* Authentication information
* Google OAuth identifiers
* Email verification information
* Interview plans
* Generated reports
* Resume-related data

Sensitive authentication data such as passwords are stored as bcrypt hashes rather than plain text.

---

# 🔒 Security

The application implements several security mechanisms:

* Password hashing with bcrypt
* JWT authentication
* HTTP-only authentication cookies
* Protected API routes
* Authentication middleware
* Email verification
* Google OAuth authentication
* CORS configuration
* Environment variables for secrets
* Token expiration

---

# 🌐 Deployment

### Frontend

Deployed using Vercel.

```text
https://interview-pilot-ai-peach.vercel.app
```

### Backend

Deployed using Render.

```text
https://interviewpilot-ai-1-e0sk.onrender.com
```

> Deployment URLs may change in the future.

---

# 📡 API Structure

Main API groups include:

```text
/api/auth
/api/interview
/auth
```

### Authentication

```text
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/verify-email
GET    /api/auth/logout
GET    /api/auth/get-me
PATCH  /api/auth/change-password
```

### Interview

Interview-related endpoints handle:

* Interview plan generation
* Interview report generation
* Resume generation
* Resume PDF generation
* Interview data retrieval

### Google Authentication

Google authentication routes are handled separately from the standard email/password authentication routes.

---

# 📸 Application Screens

Add screenshots of your application here:

```text
screenshots/
├── login.png
├── register.png
├── dashboard.png
├── interview-plan.png
├── interview-report.png
├── resume.png
└── settings.png
```

Example:

```markdown
![Login Page](screenshots/login.png)
```

---

# 🚧 Challenges & Solutions

### 1. AI API Integration

**Challenge:**
Generating structured interview preparation content from unstructured job descriptions.

**Solution:**
Used structured prompts and schema-based AI responses to generate consistent interview reports.

---

### 2. PDF Generation in Production

**Challenge:**
Puppeteer requires a compatible Chrome/Chromium executable when deployed to a server environment.

**Solution:**
Configured Puppeteer/Chromium specifically for the Render deployment environment.

---

### 3. Authentication Across Frontend and Backend

**Challenge:**
Maintaining authentication state between the React frontend and Express backend.

**Solution:**
Implemented JWT authentication with HTTP-only cookies, Axios credentials, authentication middleware, and React Context.

---

### 4. Google OAuth

**Challenge:**
Supporting users who authenticate through Google while maintaining the application's existing authentication system.

**Solution:**
Integrated Google OAuth and connected Google-authenticated accounts with the existing user model.

---

### 5. Email Verification

**Challenge:**
Preventing users from registering with an unverified email address.

**Solution:**
Implemented cryptographically generated verification tokens with expiration times and verification endpoints.

---

# 🔮 Future Improvements

Possible future improvements include:

* [ ] Password reset through email
* [ ] Resend verification email functionality
* [ ] Improved email delivery using a transactional email provider
* [ ] Better dashboard analytics
* [ ] More advanced resume customization
* [ ] Job application tracking
* [ ] Additional AI-powered career recommendations
* [ ] Interview performance analytics
* [ ] More resume templates
* [ ] Improved mobile responsiveness

---

# 👨‍💻 Author

**Prashant Kumar**

B.Tech Computer Science Engineering

Interested in:

* Software Development
* Full-Stack Development
* Artificial Intelligence
* Generative AI
* Data Structures & Algorithms

---

# ⭐ Contributing

Contributions, suggestions, and improvements are welcome.

If you find a bug or have an idea for improving InterviewPilot AI, feel free to open an issue or submit a pull request.

---

# 📄 License

This project is currently intended for educational and portfolio purposes.
