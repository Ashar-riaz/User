"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons from react-icons
import styles from './signup.module.css';

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Signup successful! Redirecting...");
      setMessageType("success");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } else {
      setMessage(data.message || "Error signing up");
      setMessageType("error");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className={`p-4 ${styles.signupBox}`}>
        <h1 className="text-center mb-4">Signup</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="form-group mb-3 position-relative"> {/* Added position-relative for positioning */}
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
              style={{ right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }} 
              onClick={() => setShowPassword(!showPassword)} // Toggle visibility
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Show eye icon based on state */}
            </span>
          </div>
          <button type="submit" className="btn btn-primary btn-block w-100">
            Signup
          </button>
        </form>

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
            Already have an account?{" "}
            <Link href="/login" className="text-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
