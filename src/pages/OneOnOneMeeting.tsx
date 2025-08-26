import { EuiForm, EuiSpacer, EuiText, EuiPanel } from "@elastic/eui";
import { addDoc } from "firebase/firestore";
import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import CreateMeetingButtons from "../components/FormComponents/CreateMeetingButtons";
import MeetingDateField from "../components/FormComponents/MeetingDateField";
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
const OneOnOneFormIcon = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="formGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#667eea" />
        <stop offset="100%" stopColor="#764ba2" />
      </linearGradient>
    </defs>
    <circle cx="20" cy="20" r="8" fill="url(#formGradient)" />
    <circle cx="40" cy="20" r="8" fill="url(#formGradient)" />
    <path d="M12 35 C12 28, 28 28, 28 35" stroke="url(#formGradient)" strokeWidth="2" fill="none" />
    <path d="M32 35 C32 28, 48 28, 48 35" stroke="url(#formGradient)" strokeWidth="2" fill="none" />
    <line x1="28" y1="32" x2="32" y2="32" stroke="url(#formGradient)" strokeWidth="2" />
  </svg>
);

export default function OneOnOneMeeting() {
  useAuth();
  const [users] = useFetchUsers();
  const [createToast] = useToast();
  const uid = useAppSelector((zoomApp) => zoomApp.auth.userInfo?.uid);
  const navigate = useNavigate();

  const [meetingName, setMeetingName] = useState("");
  const [selectedUser, setSelectedUser] = useState<Array<UserType>>([]);
  const [startDate, setStartDate] = useState(moment());
  const [showErrors, setShowErrors] = useState<{
    meetingName: FieldErrorType;
    meetingUser: FieldErrorType;
  }>({
    meetingName: {
      show: false,
      message: [],
    },
    meetingUser: {
      show: false,
      message: [],
    },
  });

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
    if (!selectedUser.length) {
      showErrorsClone.meetingUser.show = true;
      showErrorsClone.meetingUser.message = ["Please Select a User"];
      errors = true;
    } else {
      showErrorsClone.meetingUser.show = false;
      showErrorsClone.meetingUser.message = [];
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
        meetingType: "1-on-1",
        invitedUsers: [selectedUser[0].uid],
        meetingDate: startDate.format("L"),
        maxUsers: 1,
        status: true,
      });
      createToast({
        title: "One on One Meeting Created Successfully",
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
          background: "radial-gradient(circle at 30% 70%, rgba(102, 126, 234, 0.2) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(118, 75, 162, 0.2) 0%, transparent 50%)",
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
            maxWidth: "500px",
            width: "100%",
            padding: "2.5rem"
          }}
        >
          {/* Header Section */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div style={{ marginBottom: "1rem" }}>
              <OneOnOneFormIcon />
            </div>
            <EuiText>
              <h1 style={{ 
                fontSize: "2rem", 
                fontWeight: "700", 
                background: "var(--primary-gradient)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "0.5rem"
              }}>
                Create 1-on-1 Meeting
              </h1>
              <p style={{ 
                fontSize: "1rem", 
                color: "var(--text-secondary)"
              }}>
                Set up a personal meeting with someone special
              </p>
            </EuiText>
          </div>

          <EuiForm style={{ width: "100%" }}>
            <MeetingNameField
              label="Meeting name"
              isInvalid={showErrors.meetingName.show}
              error={showErrors.meetingName.message}
              placeholder="Enter meeting name"
              value={meetingName}
              setMeetingName={setMeetingName}
            />
            
            <EuiSpacer size="m" />
            
            <MeetingUserField
              label="Invite User"
              isInvalid={showErrors.meetingUser.show}
              error={showErrors.meetingUser.message}
              options={users}
              onChange={onUserChange}
              selectedOptions={selectedUser}
              singleSelection={{ asPlainText: true }}
              isClearable={false}
              placeholder="Select a user to invite"
            />
            
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