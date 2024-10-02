"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons from react-icons
import styles from "./login.module.css";
import { signIn } from 'next-auth/react';


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Login successful! Redirecting...");
      setMessageType("success");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } else {
      setMessage(data.message || "Invalid email or password");
      setMessageType("error");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className={`p-4 ${styles.loginBox}`}>
        <h1 className="text-center mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3 position-relative">
            {" "}
            {/* Added position-relative for positioning */}
            <input
              type={showPassword ? "text" : "password"} // Toggle between text and password
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="position-absolute"
              style={{
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
              onClick={() => setShowPassword(!showPassword)} // Toggle visibility
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
              {/* Show eye icon based on state */}
            </span>
          </div>
          <button type="submit" className="btn btn-primary btn-block w-100">
            Login
          </button>
        </form>
        <button
          type="button"
          className="btn btn-secondary w-100"
          onClick={() => signIn("google")}
        >
          Login with Google
        </button>

        {message && (
          <div
            className={`mt-3 text-center alert ${
              messageType === "success" ? "alert-success" : "alert-danger"
            }`}
            role="alert"
          >
            {message}
          </div>
        )}

        <div className="mt-3 text-center">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
