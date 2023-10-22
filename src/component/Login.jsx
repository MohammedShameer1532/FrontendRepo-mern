import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_BASE_URL;
  const headers = { "Access-Control-Allow-Origin": "*" };
  const handleLogin = (e) => {
    e.preventDefault();
    // Check if any of the input fields are empty
    if (!email || !password) {
      Swal.fire({
        title: "Error",
        text: "Please fill in all the required fields.",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
      navigate(false);

      return; // Stop the submission if any input is empty
    }
    axios
      .post(
        `${apiUrl}/login`,
        {
          email,
          password,
        },
        { headers }
      )
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          Swal.fire({
            title: "Successfully Added",
            icon: "success",
            showConfirmButton: false,
            timer: 3000,
          });
          navigate("/profile");
        } else {
          // Handle other response messages, e.g., incorrect password or no record existed
          Swal.fire({
            title: "Error",
            text: result.data, // Display the response message from the server
            icon: "error",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        });
        console.log(err);
      });
  };
  return (
    <div>
      <h1>Login</h1>
      <form className="mt-5" onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Link to="/">
          <div className="read">
            <button className="btn btn-success">SignUp</button>
          </div>
        </Link>
        <div className="typ">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
