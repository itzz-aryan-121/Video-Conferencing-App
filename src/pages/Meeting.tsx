import {
    EuiBadge,
    EuiBasicTable,
    EuiButtonIcon,
    EuiCopy,
    EuiFlexGroup,
    EuiFlexItem,
    EuiPanel,
    EuiText,
    EuiTitle,
  } from "@elastic/eui";
  
  import { getDocs, query } from "firebase/firestore";
  import moment from "moment";
  import React, { useEffect, useState } from "react";
  import { Link } from "react-router-dom";
  import { useAppSelector } from "../app/hooks";
  import Header from "../components/Header";
  import useAuth from "../hooks/useAuth";
  
  import { meetingsRef } from "../utils/FirebaseConfig";
  import { MeetingType } from "../utils/types";

// Custom SVG Icon
const AllMeetingsIcon = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="allMeetingsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a8edea" />
        <stop offset="100%" stopColor="#fed6e3" />
      </linearGradient>
    </defs>
    <circle cx="25" cy="25" r="20" fill="url(#allMeetingsGradient)" opacity="0.3" />
    <circle cx="20" cy="20" r="3" fill="url(#allMeetingsGradient)" />
    <circle cx="30" cy="20" r="3" fill="url(#allMeetingsGradient)" />
    <circle cx="25" cy="30" r="3" fill="url(#allMeetingsGradient)" />
    <path d="M15 35 C15 30, 35 30, 35 35" stroke="url(#allMeetingsGradient)" strokeWidth="2" fill="none" />
  </svg>
);
  
  export default function Meeting() {
    useAuth();
    const userInfo = useAppSelector((zoom) => zoom.auth.userInfo);
    const [meetings, setMeetings] = useState<Array<MeetingType>>([]);
  
    useEffect(() => {
      const getMyMeetings = async () => {
        const firestoreQuery = query(meetingsRef);
        const fetchedMeetings = await getDocs(firestoreQuery);
        if (fetchedMeetings.docs.length) {
          const myMeetings: Array<MeetingType> = [];
          fetchedMeetings.forEach((meeting) => {
            const data = meeting.data() as MeetingType;
            if (data.createdBy === userInfo?.uid)
              myMeetings.push(meeting.data() as MeetingType);
            else if (data.meetingType === "anyone-can-join")
              myMeetings.push(meeting.data() as MeetingType);
            else {
              const index = data.invitedUsers.findIndex(
                (user: string) => user === userInfo?.uid
              );
              if (index !== -1) {
                myMeetings.push(meeting.data() as MeetingType);
              }
            }
          });
  
          setMeetings(myMeetings);
        }
      };
      if (userInfo) getMyMeetings();
    }, [userInfo]);
  
    const meetingColumns = [
      {
        field: "meetingName",
        name: "Meeting Name",
        render: (meetingName: string) => (
          <EuiText style={{ fontWeight: "600", color: "var(--text-primary)" }}>
            {meetingName}
          </EuiText>
        ),
      },
      {
        field: "meetingType",
        name: "Meeting Type",
        render: (meetingType: string) => (
          <EuiBadge 
            color={meetingType === "1-on-1" ? "primary" : meetingType === "video-conference" ? "secondary" : "accent"}
            style={{ fontWeight: "500" }}
          >
            {meetingType === "1-on-1" ? "1-on-1" : meetingType === "video-conference" ? "Video Conference" : "Open Meeting"}
          </EuiBadge>
        ),
      },
      {
        field: "meetingDate",
        name: "Meeting Date",
        render: (meetingDate: string) => (
          <EuiText style={{ color: "var(--text-secondary)" }}>
            {moment(meetingDate).format("MMM DD, YYYY")}
          </EuiText>
        ),
      },
      {
        field: "",
        name: "Status",
        render: (meeting: MeetingType) => {
          if (meeting.status) {
            if (meeting.meetingDate === moment().format("L")) {
              return (
                <EuiBadge 
                  color="success"
                  style={{ fontWeight: "600" }}
                >
                  <Link
                    to={`/join/${meeting.meetingId}`}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Join Now
                  </Link>
                </EuiBadge>
              );
            } else if (
              moment(meeting.meetingDate).isBefore(moment().format("L"))
            ) {
              return <EuiBadge color="default" style={{ fontWeight: "500" }}>Ended</EuiBadge>;
            } else if (moment(meeting.meetingDate).isAfter()) {
              return <EuiBadge color="primary" style={{ fontWeight: "500" }}>Upcoming</EuiBadge>;
            }
          } else return <EuiBadge color="danger" style={{ fontWeight: "500" }}>Cancelled</EuiBadge>;
        },
      },
      {
        field: "meetingId",
        name: "Copy Link",
        width: "10%",
        render: (meetingId: string) => {
          return (
            <EuiCopy
              textToCopy={`${process.env.REACT_APP_HOST}/join/${meetingId}`}
            >
              {(copy: any) => (
                <EuiButtonIcon
                  iconType="copy"
                  onClick={copy}
                  display="base"
                  aria-label="meeting-copy"
                  color="primary"
                />
              )}
            </EuiCopy>
          );
        },
      },
    ];
  
    return (
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
            background: "radial-gradient(circle at 30% 70%, rgba(168, 237, 234, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(254, 214, 227, 0.1) 0%, transparent 50%)",
            zIndex: 0
          }}
        />

        <Header />
        
        <div style={{ 
          position: "relative", 
          zIndex: 1, 
          flex: 1, 
          padding: "2rem",
          overflow: "auto"
        }}>
          <EuiFlexGroup justifyContent="center" style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <EuiFlexItem>
              <EuiPanel
                style={{
                  background: "var(--glass-bg)",
                  border: "var(--glass-border)",
                  borderRadius: "var(--radius-xl)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "var(--shadow-xl)",
                  padding: "2rem"
                }}
              >
                {/* Header Section */}
                <div style={{ display: "flex", alignItems: "center", marginBottom: "2rem" }}>
                  <div style={{ marginRight: "1rem" }}>
                    <AllMeetingsIcon />
                  </div>
                  <div>
                    <EuiTitle size="l">
                      <h1 style={{ 
                        background: "var(--success-gradient)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        margin: 0
                      }}>
                        All Meetings
                      </h1>
                    </EuiTitle>
                    <EuiText style={{ color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                      View and join all available meetings
                    </EuiText>
                  </div>
                </div>

                {meetings.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "3rem" }}>
                    <EuiText style={{ color: "var(--text-secondary)" }}>
                      <h3>No meetings available</h3>
                      <p>Create a meeting or wait for invitations to join meetings!</p>
                    </EuiText>
                  </div>
                ) : (
                  <EuiBasicTable 
                    items={meetings} 
                    columns={meetingColumns}
                    style={{
                      "--euiTableBackgroundColor": "transparent",
                      "--euiTableBorderColor": "var(--glass-border)",
                      "--euiTableHeaderBackgroundColor": "rgba(255, 255, 255, 0.05)",
                      "--euiTableRowHoverBackgroundColor": "rgba(255, 255, 255, 0.02)"
                    } as React.CSSProperties}
                  />
                )}
              </EuiPanel>
            </EuiFlexItem>
          </EuiFlexGroup>
        </div>
      </div>
    );
  }