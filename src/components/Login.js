import React, { useState } from "react";
import { Layout } from "./Layout/Layout";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const storedData = JSON.parse(localStorage.getItem('usersData')) || [];
    const user = storedData.find((user) => user.email === email);
    if (user && user.password === password) {
      console.log('Login successful!');
      toast.success("Login successful!")
      localStorage.setItem("isLogin",true)
      localStorage.setItem("email",email)
      setTimeout(()=>{
      navigate('/')

      },1500)
    } else {
      console.log('User not found or invalid credentials');
      toast.error('Invalid credentials');
    }
  };
  

  return (
    <Layout title="Login - Ecommerce App">
      <div className="container-fluid bg-info d-flex align-items-center justify-content-center" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit} className="p-4 border rounded">
          <h4 className="text-center mb-4">LOGIN FORM</h4>
          <div className="mb-3">
            <input
              type="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
