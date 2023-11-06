import React, { useState } from "react";
import axios from './api/axios'
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e)=> {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', 
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            withCredentials:true
          }
        }
      )
      console.log(response)
      // const data = response.data;
      if(response.data.success === true) {
        // window.localStorage.setItem("token", data.data);
        // window.localStorage.setItem("loggedIn", true);
        navigate('/articles')
      }
      else {
        console.log('in else but didnt worked!')
        alert("invalid credentials !");
      }
    } catch(err) {
      console.log(err)
      // alert("something went wrong! : ")
    }
    console.log(email, password);
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Sign In</h3>

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

          <div className="mb-3">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input me-1"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
              </label>
            </div>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn text-white bg-black p-2">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right">
            <a href="/register">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
}