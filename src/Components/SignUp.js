import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const SignUp = (props) => {
    const [credentials, setCredentials] = useState({
        name : "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();
     const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        console.log(credentials);
      };

      const signUp = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
          localStorage.setItem("token" , json.authtoken)
          navigate("/")
          props.showAlert("Account Created Successfully" , "success")

          
        } else {
            props.showAlert(json.errors[0].msg , "danger")
        }
      };
  return(
    <div className="container col-md-6">
    <form method="POST" onSubmit={signUp}>
    <div className="form-group my-4">
        <label htmlFor="exampleInputEmail1">Name</label>
        <input
          type="text"
          className="form-control my-2"
          id="name"
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
          value={credentials.name}
          required
          minLength={3}
        />
      </div>
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
          minLength={5}
        />
      </div>
      <button type="submit" className="btn btn-primary my-3">
        SignUp
      </button>
    </form>
  </div>
  )
};

export default SignUp;
