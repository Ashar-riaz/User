"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link"; // Import Link from Next.js
import styles from './login.module.css'; // Assuming you have a CSS module for custom styling


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // To track if it's error or success
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Login successful! Redirecting..."); // Success message
      setMessageType("success");
      setTimeout(() => {
        router.push("/dashboard"); // Redirect to the dashboard or another page after login
      }, 1500);
    } else {
      setMessage(data.message || "Invalid email or password"); // Error message from API or default message
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
          <div className="form-group mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block w-100">
            Login
          </button>
        </form>

        {/* Success and error messages */}
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
