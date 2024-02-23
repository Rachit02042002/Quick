import React from 'react'
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom'
import { Badge } from 'react-bootstrap';
import Modal from '../Model';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
export default function Navbar() {
  const [CartView,SetCartView]= useState(false);
  const navigate = useNavigate();
  let data = useCart();
  const handleLogout=()=>{
    localStorage.removeItem("authToken")
    navigate("/login")
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">QuickMunch </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">

              {(localStorage.getItem("authToken")) ?
                <li className="nav-item">
                  <Link className="nav-link active fs-5 " aria-current="page" to="/myOrder">My Orders</Link>
                </li>
                :""}
            </ul>
            {(!localStorage.getItem("authToken")) ?
            <div className='d-flex'>
              <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
              <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>

            </div>
            :
            <div>
            <div className='btn bg-white text-success mx-1' onClick={()=>{SetCartView(true)}}> Cart{" "} <Badge pill bg="danger">{data.length}</Badge></div>
            {CartView?<Modal onClose={()=>{SetCartView(false)}}><Cart/></Modal>:null}
            <div className='btn bg-white text-danger mx-1' onClick={handleLogout}> Logout</div>
            </div>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}
