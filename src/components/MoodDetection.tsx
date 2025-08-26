import React, { useEffect, useState, useRef } from 'react';
import { EuiButton, EuiFlexGroup, EuiFlexItem, EuiText } from '@elastic/eui';

interface MoodDetectionProps {
  isEnabled: boolean;
  onMoodDetected: (mood: MoodState, confidence: number) => void;
}

interface MoodState {
  emotion: 'happy' | 'sad' | 'angry' | 'surprised' | 'neutral' | 'frustrated' | 'excited';
  intensity: number; // 0-1
  timestamp: number;
}

interface MoodAlert {
  id: string;
  userName: string;
  mood: MoodState;
  message: string;
  color: 'primary' | 'warning' | 'danger' | 'success';
  icon: string;
}

const MoodDetection: React.FC<MoodDetectionProps> = ({ isEnabled, onMoodDetected }) => {
  const [currentMood, setCurrentMood] = useState<MoodState | null>(null);
  const [moodAlerts, setMoodAlerts] = useState<MoodAlert[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock mood detection (in real implementation, you'd use face-api.js or similar)
  const detectMoodFromFrame = async (): Promise<MoodState | null> => {
    // Simulate AI mood detection
    const emotions = ['happy', 'sad', 'angry', 'surprised', 'neutral', 'frustrated', 'excited'] as const;
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    const intensity = Math.random();
    
    // Simulate realistic mood changes (less frequent dramatic changes)
    if (currentMood && Math.random() > 0.3) {
      return currentMood; // Keep current mood 70% of the time
    }

    return {
      emotion: randomEmotion,
      intensity,
      timestamp: Date.now()
    };
  };

  const getMoodMessage = (mood: MoodState, userName: string = 'Participant'): MoodAlert => {
    const messages = {
      happy: {
        message: `${userName} is feeling great! 😊`,
        color: 'success' as const,
        icon: '😊'
      },
      sad: {
        message: `${userName} seems down. Maybe check in on them? 😔`,
        color: 'warning' as const,
        icon: '😔'
      },
      angry: {
        message: `${userName} appears frustrated. Consider taking a break? 😠`,
        color: 'danger' as const,
        icon: '😠'
      },
      surprised: {
        message: `${userName} looks surprised! 😲`,
        color: 'primary' as const,
        icon: '😲'
      },
      frustrated: {
        message: `${userName} seems stressed. Time for a quick break? 😤`,
        color: 'warning' as const,
        icon: '😤'
      },
      excited: {
        message: `${userName} is excited and energetic! 🤩`,
        color: 'success' as const,
        icon: '🤩'
      },
      neutral: {
        message: `${userName} is focused and calm 😐`,
        color: 'primary' as const,
        icon: '😐'
      }
    };

    return {
      id: `mood-${Date.now()}`,
      userName,
      mood,
      ...messages[mood.emotion]
    };
  };

  const startMoodDetection = async () => {
    if (!isEnabled) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      // Start mood detection interval
      intervalRef.current = setInterval(async () => {
        const detectedMood = await detectMoodFromFrame();
        if (detectedMood) {
          setCurrentMood(detectedMood);
          onMoodDetected(detectedMood, detectedMood.intensity);

          // Show alert for significant mood changes
          if (detectedMood.emotion !== 'neutral' && detectedMood.intensity > 0.7) {
            const alert = getMoodMessage(detectedMood, 'You');
            setMoodAlerts(prev => [...prev.slice(-2), alert]); // Keep last 3 alerts

            // Auto-remove alert after 5 seconds
            setTimeout(() => {
              setMoodAlerts(prev => prev.filter(a => a.id !== alert.id));
            }, 5000);
          }
        }
      }, 2000); // Check every 2 seconds

    } catch (error) {
      console.error('Error accessing camera for mood detection:', error);
    }
  };

  const stopMoodDetection = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    if (isEnabled) {
      startMoodDetection();
    } else {
      stopMoodDetection();
    }

    return () => stopMoodDetection();
  }, [isEnabled]); // eslint-disable-line react-hooks/exhaustive-deps

  const dismissAlert = (alertId: string) => {
    setMoodAlerts(prev => prev.filter(a => a.id !== alertId));
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Hidden video element for mood detection */}
      <video
        ref={videoRef}
        style={{ display: 'none' }}
        width="320"
        height="240"
        autoPlay
        muted
      />
      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}
        width="320"
        height="240"
      />

      {/* Mood Alerts */}
      <div
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
          maxWidth: '350px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        {moodAlerts.map(alert => (
          <div
            key={alert.id}
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              padding: '16px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              animation: 'slideInRight 0.3s ease-out',
            }}
          >
            <EuiFlexGroup alignItems="center" gutterSize="s">
              <EuiFlexItem grow={false}>
                <div
                  style={{
                    fontSize: '24px',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${
                      alert.color === 'success' ? '#43e97b, #38f9d7' :
                      alert.color === 'warning' ? '#ffa726, #ff9800' :
                      alert.color === 'danger' ? '#f093fb, #f5576c' :
                      '#667eea, #764ba2'
                    })`,
                  }}
                >
                  {alert.icon}
                </div>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiText size="s" style={{ color: '#1e293b', fontWeight: 500 }}>
                  {alert.message}
                </EuiText>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButton
                  size="s"
                  color="text"
                  onClick={() => dismissAlert(alert.id)}
                  style={{ minWidth: 'auto', padding: '4px 8px' }}
                >
                  ✕
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </div>
        ))}
      </div>

      {/* Current Mood Indicator */}
      {currentMood && isEnabled && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '12px 16px',
            color: 'white',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 1000,
          }}
        >
          <div style={{ fontSize: '18px' }}>
            {getMoodMessage(currentMood).icon}
          </div>
          <span>
            Mood: {currentMood.emotion} ({Math.round(currentMood.intensity * 100)}%)
          </span>
        </div>
      )}

      <style>
        {`
          @keyframes slideInRight {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default MoodDetection;
