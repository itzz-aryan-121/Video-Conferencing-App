import { EuiFieldText, EuiFormRow, EuiText } from "@elastic/eui";
import React from "react";

function MeetingNameFIeld({
  label,
  isInvalid,
  error,
  placeholder,
  value,
  setMeetingName,
}: {
  label: string;
  isInvalid: boolean;
  error: Array<string>;
  placeholder: string;
  value: string;
  setMeetingName: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <EuiFormRow 
      label={
        <EuiText style={{ color: "var(--text-primary)", fontWeight: "500" }}>
          {label}
        </EuiText>
      } 
      isInvalid={isInvalid} 
      error={error}
      style={{ marginBottom: "1rem" }}
    >
      <EuiFieldText
        placeholder={placeholder}
        value={value}
        onChange={(e) => setMeetingName(e.target.value)}
        isInvalid={isInvalid}
        style={{
          background: "var(--glass-bg)",
          border: "var(--glass-border)",
          borderRadius: "var(--radius-lg)",
          color: "var(--text-primary)",
          fontSize: "1rem",
          padding: "0.75rem 1rem",
          transition: "all 0.3s ease",
          backdropFilter: "blur(10px)",
          boxShadow: "var(--shadow-sm)"
        }}
        className="meeting-name-field"
      />
    </EuiFormRow>
  );
}

export default MeetingNameFIeld;