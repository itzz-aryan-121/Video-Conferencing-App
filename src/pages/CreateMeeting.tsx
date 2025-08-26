import { EuiFlexGroup, EuiFlexItem, EuiText, EuiSpacer, EuiButton } from "@elastic/eui";
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";

// Custom SVG Icons
const OneOnOneIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="oneOnOneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#667eea" />
        <stop offset="100%" stopColor="#764ba2" />
      </linearGradient>
    </defs>
    <circle cx="25" cy="25" r="12" fill="url(#oneOnOneGradient)" />
    <circle cx="55" cy="25" r="12" fill="url(#oneOnOneGradient)" />
    <path d="M15 45 C15 35, 35 35, 35 45" stroke="url(#oneOnOneGradient)" strokeWidth="3" fill="none" />
    <path d="M45 45 C45 35, 65 35, 65 45" stroke="url(#oneOnOneGradient)" strokeWidth="3" fill="none" />
    <line x1="35" y1="40" x2="45" y2="40" stroke="url(#oneOnOneGradient)" strokeWidth="3" />
  </svg>
);

const VideoConferenceIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="videoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f093fb" />
        <stop offset="100%" stopColor="#f5576c" />
      </linearGradient>
    </defs>
    <circle cx="25" cy="25" r="10" fill="url(#videoGradient)" />
    <circle cx="55" cy="25" r="10" fill="url(#videoGradient)" />
    <circle cx="40" cy="45" r="10" fill="url(#videoGradient)" />
    <path d="M15 55 C15 45, 35 45, 35 55" stroke="url(#videoGradient)" strokeWidth="2.5" fill="none" />
    <path d="M45 55 C45 45, 65 45, 65 55" stroke="url(#videoGradient)" strokeWidth="2.5" fill="none" />
    <path d="M30 60 C30 50, 50 50, 50 60" stroke="url(#videoGradient)" strokeWidth="2.5" fill="none" />
    <line x1="35" y1="50" x2="45" y2="50" stroke="url(#videoGradient)" strokeWidth="2.5" />
    <line x1="25" y1="55" x2="35" y2="55" stroke="url(#videoGradient)" strokeWidth="2.5" />
    <line x1="45" y1="55" x2="55" y2="55" stroke="url(#videoGradient)" strokeWidth="2.5" />
  </svg>
);

export default function CreateMeeting() {
  useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          display: "flex",
          height: "100vh",
          flexDirection: "column",
          background: "var(--bg-primary)",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Animated Background */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)",
            zIndex: 0
          }}
        />
        
        {/* Floating Elements */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "10%",
            width: "100px",
            height: "100px",
            background: "var(--glass-bg)",
            borderRadius: "50%",
            filter: "blur(40px)",
            animation: "float-animation 6s ease-in-out infinite",
            zIndex: 0
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "60%",
            right: "15%",
            width: "150px",
            height: "150px",
            background: "var(--glass-bg)",
            borderRadius: "50%",
            filter: "blur(50px)",
            animation: "float-animation 8s ease-in-out infinite reverse",
            zIndex: 0
          }}
        />

        <Header />
        
        <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "2rem" }}>
          {/* Hero Section */}
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <EuiText>
              <h1 style={{ 
                fontSize: "3rem", 
                fontWeight: "700", 
                background: "var(--primary-gradient)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "1rem",
                textShadow: "0 4px 8px rgba(0,0,0,0.3)"
              }}>
                Create Your Meeting
              </h1>
              <p style={{ 
                fontSize: "1.2rem", 
                color: "var(--text-secondary)",
                maxWidth: "600px",
                margin: "0 auto"
              }}>
                Choose the perfect meeting format for your needs. From intimate one-on-one conversations to dynamic group conferences.
              </p>
            </EuiText>
          </div>

          <EuiFlexGroup 
            justifyContent="center" 
            alignItems="center"
            gutterSize="xl"
            style={{ maxWidth: "1000px", width: "100%" }}
          >
            <EuiFlexItem>
              <div
                onClick={() => navigate("/create1on1")}
                style={{
                  background: "var(--glass-bg)",
                  border: "var(--glass-border)",
                  borderRadius: "var(--radius-xl)",
                  padding: "3rem 2rem",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "var(--shadow-lg)",
                  backdropFilter: "blur(20px)",
                  position: "relative",
                  overflow: "hidden"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                  e.currentTarget.style.boxShadow = "var(--shadow-2xl)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                }}
              >
                {/* Hover Effect */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    pointerEvents: "none"
                  }}
                  className="hover-overlay"
                />
                
                <div style={{ marginBottom: "2rem" }}>
                  <OneOnOneIcon />
                </div>
                
                <EuiText>
                  <h2 style={{ 
                    fontSize: "1.8rem", 
                    fontWeight: "600", 
                    color: "var(--text-primary)",
                    marginBottom: "1rem"
                  }}>
                    Create 1 on 1 Meeting
                  </h2>
                  <p style={{ 
                    fontSize: "1rem", 
                    color: "var(--text-secondary)",
                    lineHeight: "1.6"
                  }}>
                    Perfect for personal conversations, interviews, or focused discussions with a single participant.
                  </p>
                </EuiText>
                
                <EuiSpacer size="l" />
                
                <EuiButton
                  fill
                  style={{
                    background: "var(--primary-gradient)",
                    border: "none",
                    borderRadius: "var(--radius-lg)",
                    padding: "0.75rem 2rem",
                    fontSize: "1rem",
                    fontWeight: "600"
                  }}
                >
                  Start 1-on-1 Meeting
                </EuiButton>
              </div>
            </EuiFlexItem>

            <EuiFlexItem>
              <div
                onClick={() => navigate("/videoconference")}
                style={{
                  background: "var(--glass-bg)",
                  border: "var(--glass-border)",
                  borderRadius: "var(--radius-xl)",
                  padding: "3rem 2rem",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "var(--shadow-lg)",
                  backdropFilter: "blur(20px)",
                  position: "relative",
                  overflow: "hidden"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                  e.currentTarget.style.boxShadow = "var(--shadow-2xl)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                }}
              >
                {/* Hover Effect */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "linear-gradient(135deg, rgba(240, 147, 251, 0.1) 0%, rgba(245, 87, 108, 0.1) 100%)",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    pointerEvents: "none"
                  }}
                  className="hover-overlay"
                />
                
                <div style={{ marginBottom: "2rem" }}>
                  <VideoConferenceIcon />
                </div>
                
                <EuiText>
                  <h2 style={{ 
                    fontSize: "1.8rem", 
                    fontWeight: "600", 
                    color: "var(--text-primary)",
                    marginBottom: "1rem"
                  }}>
                    Create Video Conference
                  </h2>
                  <p style={{ 
                    fontSize: "1rem", 
                    color: "var(--text-secondary)",
                    lineHeight: "1.6"
                  }}>
                    Ideal for team meetings, presentations, and collaborative sessions with multiple participants.
                  </p>
                </EuiText>
                
                <EuiSpacer size="l" />
                
                <EuiButton
                  fill
                  style={{
                    background: "var(--secondary-gradient)",
                    border: "none",
                    borderRadius: "var(--radius-lg)",
                    padding: "0.75rem 2rem",
                    fontSize: "1rem",
                    fontWeight: "600"
                  }}
                >
                  Start Video Conference
                </EuiButton>
              </div>
            </EuiFlexItem>
          </EuiFlexGroup>
        </div>
      </div>
    </>
  );
}