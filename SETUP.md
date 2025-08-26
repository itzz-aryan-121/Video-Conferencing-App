# 🚀 Boom - Video Conferencing App Setup Guide

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- ZegoCloud account
- Firebase account

## 🔧 Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```env
   # ZegoCloud Configuration
   REACT_APP_ZEGOCLOUD_APP_ID=your_app_id_here
   REACT_APP_ZEGOCLOUD_SERVER_SECRET=your_server_secret_here
   
   # Application Host
   REACT_APP_HOST=http://localhost:3000
   ```

## 🎯 Getting ZegoCloud Credentials

1. **Sign up at [ZegoCloud Console](https://console.zegocloud.com/)**
2. **Create a new project**
3. **Get your App ID and Server Secret from the project dashboard**
4. **Add them to your `.env` file**

## 🔥 Firebase Setup

Make sure your Firebase configuration is properly set up in `src/utils/FirebaseConfig.ts`.

## 🎨 Features Included

✨ **Modern UI/UX:**
- Glass morphism design
- Smooth animations
- Dark/Light theme support
- Responsive design

🎤 **Advanced Meeting Features:**
- Real-time voice activity indicators
- AI-powered mood detection
- Custom SVG icons and illustrations
- Enhanced video conference experience

🤖 **AI Mood Detection:**
- Real-time facial emotion recognition
- Mood alerts for participants
- Customizable mood notifications
- Privacy-focused design

## 🚀 Running the Application

```bash
npm start
```

The app will open at `http://localhost:3000`

## 🎯 Usage

1. **Login** with Google or email/password
2. **Create meetings** with advanced settings
3. **Join meetings** with enhanced video experience
4. **Enable AI mood detection** for better collaboration
5. **Enjoy voice indicators** and modern UI

## 🛠️ Troubleshooting

- **Build errors**: Make sure TypeScript version is compatible
- **Meeting not loading**: Check ZegoCloud credentials
- **Camera/microphone issues**: Ensure browser permissions are granted

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

---

**Made with ❤️ - Your video conferencing experience just got a major upgrade!**
