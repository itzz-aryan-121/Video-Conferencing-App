import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { onAuthStateChanged } from "firebase/auth";
import { getDocs, query, where } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useToast from "../hooks/useToast";
import { firebaseAuth, meetingsRef } from "../utils/FirebaseConfig";
import { generateMeetingID } from "../utils/generateMeetingId";

import VoiceIndicator from "../components/VoiceIndicator";
import { EuiFlexGroup, EuiFlexItem, EuiText, EuiPanel, EuiButton } from "@elastic/eui";

// Custom SVG Icons
const MeetingRoomIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="meetingRoomGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#667eea" />
        <stop offset="100%" stopColor="#764ba2" />
      </linearGradient>
    </defs>
    <rect x="8" y="12" width="24" height="16" rx="2" fill="url(#meetingRoomGradient)" opacity="0.8" />
    <circle cx="16" cy="20" r="2" fill="white" />
    <circle cx="24" cy="20" r="2" fill="white" />
    <path d="M12 28 L28 28" stroke="url(#meetingRoomGradient)" strokeWidth="2" fill="none" />
  </svg>
);

const VoiceWaveIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="voiceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4facfe" />
        <stop offset="100%" stopColor="#00f2fe" />
      </linearGradient>
    </defs>
    <path d="M12 2 L12 8" stroke="url(#voiceGradient)" strokeWidth="2" fill="none" />
    <path d="M8 6 L8 10" stroke="url(#voiceGradient)" strokeWidth="2" fill="none" />
    <path d="M16 6 L16 10" stroke="url(#voiceGradient)" strokeWidth="2" fill="none" />
    <path d="M4 10 L4 14" stroke="url(#voiceGradient)" strokeWidth="2" fill="none" />
    <path d="M20 10 L20 14" stroke="url(#voiceGradient)" strokeWidth="2" fill="none" />
    <path d="M12 10 L12 18" stroke="url(#voiceGradient)" strokeWidth="2" fill="none" />
  </svg>
);

export default function JoinMeeting() {
  const params = useParams();
  const navigate = useNavigate();
  const [createToast] = useToast();
  const [isAllowed, setIsAllowed] = useState(false);
  const [user, setUser] = useState<any>(undefined);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [meetingStarted, setMeetingStarted] = useState(false);
  const [overlayHidden, setOverlayHidden] = useState(false);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
    }
  });

  useEffect(() => {
    const getMeetingData = async () => {
      if (params.id && user) { // Only run when user is loaded
        const firestoreQuery = query(
          meetingsRef,
          where("meetingId", "==", params.id)
        );
        const fetchedMeetings = await getDocs(firestoreQuery);
        if (fetchedMeetings.docs.length) {
          const meeting = fetchedMeetings.docs[0].data();
          const isCreator = meeting.createdBy === user.uid;
          
          // Check meeting date first
          const meetingDate = moment(meeting.meetingDate, "L");
          const today = moment().startOf('day');
          
          if (meetingDate.isBefore(today)) {
            navigate("/");
            createToast({
              title: "Meeting has ended",
              type: "danger",
            });
            return;
          }
          
          if (meetingDate.isAfter(today)) {
            navigate("/");
            createToast({
              title: `Meeting is scheduled for ${meeting.meetingDate}`,
              type: "warning",
            });
            return;
          }
          
          // Now check permissions
          if (meeting.meetingType === "anyone-can-join") {
            setIsAllowed(true);
          } else if (isCreator) {
            setIsAllowed(true);
          } else {
            const index = meeting.invitedUsers.findIndex(
              (invitedUser: string) => invitedUser === user.uid
            );
            if (index !== -1) {
              setIsAllowed(true);
            } else {
              navigate("/");
              createToast({
                title: "You are not invited to the meeting",
                type: "danger",
              });
            }
          }
        } else {
          navigate("/");
          createToast({
            title: "Meeting not found",
            type: "danger",
          });
        }
      }
    };
    getMeetingData();
  }, [params.id, user, navigate, createToast]);

  const detectVoiceActivity = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const analyser = audioContext.createAnalyser();
          const microphone = audioContext.createMediaStreamSource(stream);
          const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

          analyser.smoothingTimeConstant = 0.8;
          analyser.fftSize = 1024;

          microphone.connect(analyser);
          analyser.connect(scriptProcessor);
          scriptProcessor.connect(audioContext.destination);

          scriptProcessor.onaudioprocess = () => {
            const array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            const values = array.reduce((a, b) => a + b) / array.length;
            setIsVoiceActive(values > 50);
          };
        })
        .catch((err) => {
          console.log("Error accessing microphone:", err);
        });
    }
  };



  const myMeeting = async (element: any) => {
    // Check if environment variables are configured
    if (!process.env.REACT_APP_ZEGOCLOUD_APP_ID || !process.env.REACT_APP_ZEGOCLOUD_SERVER_SECRET) {
      console.error("ZegoCloud credentials not configured!");
      createToast({
        title: "Configuration Error - Check .env file",
        type: "danger",
      });
      return;
    }

    try {
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        parseInt(process.env.REACT_APP_ZEGOCLOUD_APP_ID!),
        process.env.REACT_APP_ZEGOCLOUD_SERVER_SECRET as string,
        params.id as string,
        user?.uid ? user.uid : generateMeetingID(),
        user?.displayName ? user.displayName : generateMeetingID()
      );
      
      console.log("Generated kit token:", kitToken ? "Success" : "Failed");
      
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      
      if (!zp) {
        throw new Error("Failed to create ZegoUIKit instance");
      }

      zp?.joinRoom({
        container: element,
        maxUsers: 50,
        sharedLinks: [
          {
            name: "Personal link",
            url: window.location.origin,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
        onJoinRoom: () => {
          console.log("Successfully joined room");
          // Hide loading overlay when meeting starts
          const loader = document.getElementById('meeting-loader');
          if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
              loader.style.display = 'none';
              setMeetingStarted(true);
              setOverlayHidden(true);
              detectVoiceActivity();
            }, 200);
          }
        },
      });

      // Fallback: Hide overlay after 10 seconds if callback doesn't fire
      setTimeout(() => {
        if (!overlayHidden) {
          console.log("Fallback: Hiding overlay after timeout");
          const loader = document.getElementById('meeting-loader');
          if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
              loader.style.display = 'none';
              setMeetingStarted(true);
              setOverlayHidden(true);
              detectVoiceActivity();
            }, 500);
          }
        }
      }, 10000);
    } catch (error) {
      console.error("Error setting up meeting:", error);
      createToast({
        title: "Setup Error - Check configuration",
        type: "danger",
      });
    }
  };

  return isAllowed ? (
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
          background: "radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(79, 172, 254, 0.1) 0%, transparent 50%)",
          zIndex: 0
        }}
      />

      {/* Loading Overlay */}
      <div
        id="meeting-loader"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "var(--glass-bg)",
          backdropFilter: "blur(20px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10,
          transition: "opacity 0.5s ease"
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ marginBottom: "2rem" }}>
            <MeetingRoomIcon />
          </div>
          <EuiText>
            <h2 style={{ 
              background: "var(--primary-gradient)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "1rem"
            }}>
              Joining Meeting...
            </h2>
            <p style={{ color: "var(--text-secondary)" }}>
              Please wait while we connect you to the meeting room
            </p>
          </EuiText>
          
          {/* Manual override button */}
          <div style={{ marginTop: "2rem" }}>
            <EuiButton
              size="s"
              color="primary"
              fill
              onClick={() => {
                const loader = document.getElementById('meeting-loader');
                if (loader) {
                  loader.style.opacity = '0';
                  setTimeout(() => {
                    loader.style.display = 'none';
                    setMeetingStarted(true);
                    setOverlayHidden(true);
                    detectVoiceActivity();
                  }, 500);
                }
              }}
              style={{
                borderRadius: "var(--radius-md)"
              }}
            >
              Continue to Meeting
            </EuiButton>
          </div>
        </div>
      </div>

      {/* Meeting Controls Panel */}
      {meetingStarted && (
        <div
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            zIndex: 5,
            background: "var(--glass-bg)",
            border: "var(--glass-border)",
            borderRadius: "var(--radius-lg)",
            backdropFilter: "blur(20px)",
            padding: "1rem",
            boxShadow: "var(--shadow-lg)"
          }}
        >
          <EuiFlexGroup direction="column" gutterSize="s">
            <EuiFlexItem>
              <EuiPanel
                style={{
                  background: "transparent",
                  border: "none",
                  padding: "0.5rem"
                }}
              >
                <EuiFlexGroup alignItems="center" gutterSize="s">
                  <EuiFlexItem grow={false}>
                    <VoiceWaveIcon />
                  </EuiFlexItem>
                  <EuiFlexItem>
                    <EuiText size="s" style={{ color: "var(--text-secondary)" }}>
                      Voice Activity
                    </EuiText>
                  </EuiFlexItem>
                  <EuiFlexItem grow={false}>
                    <VoiceIndicator isActive={isVoiceActive} />
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiPanel>
            </EuiFlexItem>



            <EuiFlexItem>
              <EuiButton
                size="s"
                color="danger"
                fill
                onClick={() => navigate("/")}
                style={{
                  width: "100%",
                  borderRadius: "var(--radius-md)"
                }}
              >
                Leave Meeting
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        </div>
      )}

      {/* Main Meeting Container */}
      <div
        ref={(element) => {
          if (element) {
            myMeeting(element);
          }
        }}
        style={{
          flex: 1,
          position: "relative",
          zIndex: 1,
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          margin: "1rem",
          background: "var(--glass-bg)",
          border: "var(--glass-border)",
          backdropFilter: "blur(10px)"
        }}
      />


    </div>
  ) : (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        background: "var(--bg-primary)"
      }}
    >
      <EuiText>
        <h2>Loading...</h2>
      </EuiText>
    </div>
  );
}