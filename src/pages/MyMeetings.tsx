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
  import { getDocs, query, where } from "firebase/firestore";
  import moment from "moment";
  import React, { useEffect, useState, useCallback } from "react";
  import { Link } from "react-router-dom";
  import { useAppSelector } from "../app/hooks";
  import EditFlyout from "../components/EditFlyout";
  import Header from "../components/Header";
  import useAuth from "../hooks/useAuth";
  import { meetingsRef } from "../utils/FirebaseConfig";
  import { MeetingType } from "../utils/types";

// Custom SVG Icon
const MyMeetingsIcon = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="meetingsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4facfe" />
        <stop offset="100%" stopColor="#00f2fe" />
      </linearGradient>
    </defs>
    <rect x="8" y="8" width="34" height="34" rx="4" fill="url(#meetingsGradient)" opacity="0.2" />
    <rect x="12" y="12" width="26" height="26" rx="2" fill="url(#meetingsGradient)" />
    <path d="M18 20 L22 24 L32 14" stroke="white" strokeWidth="2" fill="none" />
    <path d="M18 28 L22 32 L32 22" stroke="white" strokeWidth="2" fill="none" />
  </svg>
);
  
  export default function MyMeetings() {
    useAuth();
    const userInfo = useAppSelector((zoom) => zoom.auth.userInfo);
    const [meetings, setMeetings] = useState<Array<MeetingType>>([]);
    const [showEditFlyout, setShowEditFlyout] = useState(false);
    const [editMeeting, setEditMeeting] = useState<MeetingType>();
    
    const getMyMeetings = useCallback(async () => {
      const firestoreQuery = query(
        meetingsRef,
        where("createdBy", "==", userInfo?.uid)
      );
      const fetchedMeetings = await getDocs(firestoreQuery);
      if (fetchedMeetings.docs.length) {
        const myMeetings: Array<MeetingType> = [];
        fetchedMeetings.forEach((meeting) => {
          myMeetings.push({
            docId: meeting.id,
            ...(meeting.data() as MeetingType),
          });
        });
        setMeetings(myMeetings);
      }
    }, [userInfo?.uid]);
    
    useEffect(() => {
      if (userInfo) getMyMeetings();
    }, [userInfo, getMyMeetings]);
  
    const openEditFlyout = (meeting: MeetingType) => {
      setShowEditFlyout(true);
      setEditMeeting(meeting);
    };
  
    const closeEditFlyout = (dataChanged = false) => {
      setShowEditFlyout(false);
      setEditMeeting(undefined);
      if (dataChanged) getMyMeetings();
    };
  
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
            color={meetingType === "1-on-1" ? "primary" : "secondary"}
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
        field: "",
        name: "Edit",
        width: "5%",
        render: (meeting: MeetingType) => {
          return (
            <EuiButtonIcon
              aria-label="meeting-edit"
              iconType="indexEdit"
              color="primary"
              display="base"
              isDisabled={
                moment(meeting.meetingDate).isBefore(moment().format("L")) ||
                !meeting.status
              }
              onClick={() => openEditFlyout(meeting)}
              style={{
                opacity: (moment(meeting.meetingDate).isBefore(moment().format("L")) || !meeting.status) ? 0.3 : 1
              }}
            />
          );
        },
      },
      {
        field: "meetingId",
        name: "Copy Link",
        width: "5%",
        render: (meetingId: string) => {
          return (
            <EuiCopy
              textToCopy={`${process.env.VITE_HOST || window.location.origin}/join/${meetingId}`}
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
            background: "radial-gradient(circle at 20% 80%, rgba(79, 172, 254, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0, 242, 254, 0.1) 0%, transparent 50%)",
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
                    <MyMeetingsIcon />
                  </div>
                  <div>
                    <EuiTitle size="l">
                      <h1 style={{ 
                        background: "var(--accent-gradient)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        margin: 0
                      }}>
                        My Meetings
                      </h1>
                    </EuiTitle>
                    <EuiText style={{ color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                      Manage and track all your created meetings
                    </EuiText>
                  </div>
                </div>

                {meetings.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "3rem" }}>
                    <EuiText style={{ color: "var(--text-secondary)" }}>
                      <h3>No meetings created yet</h3>
                      <p>Create your first meeting to get started!</p>
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
        
        {showEditFlyout && (
          <EditFlyout closeFlyout={closeEditFlyout} meeting={editMeeting!} />
        )}
      </div>
    );
  }