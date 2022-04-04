import axios from "axios";
import useLocalStorage from "use-local-storage";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [token, setToken] = useLocalStorage("token", "");
  const navigate = useNavigate();
  const registerUser = (event) => {
    event.preventDefault();
    let email = event.target.email.value;
    const userObject = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    axios.post("/users/login", userObject).then((res) => {
      console.log(res.data);
      if (!res.data.status) {
        alert("Incorrect Credentials");
      } else {
        alert("Logged Successfully");
        setToken(res.data.debug_data);
        console.log(res.data.debug_data);
        navigate(`/member/${email}`);
      }
    });
  };
  return (
    <div className='text-center'>
      <form
        onSubmit={registerUser}
        className='w-50 m-auto p-3 mt-4 text-center border border-dark rounded'
      >
        <h1>Login Form</h1>
        <div className='form-group'>
          <input
            type='text'
            name='email'
            placeholder='Enter Email'
            className='form-control w-75 m-auto mt-3 mb-4'
          />
          <input
            type='password'
            name='password'
            placeholder='Enter Password'
            className='form-control w-75 m-auto mt-3 mb-4'
          />
          <button className='btn btn-primary'>Register</button>
        </div>
      </form>
      <p>
        Create account. Click Here... <Link to='/register'>SignUp</Link>
      </p>
    </div>
  );
};
export default Login;
