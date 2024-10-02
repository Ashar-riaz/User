import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./navbar.css";

export default function Nav({ showAuthButtons, userName }) {  // Added userName prop
    return (
        <>
            <div className="">
            </div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary ">
                <div className="container-fluid nav">
                    <div className="d-flex align-items-center">
                        <a className="navbar-brand" href="/">EVA-Digital Human</a>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/catalog">About us</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Contact</a>
                            </li>
                        </ul>
                    </div>
                    <div className="d-flex justify-content-end">
                        {/* Conditionally render Login and Signup buttons */}
                        {showAuthButtons ? (
                            <>
                                <a className="btn btn-outline-primary me-2" href="/login">Login</a>
                            </>
                        ) : (
                            <span className="navbar-text">Welcome, {userName}</span>  // Display the user name
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}
