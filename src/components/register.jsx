import { createUserWithEmailAndPassword } from "firebase/auth"; 
import React, { useState } from "react"; 
import { auth, db } from "./firebase"; 
import { setDoc, doc } from "firebase/firestore"; 
import { toast } from "react-toastify"; 
import "../styles/loginAndRegister.css"; 


function Register() {
  // State variables for email, password, first name, and last name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  // Function to handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Create user with email and password
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        // Set user data in Firestore
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
        });
      }
      console.log("User Registered Successfully!!");
      alert("User Registered Successfully!!");
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  
  return (
    <div className="auth-wrapper"> 
      <div className="auth-inner"> 
        {/* Registration form */}
        <form onSubmit={handleRegister}>
          <h3>Sign Up</h3>

          {/* First name input */}
          <div className="mb-3">
            <label>First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              onChange={(e) => setFname(e.target.value)}
              required
            />
          </div>

          {/* Last name input */}
          <div className="mb-3">
            <label>Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              onChange={(e) => setLname(e.target.value)}
            />
          </div>

          {/* Email input */}
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password input */}
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit button */}
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          {/* Link to login page */}
          <p className="forgot-password text-right">
            Already registered <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register; 
