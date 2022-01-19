import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const loginUser = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token" , json.authtoken)
      navigate("/")
      props.showAlert("Logged In Successfully" , "success")

      
    } else {
        props.showAlert(json.errors[0].msg , "danger")
        
    }
  };
  return (
    <div className="container col-md-6">
      <form method="POST" onSubmit={loginUser}>
        <div className="form-group my-4">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control my-2"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={handleChange}
            value={credentials.email}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control my-2"
            id="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={credentials.password}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary my-3">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
