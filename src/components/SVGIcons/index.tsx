import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const VideoCallIcon: React.FC<IconProps> = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      d="M17 10.5V7C17 6.45 16.55 6 16 6H4C3.45 6 3 6.45 3 7V17C3 17.55 3.45 18 4 18H16C16.55 18 17 17.55 17 17V13.5L21 17.5V6.5L17 10.5Z" 
      fill={color}
    />
    <defs>
      <linearGradient id="videoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#667eea" />
        <stop offset="100%" stopColor="#764ba2" />
      </linearGradient>
    </defs>
  </svg>
);

export const MeetingIcon: React.FC<IconProps> = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="8" r="3" fill="url(#meetingGradient1)" />
    <path 
      d="M12 14C8.13 14 5 17.13 5 21H19C19 17.13 15.87 14 12 14Z" 
      fill="url(#meetingGradient1)"
    />
    <circle cx="18" cy="6" r="2" fill="url(#meetingGradient2)" />
    <path 
      d="M18 10C16.34 10 15 11.34 15 13H21C21 11.34 19.66 10 18 10Z" 
      fill="url(#meetingGradient2)"
    />
    <defs>
      <linearGradient id="meetingGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4facfe" />
        <stop offset="100%" stopColor="#00f2fe" />
      </linearGradient>
      <linearGradient id="meetingGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#43e97b" />
        <stop offset="100%" stopColor="#38f9d7" />
      </linearGradient>
    </defs>
  </svg>
);

export const CalendarIcon: React.FC<IconProps> = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" fill="url(#calendarGradient)" />
    <line x1="16" y1="2" x2="16" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <line x1="8" y1="2" x2="8" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <line x1="3" y1="10" x2="21" y2="10" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <defs>
      <linearGradient id="calendarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f093fb" />
        <stop offset="100%" stopColor="#f5576c" />
      </linearGradient>
    </defs>
  </svg>
);

export const DashboardIcon: React.FC<IconProps> = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="8" height="8" rx="2" fill="url(#dashGradient1)" />
    <rect x="13" y="3" width="8" height="8" rx="2" fill="url(#dashGradient2)" />
    <rect x="3" y="13" width="8" height="8" rx="2" fill="url(#dashGradient3)" />
    <rect x="13" y="13" width="8" height="8" rx="2" fill="url(#dashGradient4)" />
    <defs>
      <linearGradient id="dashGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#667eea" />
        <stop offset="100%" stopColor="#764ba2" />
      </linearGradient>
      <linearGradient id="dashGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4facfe" />
        <stop offset="100%" stopColor="#00f2fe" />
      </linearGradient>
      <linearGradient id="dashGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#43e97b" />
        <stop offset="100%" stopColor="#38f9d7" />
      </linearGradient>
      <linearGradient id="dashGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f093fb" />
        <stop offset="100%" stopColor="#f5576c" />
      </linearGradient>
    </defs>
  </svg>
);

export const UserIcon: React.FC<IconProps> = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="8" r="5" fill="url(#userGradient)" />
    <path 
      d="M20 21A8 8 0 0 0 4 21" 
      stroke="url(#userGradient)" 
      strokeWidth="2" 
      strokeLinecap="round" 
    />
    <defs>
      <linearGradient id="userGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#667eea" />
        <stop offset="100%" stopColor="#764ba2" />
      </linearGradient>
    </defs>
  </svg>
);

export const SettingsIcon: React.FC<IconProps> = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="3" fill="url(#settingsGradient)" />
    <path 
      d="M19.4 15C19.2 15.3 19.2 15.7 19.4 16L20.4 17.5C20.6 17.9 20.5 18.4 20.1 18.7L18.7 19.7C18.3 20 17.8 20 17.4 19.8L15.8 19C15.5 18.9 15.1 18.9 14.8 19.1C14.5 19.3 14.3 19.6 14.3 20V21.5C14.3 22 13.9 22.4 13.4 22.4H10.6C10.1 22.4 9.7 22 9.7 21.5V20C9.7 19.6 9.5 19.3 9.2 19.1C8.9 18.9 8.5 18.9 8.2 19L6.6 19.8C6.2 20 5.7 20 5.3 19.7L3.9 18.7C3.5 18.4 3.4 17.9 3.6 17.5L4.6 16C4.8 15.7 4.8 15.3 4.6 15L3.6 13.5C3.4 13.1 3.5 12.6 3.9 12.3L5.3 11.3C5.7 11 6.2 11 6.6 11.2L8.2 12C8.5 12.1 8.9 12.1 9.2 11.9C9.5 11.7 9.7 11.4 9.7 11V9.5C9.7 9 10.1 8.6 10.6 8.6H13.4C13.9 8.6 14.3 9 14.3 9.5V11C14.3 11.4 14.5 11.7 14.8 11.9C15.1 12.1 15.5 12.1 15.8 12L17.4 11.2C17.8 11 18.3 11 18.7 11.3L20.1 12.3C20.5 12.6 20.6 13.1 20.4 13.5L19.4 15Z" 
      fill="url(#settingsGradient)"
    />
    <defs>
      <linearGradient id="settingsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#43e97b" />
        <stop offset="100%" stopColor="#38f9d7" />
      </linearGradient>
    </defs>
  </svg>
);

export const LogoutIcon: React.FC<IconProps> = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      d="M16 17L21 12L16 7" 
      stroke="url(#logoutGradient)" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M21 12H9" 
      stroke="url(#logoutGradient)" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" 
      stroke="url(#logoutGradient)" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient id="logoutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f093fb" />
        <stop offset="100%" stopColor="#f5576c" />
      </linearGradient>
    </defs>
  </svg>
);

export const ThemeIcon: React.FC<IconProps> = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z" 
      fill="url(#themeGradient)"
    />
    <path 
      d="M12 3V21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" 
      fill="url(#themeGradient2)"
    />
    <defs>
      <linearGradient id="themeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#667eea" />
        <stop offset="100%" stopColor="#764ba2" />
      </linearGradient>
      <linearGradient id="themeGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4facfe" />
        <stop offset="100%" stopColor="#00f2fe" />
      </linearGradient>
    </defs>
  </svg>
);

export const CreateMeetingIcon: React.FC<IconProps> = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" fill="url(#createGradient)" />
    <path d="M12 8V16" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <path d="M8 12H16" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <defs>
      <linearGradient id="createGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#43e97b" />
        <stop offset="100%" stopColor="#38f9d7" />
      </linearGradient>
    </defs>
  </svg>
);

export const HeroIllustration: React.FC<IconProps> = ({ size = 400, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 400 400" fill="none" className={className}>
    {/* Background Circle */}
    <circle cx="200" cy="200" r="180" fill="url(#heroGradient1)" opacity="0.1" />
    <circle cx="200" cy="200" r="140" fill="url(#heroGradient2)" opacity="0.1" />
    <circle cx="200" cy="200" r="100" fill="url(#heroGradient3)" opacity="0.1" />
    
    {/* Main Video Screen */}
    <rect x="80" y="120" width="240" height="160" rx="20" fill="url(#screenGradient)" />
    <rect x="90" y="130" width="220" height="140" rx="15" fill="#1a1a2e" />
    
    {/* Video Participants */}
    <rect x="100" y="140" width="100" height="60" rx="8" fill="url(#participantGradient1)" />
    <rect x="210" y="140" width="100" height="60" rx="8" fill="url(#participantGradient2)" />
    <rect x="100" y="210" width="100" height="60" rx="8" fill="url(#participantGradient3)" />
    <rect x="210" y="210" width="100" height="60" rx="8" fill="url(#participantGradient4)" />
    
    {/* Control Buttons */}
    <circle cx="160" cy="310" r="20" fill="url(#buttonGradient1)" />
    <circle cx="200" cy="310" r="20" fill="url(#buttonGradient2)" />
    <circle cx="240" cy="310" r="20" fill="url(#buttonGradient3)" />
    
    {/* Floating Elements */}
    <circle cx="80" cy="80" r="8" fill="url(#floatingGradient1)" className="float-animation" />
    <circle cx="320" cy="100" r="6" fill="url(#floatingGradient2)" className="float-animation" style={{animationDelay: '1s'}} />
    <circle cx="350" cy="300" r="10" fill="url(#floatingGradient3)" className="float-animation" style={{animationDelay: '2s'}} />
    <circle cx="50" cy="320" r="7" fill="url(#floatingGradient4)" className="float-animation" style={{animationDelay: '0.5s'}} />
    
    <defs>
      <linearGradient id="heroGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#667eea" />
        <stop offset="100%" stopColor="#764ba2" />
      </linearGradient>
      <linearGradient id="heroGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4facfe" />
        <stop offset="100%" stopColor="#00f2fe" />
      </linearGradient>
      <linearGradient id="heroGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#43e97b" />
        <stop offset="100%" stopColor="#38f9d7" />
      </linearGradient>
      <linearGradient id="screenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2a2a4e" />
        <stop offset="100%" stopColor="#1a1a2e" />
      </linearGradient>
      <linearGradient id="participantGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#667eea" />
        <stop offset="100%" stopColor="#764ba2" />
      </linearGradient>
      <linearGradient id="participantGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4facfe" />
        <stop offset="100%" stopColor="#00f2fe" />
      </linearGradient>
      <linearGradient id="participantGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#43e97b" />
        <stop offset="100%" stopColor="#38f9d7" />
      </linearGradient>
      <linearGradient id="participantGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f093fb" />
        <stop offset="100%" stopColor="#f5576c" />
      </linearGradient>
      <linearGradient id="buttonGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#43e97b" />
        <stop offset="100%" stopColor="#38f9d7" />
      </linearGradient>
      <linearGradient id="buttonGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f093fb" />
        <stop offset="100%" stopColor="#f5576c" />
      </linearGradient>
      <linearGradient id="buttonGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#667eea" />
        <stop offset="100%" stopColor="#764ba2" />
      </linearGradient>
      <linearGradient id="floatingGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#667eea" />
        <stop offset="100%" stopColor="#764ba2" />
      </linearGradient>
      <linearGradient id="floatingGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4facfe" />
        <stop offset="100%" stopColor="#00f2fe" />
      </linearGradient>
      <linearGradient id="floatingGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#43e97b" />
        <stop offset="100%" stopColor="#38f9d7" />
      </linearGradient>
      <linearGradient id="floatingGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f093fb" />
        <stop offset="100%" stopColor="#f5576c" />
      </linearGradient>
    </defs>
  </svg>
);
