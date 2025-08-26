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
  EuiProvider,
  EuiText,
  EuiFormRow,
} from "@elastic/eui";
import { HeroIllustration } from "../components/SVGIcons";

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
      <div
        style={{
          minHeight: "100vh",
          background: `
            radial-gradient(ellipse at top left, rgba(102, 126, 234, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse at top right, rgba(118, 75, 162, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse at bottom left, rgba(79, 172, 254, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse at bottom right, rgba(67, 233, 123, 0.2) 0%, transparent 50%),
            var(--bg-primary)
          `,
          position: "relative",
          overflow: "hidden",
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
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23667eea' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.7,
          }}
        />

        <EuiFlexGroup
          justifyContent="center"
          alignItems="center"
          style={{ 
            minHeight: "100vh",
            padding: "2rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <EuiFlexItem grow={false} style={{ maxWidth: "1200px", width: "100%" }}>
            <EuiFlexGroup
              justifyContent="center"
              alignItems="center"
              responsive={true}
              gutterSize="xl"
            >
              {/* Left side - Illustration */}
              <EuiFlexItem style={{ maxWidth: "500px" }}>
                <div
                  style={{
                    textAlign: "center",
                    padding: "2rem",
                  }}
                  className="fade-in-left"
                >
                  <div
                    style={{
                      marginBottom: "2rem",
                      display: "flex",
                      justifyContent: "center",
                    }}
                    className="float-animation"
                  >
                    <HeroIllustration size={350} />
                  </div>

                  <EuiText textAlign="center">
                    <h1
                      style={{
                        fontSize: "3rem",
                        fontWeight: "800",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        marginBottom: "1rem",
                        lineHeight: "1.2",
                      }}
                    >
                      Welcome to Boom
                    </h1>
                  </EuiText>

                  <EuiText textAlign="center">
                    <p
                      style={{
                        fontSize: "1.2rem",
                        color: "rgba(255, 255, 255, 0.8)",
                        fontWeight: "400",
                        lineHeight: "1.6",
                        maxWidth: "400px",
                        margin: "0 auto",
                      }}
                    >
                      The future of video conferencing is here. Connect, collaborate, and create amazing experiences together.
                    </p>
                  </EuiText>
                </div>
              </EuiFlexItem>

              {/* Right side - Login Form */}
              <EuiFlexItem style={{ maxWidth: "450px" }}>
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "24px",
                    padding: "3rem",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  }}
                  className="glass-card fade-in-right"
                >
                  {/* Logo and Brand */}
                  <div
                    style={{
                      textAlign: "center",
                      marginBottom: "2rem",
                    }}
                  >
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        borderRadius: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 1rem",
                        boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
                      }}
                    >
                      <span style={{ color: "white", fontWeight: "bold", fontSize: "24px" }}>B</span>
                    </div>

                    <EuiText textAlign="center">
                      <h2
                        style={{
                          fontSize: "1.8rem",
                          fontWeight: "700",
                          color: "white",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {isRegistering ? "Create Account" : "Welcome Back"}
                      </h2>
                    </EuiText>

                    <EuiText textAlign="center">
                      <p
                        style={{
                          fontSize: "1rem",
                          color: "rgba(255, 255, 255, 0.7)",
                        }}
                      >
                        {isRegistering 
                          ? "Join the platform to connect with others" 
                          : "Sign in to your account to continue"
                        }
                      </p>
                    </EuiText>
                  </div>

                  {/* Google Login Button */}
                  <EuiButton
                    onClick={handleGoogleLogin}
                    fullWidth
                    size="m"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "12px",
                      padding: "1rem",
                      fontSize: "1rem",
                      fontWeight: "600",
                      color: "white",
                      marginBottom: "1.5rem",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                    onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <FaGooglePlusG size={20} />
                      Continue with Google
                    </div>
                  </EuiButton>

                  {/* Divider */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "1.5rem 0",
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        height: "1px",
                        background: "rgba(255, 255, 255, 0.2)",
                      }}
                    />
                    <span
                      style={{
                        padding: "0 1rem",
                        color: "rgba(255, 255, 255, 0.7)",
                        fontSize: "0.9rem",
                      }}
                    >
                      or
                    </span>
                    <div
                      style={{
                        flex: 1,
                        height: "1px",
                        background: "rgba(255, 255, 255, 0.2)",
                      }}
                    />
                  </div>

                  {/* Email and Password Form */}
                  <div style={{ marginBottom: "1.5rem" }}>
                    <EuiFormRow
                      label={
                        <span style={{ color: "rgba(255, 255, 255, 0.9)", fontWeight: "500" }}>
                          Email Address
                        </span>
                      }
                      fullWidth
                    >
                      <EuiFieldText
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleInputChange(setEmail)}
                        fullWidth
                        style={{
                          background: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          borderRadius: "8px",
                          color: "white",
                          fontSize: "1rem",
                        }}
                      />
                    </EuiFormRow>
                  </div>

                  <div style={{ marginBottom: "2rem" }}>
                    <EuiFormRow
                      label={
                        <span style={{ color: "rgba(255, 255, 255, 0.9)", fontWeight: "500" }}>
                          Password
                        </span>
                      }
                      fullWidth
                    >
                      <EuiFieldText
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={handleInputChange(setPassword)}
                        fullWidth
                        style={{
                          background: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          borderRadius: "8px",
                          color: "white",
                          fontSize: "1rem",
                        }}
                      />
                    </EuiFormRow>
                  </div>

                  {/* Main Action Button */}
                  <EuiButton
                    fill
                    fullWidth
                    size="m"
                    onClick={isRegistering ? handleRegister : handleEmailPasswordLogin}
                    style={{
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      border: "none",
                      borderRadius: "12px",
                      padding: "1rem",
                      fontSize: "1.1rem",
                      fontWeight: "600",
                      boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      marginBottom: "1rem",
                    }}
                    onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 12px 40px rgba(102, 126, 234, 0.4)";
                    }}
                    onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 8px 32px rgba(102, 126, 234, 0.3)";
                    }}
                  >
                    {isRegistering ? "Create Account" : "Sign In"}
                  </EuiButton>

                  {/* Toggle Register/Login */}
                  <EuiText textAlign="center">
                    <button
                      onClick={() => setIsRegistering(!isRegistering)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "rgba(255, 255, 255, 0.8)",
                        fontSize: "0.95rem",
                        cursor: "pointer",
                        textDecoration: "underline",
                        transition: "color 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "white";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)";
                      }}
                    >
                      {isRegistering
                        ? "Already have an account? Sign In"
                        : "New to Boom? Create Account"}
                    </button>
                  </EuiText>
                </div>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </EuiProvider>
  );
}

export default Login;
