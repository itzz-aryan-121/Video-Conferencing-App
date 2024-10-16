import React from "react";
import { EuiFlexGroup, EuiFlexItem, EuiText } from "@elastic/eui";

export default function Footer() {
  return (
    <EuiFlexGroup
      justifyContent="center"
      alignItems="center"
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        backgroundColor: "#1A1A1A", // Dark footer background
        padding: "10px",
      }}
    >
      <EuiFlexItem grow={false}>
        <EuiText color="subdued" size="s">
          Made with 🤍 by Aryan
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}
