import React, { useState, ChangeEvent } from "react";
import Swal from "sweetalert2" // Import SweetAlert2

import { FaGooglePlusG } from "react-icons/fa";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth, firebaseDB, usersRef } from "../utils/FirebaseConfig";
import { collection, query, where, addDoc, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../app/slices/AuthSlice";
import {
  EuiButton,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiImage,
  EuiPanel,
  EuiProvider,
  EuiSpacer,
  EuiText,
  EuiTextColor,
  EuiFormRow,
} from "@elastic/eui";
import animation from "../assets/animation.gif";
import logo from "../assets/logo.png";

 // Initialize SweetAlert2 with React support

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Redirect if user is logged in
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  const showNotification = (
    icon: "success" | "error",
    title: string
  ) => {
    Swal.fire({
      toast: true, // Enable toast mode
      position: "top-end", // Top-right corner
      icon,
      title,
      showConfirmButton: false, // No OK button
      timer: 2000, // Auto-dismiss after 2 seconds
      timerProgressBar: true, // Show a progress bar
      background: "#333", // Dark background
      color: "#fff", // White text color
      customClass: {
        popup: "swal2-toast", // Custom styling (optional)
      },
    });
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(firebaseAuth, provider);
      const { uid, displayName, email } = result.user;

      await handleUserInFirestore(uid, displayName ?? "Anonymous", email ?? "");
      dispatch(
        setUser({ uid, email: email ?? "", name: displayName ?? "Anonymous" })
      );
      showNotification("success", "Logged in successfully!");
      navigate("/");
    } catch (error: any) {
      showNotification("error", `Google Login Failed: ${error.message}`);
    }
  };

  const handleEmailPasswordLogin = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email ?? "",
          name: user.displayName ?? "User",
        })
      );
      showNotification("success", "Logged in successfully!");
      navigate("/");
    } catch (error: any) {
      showNotification("error", `Login failed: ${error.message}`);
    }
  };

  const handleRegister = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      await handleUserInFirestore(user.uid, "New User", user.email ?? "");
      dispatch(
        setUser({ uid: user.uid, email: user.email ?? "", name: "New User" })
      );
      showNotification("success", "Registered successfully!");
      navigate("/");
    } catch (error: any) {
      showNotification("error", `Registration failed: ${error.message}`);
    }
  };

  const handleUserInFirestore = async (
    uid: string,
    name: string,
    email: string
  ) => {
    const firestoreQuery = query(usersRef, where("uid", "==", uid));
    const fetchedUser = await getDocs(firestoreQuery);
    if (fetchedUser.docs.length === 0) {
      await addDoc(collection(firebaseDB, "users"), { uid, name, email });
    }
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  return (
    <EuiProvider colorMode="dark">
      <EuiFlexGroup
        justifyContent="center"
        alignItems="center"
        style={{ width: "100vw", height: "100vh" }}
      >
        <EuiFlexItem grow={false}>
          <EuiPanel paddingSize="xl">
            <EuiFlexGroup justifyContent="center" alignItems="center">
              <EuiFlexItem>
                <EuiImage src={animation} alt="animation" />
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiImage src={logo} alt="logo" size="150px" />
                <EuiSpacer size="xl" />
                <EuiText textAlign="center" grow={false}>
                  <h3>
                    <EuiTextColor>Platform to</EuiTextColor>
                    <EuiTextColor color="#0b5cff"> Connect..</EuiTextColor>
                  </h3>
                </EuiText>
                <EuiSpacer size="l" />

                <EuiFormRow label="Email">
                  <EuiFieldText
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleInputChange(setEmail)}
                  />
                </EuiFormRow>
                <EuiFormRow label="Password">
                  <EuiFieldText
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handleInputChange(setPassword)}
                  />
                </EuiFormRow>
                <EuiSpacer size="m" />

                {isRegistering ? (
                  <EuiButton fill onClick={handleRegister}>
                    Register
                  </EuiButton>
                ) : (
                  <EuiButton fill onClick={handleEmailPasswordLogin}>
                    Login
                  </EuiButton>
                )}

                <EuiSpacer size="s" />
                <EuiButton
                  color="text"
                  onClick={() => setIsRegistering(!isRegistering)}
                >
                  {isRegistering
                    ? "Already have an account? Login"
                    : "New here? Register"}
                </EuiButton>
                <EuiSpacer size="l" />
                <EuiButton onClick={handleGoogleLogin}>
                  <FaGooglePlusG
                    size={30}
                    className="google-icon"
                    style={{ marginRight: "8px" }}
                  />
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiProvider>
  );
}

export default Login;
