import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className='home'>
      <div className='center'>
        <h1>Welcome to Website</h1>
        <br />
        <p>Create account / signin</p>
        <Link to='/register' className='bg-info link'>
          Register
        </Link>
        <Link to='/login' className='link bg-success'>
          Login
        </Link>
      </div>
    </div>
  );
}
