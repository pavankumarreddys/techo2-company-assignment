import React, { useState } from "react";
import {Footer} from "./Footer";
import {Header} from "./Header";
import { Toaster } from "react-hot-toast";
export const Layout = ({ children}) => {
    const [userRole, setUserRole] = useState('user');

  const handleRoleChange = (event) => {
    setUserRole(event.target.value);
  };
  return (
    <div>
      <Header userRole={userRole} onRoleChange={handleRoleChange}/>
      <main style={{ minHeight: "70vh",width:"100%",marginTop:"70px" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};

