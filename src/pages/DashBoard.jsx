import React from "react";
import { EuiFlexGroup, EuiFlexItem, EuiText, EuiSpacer, EuiButton } from "@elastic/eui";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";

import { 
  MeetingIcon, 
  CalendarIcon, 
  CreateMeetingIcon,
  HeroIllustration 
} from "../components/SVGIcons";

function Dashboard() {
  useAuth();
  const navigate = useNavigate();

  const cardData = [
    {
      id: "create",
      icon: <CreateMeetingIcon size={48} />,
      title: "Create Meeting",
      description: "Start a new meeting and invite participants with advanced features and settings.",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      shadowColor: "rgba(67, 233, 123, 0.3)",
      route: "/create",
      delay: "0s"
    },
    {
      id: "mymeetings",
      icon: <MeetingIcon size={48} />,
      title: "My Meetings",
      description: "Manage and view all your scheduled meetings with detailed information and controls.",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      shadowColor: "rgba(79, 172, 254, 0.3)",
      route: "/mymeetings",
      delay: "0.2s"
    },
    {
      id: "meetings",
      icon: <CalendarIcon size={48} />,
      title: "Join Meetings",
      description: "Access meetings you're invited to and join ongoing video conferences seamlessly.",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      shadowColor: "rgba(240, 147, 251, 0.3)",
      route: "/meetings",
      delay: "0.4s"
    }
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `
          radial-gradient(ellipse at top left, rgba(102, 126, 234, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at top right, rgba(118, 75, 162, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at bottom left, rgba(79, 172, 254, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at bottom right, rgba(67, 233, 123, 0.15) 0%, transparent 50%),
          var(--bg-primary)
        `,
        position: "relative",
        overflow: "hidden",
        color: 'white',
      }}
    >
      {/* Animated background pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23667eea' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.5,
        }}
      />

      <Header />

      {/* Hero Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          padding: "4rem 2rem 2rem",
          position: "relative",
        }}
        className="hero-section"
      >
        <div
          style={{
            textAlign: "center",
            maxWidth: "800px",
            margin: "0 auto",
          }}
          className="fade-in-up"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "2rem",
            }}
            className="scale-in"
          >
            <HeroIllustration size={300} className="float-animation" />
          </div>

          <EuiText textAlign="center">
            <h1
              style={{
                fontSize: "3.5rem",
                fontWeight: "800",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: "1rem",
                lineHeight: "1.2",
              }}
              className="gradient-text"
            >
              Connect Beyond Boundaries
            </h1>
          </EuiText>

          <EuiSpacer size="m" />

          <EuiText textAlign="center">
            <p
              style={{
                fontSize: "1.25rem",
                color: "rgba(255, 255, 255, 0.8)",
                fontWeight: "400",
                lineHeight: "1.6",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Experience the future of video conferencing with crystal-clear quality, 
              seamless collaboration, and powerful features that bring teams together.
            </p>
          </EuiText>

          <EuiSpacer size="xl" />

          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <EuiButton
              fill
              size="l"
              onClick={() => navigate("/create")}
              style={{
                background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                border: "none",
                borderRadius: "12px",
                padding: "1rem 2rem",
                fontSize: "1.1rem",
                fontWeight: "600",
                boxShadow: "0 8px 32px rgba(67, 233, 123, 0.3)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(67, 233, 123, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(67, 233, 123, 0.3)";
              }}
            >
              Start Meeting Now
            </EuiButton>

            <EuiButton
              size="l"
              onClick={() => navigate("/meetings")}
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                padding: "1rem 2rem",
                fontSize: "1.1rem",
                fontWeight: "600",
                color: "white",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Join Meeting
            </EuiButton>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div
        style={{
          padding: "2rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <EuiText textAlign="center" style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "1rem",
            }}
          >
            Everything You Need
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              color: "rgba(255, 255, 255, 0.7)",
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            Powerful features designed to enhance your meeting experience
          </p>
        </EuiText>

        <EuiFlexGroup
          justifyContent="center"
          alignItems="stretch"
          gutterSize="xl"
          responsive={true}
        >
          {cardData.map((card, index) => (
            <EuiFlexItem key={card.id} style={{ maxWidth: "400px" }}>
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "20px",
                  padding: "2rem",
                  height: "100%",
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  overflow: "hidden",
                  animation: `fadeInUp 0.8s ease-out ${card.delay} both`,
                }}
                onClick={() => navigate(card.route)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-12px) scale(1.02)";
                  e.currentTarget.style.boxShadow = `0 20px 60px ${card.shadowColor}`;
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.1)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                }}
              >
                {/* Gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: card.gradient,
                    borderRadius: "20px 20px 0 0",
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      background: card.gradient,
                      borderRadius: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1.5rem",
                      boxShadow: `0 8px 32px ${card.shadowColor}`,
                    }}
                  >
                    {card.icon}
                  </div>

                  <EuiText>
                    <h3
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        color: "white",
                        marginBottom: "1rem",
                      }}
                    >
                      {card.title}
                    </h3>
                  </EuiText>

                  <EuiText>
                    <p
                      style={{
                        fontSize: "1rem",
                        color: "rgba(255, 255, 255, 0.8)",
                        lineHeight: "1.6",
                        flex: 1,
                      }}
                    >
                      {card.description}
                    </p>
                  </EuiText>

                  <div
                    style={{
                      marginTop: "1.5rem",
                      padding: "0.5rem 1rem",
                      background: "rgba(255, 255, 255, 0.05)",
                      borderRadius: "8px",
                      fontSize: "0.9rem",
                      color: "rgba(255, 255, 255, 0.9)",
                      fontWeight: "500",
                    }}
                  >
                    Click to explore →
                  </div>
                </div>
              </div>
          </EuiFlexItem>
          ))}
        </EuiFlexGroup>
      </div>

      <EuiSpacer size="xxl" />
    </div>
  );
}

export default Dashboard;