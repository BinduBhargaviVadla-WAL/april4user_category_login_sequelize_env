import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";

export default function Member(props) {
  const emailParams = useParams();
  console.log(emailParams.email);

  let [user, setUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      axios
        .get(`/users/${emailParams.email}`, {
          headers: {
            token: token,
          },
        })
        .then((res) => {
          console.log(res.data.debug_data[0]);
          if (res.data.status) {
            setUser(res.data.debug_data[0]);
          } else {
            console.log(res);
          }
        })
        .catch((error) => {
          console.log(error);
          alert("Error while getting data");
        });
    } else {
      alert("Something went wrong");
    }
  }, []);
  return (
    <div>
      <div class='topnav'>
        <Logout />
      </div>
      {Object.keys(user).length == 0 ? (
        <div></div>
      ) : (
        <div>
          <h1 className='text-center'>User Details</h1>
          <table class='table table-striped table-bordered text-left mt-5 w-50 m-auto'>
            <thead>
              <tr>
                <th scope='col'>S.No</th>
                <th scope='col'>Details</th>
                <th scope='col'>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope='row'>1</th>
                <td>Name</td>
                <td>{user.name}</td>
              </tr>
              <tr>
                <th scope='row'>2</th>
                <td>Email</td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <th scope='row'>3</th>
                <td>Age</td>
                <td>{user.age}</td>
              </tr>
              <tr>
                <th scope='row'>4</th>
                <td>Date of Birth</td>
                <td>{user.dob}</td>
              </tr>
              <tr>
                <th scope='row'>3</th>
                <td>Password</td>
                <td>{user.password}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <div className='text-center m-5'>
        <button
          className='btn btn-success'
          onClick={() => {
            navigate(`/edit/${emailParams.email}`);
          }}
        >
          Edit User
        </button>
      </div>
      <br />
    </div>
  );
}
