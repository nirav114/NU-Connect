import React, { useState } from "react";
import axios from "./api/axios";
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user");
  const [secretKey, setSecretKey] = useState("");

  let navigate = useNavigate();
  

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('/auth/register', 
          {
            name,
            userName,
            email,
            password,
            userType,
            secretKey
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            }
          }
        );

        console.log('response : ', response);
        if(response.data.success === true) {
          navigate('/login')
        }
        else {
          alert("invalid credentials!");
        }
      } catch(err) {
        alert("something went wrong!");
      };
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Sign Up</h3>
          <div>
            Register As
            <input
              type="radio"
              name="UserType"
              value="user"
              onChange={(e) => setUserType(e.target.value)}
              className="m-2"
            />
            User
            <input
              type="radio"
              name="UserType"
              value="admin"
              onChange={(e) => setUserType(e.target.value)}
              className="m-2"
            />
            Admin
          </div>
          {userType === "Admin" ? (
            <div className="mb-3">
              <label>Secret Key</label>
              <input
                type="text"
                className="form-control"
                placeholder="Secret Key"
                onChange={(e) => setSecretKey(e.target.value)}
              />
            </div>
          ) : null}

          <div className="mb-3">
            <label>Your Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>User Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn text-white bg-black p-2">
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <a href="/login">sign in?</a>
          </p>
        </form>
      </div>
    </div>
  );
}