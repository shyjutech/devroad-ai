# DevRoad AI - AI-Powered Developer Roadmap Generator

<div align="center">
  <h3>🎯 Your Personalized Learning Roadmap, Powered by Gemini</h3>
  <p>Generate detailed, actionable developer roadmaps with curated resources based on your goals and experience level.</p>
</div>

## 🌟 Features

- **AI-Powered Roadmaps**: Uses Google Gemini 2.5 Pro to generate personalized learning paths
- **Multiple Categories**: DevOps, Flutter, React, Backend, AI/ML, Data Science
- **Experience-Based**: Tailored for Beginner, Intermediate, or Advanced learners
- **Structured Output**: Step-by-step learning path with resources, tools, projects, and timelines
- **Beautiful UI**: Modern, responsive design with dark mode support
- **Export Options**: Copy roadmap as text or export as JSON
- **Production-Ready**: Deployed on Firebase Hosting with Cloud Functions

## 🏗️ Tech Stack

- **Frontend**: React 18 + Vite + TailwindCSS
- **Backend**: Firebase Cloud Functions (Node.js 20)
- **AI**: Google Gemini 2.5 Pro / 1.5 Pro
- **Hosting**: Firebase Hosting
- **Security**: Firebase Secrets for API keys

## 📁 Project Structure

```
devroad/
├── functions/           # Firebase Cloud Functions
│   ├── index.js        # Gemini API integration
│   └── package.json
├── web/                # React frontend
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── Logo.jsx
│   │   │   ├── RoadmapForm.jsx
│   │   │   ├── RoadmapView.jsx
│   │   │   ├── AccordionSection.jsx
│   │   │   ├── ThemeToggle.jsx
│   │   │   └── actions/
│   │   │       └── CopyExport.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── firebase.json       # Firebase configuration
└── .firebaserc        # Firebase project ID
```

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ installed
- Firebase CLI: `npm i -g firebase-tools`
- Firebase account with a project created
- Google Gemini API key ([Get one here](https://aistudio.google.com/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd devroad
   ```

2. **Install dependencies**
   ```bash
   # Frontend
   cd web
   npm install
   npm install -D @vitejs/plugin-react
   
   # Backend
   cd ../functions
   npm install
   ```

3. **Configure Firebase**
   - Update `.firebaserc` with your Firebase project ID:
     ```json
     {
       "projects": {
         "default": "YOUR_PROJECT_ID"
       }
     }
     ```
   - Initialize Firebase (if not already done):
     ```bash
     firebase init hosting
     firebase init functions
     ```

4. **Set Gemini API Key**
   ```bash
   cd functions
   firebase functions:secrets:set GEMINI_API_KEY
   # Paste your Gemini API key when prompted
   ```

5. **Build and Deploy**
   ```bash
   # Build frontend
   cd ../web
   npm run build
   
   # Deploy everything
   cd ..
   firebase deploy
   ```

## 🧪 Local Development

### Option 1: With Firebase Emulators (Recommended)

1. **Start emulators**
   ```bash
   cd functions
   export GEMINI_API_KEY=YOUR_API_KEY  # Only needed for local dev
   firebase emulators:start --only functions,hosting
   ```

2. **Access the app**
   - Hosting: http://127.0.0.1:5002 (or port shown in terminal)
   - Functions: http://127.0.0.1:5001
   - Emulator UI: http://127.0.0.1:4000

### Option 2: Vite Dev Server (Mock Mode)

For frontend-only development without backend:

```bash
cd web
VITE_DISABLE_BACKEND=true npm run dev
```

Access: http://localhost:5173

## 🔐 Security Notes

✅ **Safe to Push to Public Repo**

- All secrets are stored in Firebase Secrets (not in code)
- `.firebaserc` only contains project ID (safe to share)
- No API keys or credentials in the repository
- `.gitignore` excludes sensitive files

**Important**: Never commit:
- `.env` files
- API keys in code
- `node_modules/`
- Build artifacts

## 📡 API Endpoint

### Generate Roadmap

**Endpoint**: `POST /api/generateRoadmap`

**Request Body**:
```json
{
  "category": "Flutter",
  "experience": "Beginner",
  "known_languages": "Dart, JavaScript",
  "goal": "Become a Flutter mobile app developer"
}
```

**Response**:
```json
{
  "overview": "...",
  "steps": [
    {
      "title": "Foundations",
      "details": "...",
      "resources": ["..."]
    }
  ],
  "tools": ["VS Code", "Flutter SDK"],
  "projects": ["Build a todo app", "Create a weather app"],
  "duration_weeks": 12,
  "bonus_tips": ["Join Flutter community", "..."]
}
```

## 🎨 Customization

### Update Categories

Edit `web/src/components/RoadmapForm.jsx`:
```javascript
const CATEGORIES = ['DevOps', 'Flutter', 'React', 'Backend', 'AI/ML', 'Data Science'];
```

### Update Experience Levels

Edit `web/src/components/RoadmapForm.jsx`:
```javascript
const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
```

### Change Gemini Model

Edit `functions/index.js`:
```javascript
const modelNames = ["gemini-2.5-pro", "gemini-1.5-pro", "gemini-1.5-flash", "gemini-pro"];
```

## 📝 Roadmap Schema

The AI generates roadmaps matching this JSON schema:

```typescript
{
  overview: string;
  steps: Array<{
    title: string;
    details: string;
    resources: string[];
  }>;
  tools: string[];
  projects: string[];
  duration_weeks: number;
  bonus_tips: string[];
}
```

## 🚨 Troubleshooting

### 401 Unauthorized Error

- Ensure Gemini API key is set: `firebase functions:secrets:set GEMINI_API_KEY`
- Verify API key has Generative Language API enabled in Google Cloud Console
- Check billing is enabled for your Firebase/GCP project

### 404 Model Not Found

- The function automatically tries fallback models: `gemini-2.5-pro` → `gemini-1.5-pro` → `gemini-1.5-flash` → `gemini-pro`
- Ensure your API key has access to at least one of these models

### Function Deployment Issues

- Ensure Firebase CLI is logged in: `firebase login`
- Check project ID in `.firebaserc` matches your Firebase project
- Verify Node.js version: Functions require Node.js 20

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a pull request.

## 📧 Support

For issues or questions, open an issue on GitHub.

---

**Built with ❤️ using React, TailwindCSS, Firebase, and Google Gemini AI**

