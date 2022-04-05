import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Register = () => {
  let [status, setStatus] = useState("");
  let [email, setEmail] = useState();
  const navigate = useNavigate();
  const checkEmail = () => {
    axios
      .get(`/users/checkemail/${email}`)
      .then((res) => {
        console.log(res.data.status);
        if (!res.data.status) {
          setStatus("User Exists");
        } else {
          setStatus("");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error while checking email");
      });
  };
  const registerUser = (event) => {
    event.preventDefault();
    const userObject = {
      name: event.target.name.value,
      email: event.target.email.value,
      age: event.target.age.value,
      dob: event.target.dob.value,
      password: event.target.password.value,
    };
    axios.post("/users", userObject).then((res) => {
      console.log(res.data);
      if (!res.data.status) {
        alert("Username already exist");
      } else {
        alert("Registered Successfully");
        navigate("/login");
      }
    });
  };
  return (
    <div className=''>
      <h1 className='h1 text-center'>Registration Form</h1>
      <h2 className='text-center text-danger'>{status}</h2>
      <form
        onSubmit={registerUser}
        className='w-50 m-auto p-3 mt-4 border border-dark rounded'
      >
        <div className='form-group'>
          <label className=''>Email</label>
          <input
            type='email'
            name='email'
            placeholder='Enter Email'
            className='form-control  mt-3 mb-4'
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <div>
            <input
              type='checkbox'
              name='checkemail'
              className='d-inline'
              onClick={(event) => {
                if (event.target.checked == true) {
                  checkEmail();
                }
              }}
            />
            <p className='d-inline'>
              {" "}
              Please Check this for email availability
            </p>
          </div>
          <label>Name</label>
          <input
            type='text'
            name='name'
            placeholder='Enter Name'
            className='form-control mt-3 mb-4'
          />
          <label>Age</label>
          <input
            type='number'
            name='age'
            placeholder='Enter Age'
            className='form-control mt-3 mb-4'
          />
          <label>Date of Birth</label>
          <input type='date' name='dob' className='form-control mt-3 mb-4' />
          <label>Password</label>
          <input
            type='password'
            name='password'
            placeholder='Enter Password'
            className='form-control mt-3 mb-4'
          />
          <div className='text-center'>
            <button className='btn btn-primary'>Register</button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Register;
