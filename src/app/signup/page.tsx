'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import "bootstrap/dist/css/bootstrap.min.css";
import styles from './Signup.module.css'; // Assuming you have a CSS module for custom styling

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // To track if it's error or success
  const [emailValid, setEmailValid] = useState(true); // Track if email is valid
  const router = useRouter();

  useEffect(() => {
    if (typeof document !== 'undefined') {
      require("bootstrap/dist/js/bootstrap.bundle.min");
    }
  }, []);

  // Basic email validation function
  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailValid(false); // Set invalid email message
      setMessage('Invalid email format');
      setMessageType('error');
      return;
    }

    const res = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();

    if (res.ok) {
      setMessage('Signup successful!'); // Success message
      setMessageType('success');
      setTimeout(() => {
        router.push('/login'); // Redirect to login after successful signup
      }, 1500);
    } else {
      setMessage(data.message); // Show error message from API response
      setMessageType('error');
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
              className={`form-control ${!emailValid ? 'is-invalid' : ''}`} // Highlight email input if invalid
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailValid(true); // Reset validation state on change
              }}
              required
            />
            {!emailValid && (
              <div className="invalid-feedback">Please enter a valid email.</div> // Bootstrap validation message
            )}
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
          <button type="submit" className="btn btn-primary btn-block w-100">Signup</button>
        </form>

        {/* Success and error messages */}
        {message && (
          <div
            className={`mt-3 text-center alert ${messageType === 'success' ? 'alert-success' : 'alert-danger'}`}
            role="alert"
          >
            {message}
          </div>
        )}

        <div className="mt-3 text-center">
          <p>
            Already have an account?{' '}
            <a href="/login" className="text-primary">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}
