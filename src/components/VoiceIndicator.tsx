import React from 'react';

interface VoiceIndicatorProps {
  isActive: boolean;
  size?: 'small' | 'medium' | 'large';
}

const VoiceIndicator: React.FC<VoiceIndicatorProps> = ({ isActive, size = 'medium' }) => {
  const sizeMap = {
    small: { width: 20, height: 20, barWidth: 2, barGap: 2 },
    medium: { width: 30, height: 30, barWidth: 3, barGap: 3 },
    large: { width: 40, height: 40, barWidth: 4, barGap: 4 }
  };

  const { width, height, barWidth, barGap } = sizeMap[size];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: barGap,
        width: width,
        height: height,
        padding: '4px',
        borderRadius: '50%',
        background: isActive 
          ? 'linear-gradient(135deg, rgba(79, 172, 254, 0.2) 0%, rgba(0, 242, 254, 0.2) 100%)'
          : 'transparent',
        border: isActive 
          ? '1px solid rgba(79, 172, 254, 0.3)'
          : '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.3s ease',
        animation: isActive ? 'voicePulse 1.5s ease-in-out infinite' : 'none'
      }}
      className={`voice-indicator ${isActive ? 'active' : 'inactive'}`}
    >
      {[1, 2, 3].map((bar) => (
        <div
          key={bar}
          style={{
            width: barWidth,
            height: isActive ? `${Math.random() * 60 + 40}%` : '30%',
            background: isActive 
              ? 'linear-gradient(180deg, #4facfe 0%, #00f2fe 100%)'
              : 'rgba(255, 255, 255, 0.3)',
            borderRadius: barWidth / 2,
            transition: 'all 0.2s ease',
            animation: isActive 
              ? `voiceWave ${0.5 + Math.random() * 0.5}s ease-in-out infinite`
              : 'none',
            animationDelay: `${bar * 0.1}s`
          }}
          className={`voice-bar voice-bar-${bar}`}
        />
      ))}
    </div>
  );
};

export default VoiceIndicator;
