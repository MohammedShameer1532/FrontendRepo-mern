import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import axios from "axios";
import Swal from "sweetalert2";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_BASE_URL;
  const headers = { "Access-Control-Allow-Origin": "*" };
  const handleSignup = (e) => {
    e.preventDefault();
    // Check if any of the input fields are empty
    if (!name || !email || !password || !confPassword) {
      Swal.fire({
        title: "Error",
        text: "Please fill in all the required fields",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
      navigate(false);
      return; // Stop the submission if any input is empty
    }
    axios
      .post(
        `${apiUrl}/register`,

        {
          name,
          email,
          password,
          confPassword,
        },
        { headers }
      )
      .then((result) => {
        console.log(result);
        if (result.data.message === "Success") {
          Swal.fire({
            title: "Successfully Added",
            icon: "success",
            showConfirmButton: false,
            timer: 3000,
          });
          navigate("/login");
        } else {
          // Handle other response messages, e.g., incorrect password or no record existed
          Swal.fire({
            title: "Error",
            text: result.data.message, // Display the response message from the server
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
      <h1>SignUp</h1>
      <form className="mt-5" onSubmit={handleSignup}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setConfPassword(e.target.value)}
          />
        </div>
        <div className="sub">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <Link to="/login">
          <div className="read">
            <button className="btn btn-success">Login</button>
          </div>
        </Link>
      </form>
    </div>
  );
};

export default Signup;
