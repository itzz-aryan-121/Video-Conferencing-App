import { EuiButton, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import React from "react";
import { useNavigate } from "react-router-dom";

function CreateMeetingButtons({
  createMeeting,
  isEdit = false,
  closeFlyout,
}: {
  createMeeting: () => {};
  isEdit?: boolean;
  closeFlyout?: () => {};
}) {
  const navigate = useNavigate();
  
  return (
    <EuiFlexGroup gutterSize="m">
      <EuiFlexItem grow={false}>
        <EuiButton
          color="danger"
          onClick={() => (isEdit ? closeFlyout!() : navigate("/"))}
          fill
          style={{
            background: "var(--error-color)",
            border: "none",
            borderRadius: "var(--radius-lg)",
            padding: "0.75rem 2rem",
            fontSize: "1rem",
            fontWeight: "600",
            transition: "all 0.3s ease",
            boxShadow: "var(--shadow-sm)"
          }}
          className="cancel-button"
        >
          Cancel
        </EuiButton>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButton 
          type="submit" 
          onClick={createMeeting} 
          fill
          style={{
            background: "var(--primary-gradient)",
            border: "none",
            borderRadius: "var(--radius-lg)",
            padding: "0.75rem 2rem",
            fontSize: "1rem",
            fontWeight: "600",
            transition: "all 0.3s ease",
            boxShadow: "var(--shadow-sm)"
          }}
          className="create-button"
        >
          {isEdit ? "Edit Meeting" : "Create Meeting"}
        </EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}

export default CreateMeetingButtons;