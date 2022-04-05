import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";

export default function EditUser() {
  const emailParams = useParams();
  console.log(emailParams.email);
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  let [name, setName] = useState();
  let [age, setAge] = useState();
  let [dob, setDob] = useState();
  let [password, setPassword] = useState();

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
            setName(res.data.debug_data[0].name);
            setAge(res.data.debug_data[0].age);
            setDob(res.data.debug_data[0].dob);
            setPassword(res.data.debug_data[0].password);
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
  const updateUser = (event) => {
    event.preventDefault();
    let obj = {
      name: name,
      age: age,
      dob: dob,
      password: password,
    };
    console.log(obj);
    axios
      .put(`/users/edit/${emailParams.email}`, obj, {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    navigate(`/member/${emailParams.email}`);
  };

  return (
    <div className='cr'>
      <div>
        <Logout />
      </div>
      <h1 className='text-center'>Edit Details</h1>
      <form
        onSubmit={updateUser}
        className='w-50 m-auto p-3 mt-4 border border-dark rounded'
      >
        <div className='form-group'>
          <label className='font-weight-bold'>Name</label>
          <input
            type='text'
            name='name'
            className='form-control mt-3 mb-4'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
          <label>Age</label>
          <input
            type='number'
            name='age'
            className='form-control  mt-3 mb-4'
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
            required
          />
          <label>Date of Birth</label>
          <input
            type='date'
            name='dob'
            className='form-control mt-3 mb-4'
            value={dob}
            onChange={(e) => {
              setDob(e.target.value);
            }}
            required
          />
          <label>Password</label>
          <input
            type='password'
            name='password'
            className='form-control mt-3 mb-4'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <div className='text-center'>
            <button className='btn btn-success'>Update</button>
          </div>
        </div>
      </form>
    </div>
  );
}
