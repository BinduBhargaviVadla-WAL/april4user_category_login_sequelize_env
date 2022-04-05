import React from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  const logoutFunc = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className='bg-secondary d-flex justify-content-end'>
      <button className='btn btn-primary mx-3' onClick={logoutFunc}>
        Logout
      </button>
    </div>
  );
}
