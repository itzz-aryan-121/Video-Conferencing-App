import {
    EuiFlexGroup,
    EuiForm,
    EuiFormRow,
    EuiSpacer,
    EuiSwitch,
    EuiText,
    EuiPanel,
  } from "@elastic/eui";
  import { addDoc } from "firebase/firestore";
  import moment from "moment";
  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { useAppSelector } from "../app/hooks";
  import CreateMeetingButtons from "../components/FormComponents/CreateMeetingButtons";
  import MeetingDateField from "../components/FormComponents/MeetingDateField";
  import MeetingMaximumUsersField from "../components/FormComponents/MeetingMaximumUsersField";
  import MeetingNameField from "../components/FormComponents/MeetingNameFIeld";
  import MeetingUserField from "../components/FormComponents/MeetingUserField";
  
  import Header from "../components/Header";
  import useAuth from "../hooks/useAuth";
  import useFetchUsers from "../hooks/useFetchUsers";
  import useToast from "../hooks/useToast";
  import { meetingsRef } from "../utils/FirebaseConfig";
  import { generateMeetingID } from "../utils/generateMeetingId";
  import { FieldErrorType, UserType } from "../utils/types";

// Custom SVG Icon
const VideoConferenceFormIcon = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="videoFormGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f093fb" />
        <stop offset="100%" stopColor="#f5576c" />
      </linearGradient>
    </defs>
    <circle cx="20" cy="20" r="7" fill="url(#videoFormGradient)" />
    <circle cx="40" cy="20" r="7" fill="url(#videoFormGradient)" />
    <circle cx="30" cy="35" r="7" fill="url(#videoFormGradient)" />
    <path d="M12 45 C12 38, 28 38, 28 45" stroke="url(#videoFormGradient)" strokeWidth="2" fill="none" />
    <path d="M32 45 C32 38, 48 38, 48 45" stroke="url(#videoFormGradient)" strokeWidth="2" fill="none" />
    <path d="M22 50 C22 43, 38 43, 38 50" stroke="url(#videoFormGradient)" strokeWidth="2" fill="none" />
    <line x1="28" y1="42" x2="32" y2="42" stroke="url(#videoFormGradient)" strokeWidth="2" />
    <line x1="18" y1="47" x2="28" y2="47" stroke="url(#videoFormGradient)" strokeWidth="2" />
    <line x1="32" y1="47" x2="42" y2="47" stroke="url(#videoFormGradient)" strokeWidth="2" />
  </svg>
);
  
  export default function VideoConference() {
    useAuth();
    const [users] = useFetchUsers();
    const [createToast] = useToast();
    const uid = useAppSelector((zoomApp) => zoomApp.auth.userInfo?.uid);
    const navigate = useNavigate();
  
    const [meetingName, setMeetingName] = useState("");
    const [selectedUser, setSelectedUser] = useState<Array<UserType>>([]);
    const [startDate, setStartDate] = useState(moment());
    const [size, setSize] = useState(1);
    const [showErrors, setShowErrors] = useState<{
      meetingName: FieldErrorType;
      meetingUsers: FieldErrorType;
    }>({
      meetingName: {
        show: false,
        message: [],
      },
      meetingUsers: {
        show: false,
        message: [],
      },
    });
    const [anyoneCanJoin, setAnyoneCanJoin] = useState(false);
  
    const onUserChange = (selectedOptions: Array<UserType>) => {
      setSelectedUser(selectedOptions);
    };
  
    const validateForm = () => {
      const showErrorsClone = { ...showErrors };
      let errors = false;
      if (!meetingName.length) {
        showErrorsClone.meetingName.show = true;
        showErrorsClone.meetingName.message = ["Please Enter Meeting Name"];
        errors = true;
      } else {
        showErrorsClone.meetingName.show = false;
        showErrorsClone.meetingName.message = [];
      }
      if (!selectedUser.length && !anyoneCanJoin) {
        showErrorsClone.meetingUsers.show = true;
        showErrorsClone.meetingUsers.message = ["Please Select a User"];
        errors = true;
      } else {
        showErrorsClone.meetingUsers.show = false;
        showErrorsClone.meetingUsers.message = [];
      }
      setShowErrors(showErrorsClone);
      return errors;
    };
  
    const createMeeting = async () => {
      if (!validateForm()) {
        const meetingId = generateMeetingID();
        await addDoc(meetingsRef, {
          createdBy: uid,
          meetingId,
          meetingName,
          meetingType: anyoneCanJoin ? "anyone-can-join" : "video-conference",
          invitedUsers: anyoneCanJoin ? [] : selectedUser.map((user) => user.uid),
          meetingDate: startDate.format("L"),
          maxUsers: anyoneCanJoin ? size : selectedUser.length,
          status: true,
        });
        createToast({
          title: "Video Conference Created Successfully",
          type: "success",
        });
        navigate("/");
      }
    };
  
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
            background: "radial-gradient(circle at 70% 30%, rgba(240, 147, 251, 0.2) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(245, 87, 108, 0.2) 0%, transparent 50%)",
            zIndex: 0
          }}
        />

        <Header />
        
        <div style={{ 
          position: "relative", 
          zIndex: 1, 
          flex: 1, 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          padding: "2rem" 
        }}>
          <EuiPanel
            style={{
              background: "var(--glass-bg)",
              border: "var(--glass-border)",
              borderRadius: "var(--radius-xl)",
              backdropFilter: "blur(20px)",
              boxShadow: "var(--shadow-xl)",
              maxWidth: "550px",
              width: "100%",
              padding: "2.5rem"
            }}
          >
            {/* Header Section */}
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <div style={{ marginBottom: "1rem" }}>
                <VideoConferenceFormIcon />
              </div>
              <EuiText>
                <h1 style={{ 
                  fontSize: "2rem", 
                  fontWeight: "700", 
                  background: "var(--secondary-gradient)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginBottom: "0.5rem"
                }}>
                  Create Video Conference
                </h1>
                <p style={{ 
                  fontSize: "1rem", 
                  color: "var(--text-secondary)"
                }}>
                  Set up a group meeting for multiple participants
                </p>
              </EuiText>
            </div>

            <EuiForm style={{ width: "100%" }}>
              <EuiFormRow 
                display="columnCompressedSwitch" 
                label={
                  <EuiText style={{ color: "var(--text-primary)", fontWeight: "500" }}>
                    Anyone can Join
                  </EuiText>
                }
                style={{ marginBottom: "1.5rem" }}
              >
                <EuiSwitch
                  showLabel={false}
                  label="Anyone Can Join"
                  checked={anyoneCanJoin}
                  onChange={(e) => setAnyoneCanJoin(e.target.checked)}
                  compressed
                />
              </EuiFormRow>
    
              <MeetingNameField
                label="Meeting name"
                isInvalid={showErrors.meetingName.show}
                error={showErrors.meetingName.message}
                placeholder="Enter meeting name"
                value={meetingName}
                setMeetingName={setMeetingName}
              />
    
              {anyoneCanJoin ? (
                <MeetingMaximumUsersField value={size} setSize={setSize} />
              ) : (
                <MeetingUserField
                  label="Invite Users"
                  isInvalid={showErrors.meetingUsers.show}
                  error={showErrors.meetingUsers.message}
                  options={users}
                  onChange={onUserChange}
                  selectedOptions={selectedUser}
                  isClearable={false}
                  placeholder="Select users to invite"
                />
              )}
              
              <EuiSpacer size="m" />
              
              <MeetingDateField selected={startDate} setStartDate={setStartDate} />
              
              <EuiSpacer size="xl" />
              
              <CreateMeetingButtons createMeeting={createMeeting} />
            </EuiForm>
          </EuiPanel>
        </div>
      </div>
    );
  }