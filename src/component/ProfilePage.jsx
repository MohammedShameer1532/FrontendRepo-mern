import React, { useState } from "react";
import "../App.css";
import DatePicker from "./DatePicker";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const ProfilePage = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");
  const apiUrl = process.env.REACT_APP_BASE_URL;
  const headers = { "Access-Control-Allow-Origin": "*" };
  const handleProfile = (e) => {
    e.preventDefault();
    // Check if any of the input fields are empty
    if (!age || !gender || !dob || !mobile) {
      Swal.fire({
        title: "Error",
        text: "Please fill in all the required fields.",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
      return; // Stop the submission if any input is empty
    }
    axios
      .post(
        `${apiUrl}/profile`,
        {
          age,
          gender,
          dob,
          mobile,
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
      <h1>Profile Page</h1>
      <form className="mt-5" onSubmit={handleProfile}>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Gender: Male/Female/Transgender</label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            onChange={(e) => setGender(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mobile Number</label>
          <input
            type="number"
            className="form-control"
            onChange={(e) => setMobile(e.target.value)}
            value={mobile}
          />
        </div>
        <div>
          <DatePicker dob={dob} onDateChange={setDob} />
        </div>
        <div className="sub1">
          <button type="submit" className="btn btn-secondary">
            Submit
          </button>
        </div>
        <div>
          <Link to="/login">
            <button type="submit" className="btn btn-primary">
              LogOut
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
