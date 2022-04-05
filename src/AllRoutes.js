import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import EditUser from "./EditUser";
import Home from "./Home";
import Login from "./Login";
import Logout from "./Logout";
import Member from "./Member";
import Register from "./Register";

export default function AllRoutes() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/member/:email' element={<Member />}>
            <Route path='logout' element={<Logout />} />
          </Route>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/edit/:email' element={<EditUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
