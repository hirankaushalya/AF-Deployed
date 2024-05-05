import React, { useState } from "react"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import { Link, Navigate } from "react-router-dom"; // Import Navigate from React Router

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [redirectToHome, setRedirectToHome] = useState(false); // State to handle redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      setRedirectToHome(true); // Set redirection state to true
      //toast.success("User logged in Successfully");
    } catch (error) {
      console.log(error.message);
      setLoginError(error.message); // Set login error message
    }
  };

  if (redirectToHome) {
    return <Navigate to="/home" replace />; // Redirect to home if redirectToHome is true
  }

  return (
    <div className="auth-wrapper"> 
      <div className="auth-inner"> 
        <form onSubmit={handleSubmit}>
          <h3>Login</h3>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
          <p className="forgot-password text-right">
            New user <Link to="/register">Register Here</Link>
          </p>
        </form>
        {loginError && <div className="alert alert-danger">{loginError}</div>}
      </div>
    </div>
  );
}

export default Login;
