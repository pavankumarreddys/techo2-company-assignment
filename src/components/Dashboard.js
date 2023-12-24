import React, { useEffect, useState } from 'react';
import UserTable from './UserTable';
import { useNavigate } from 'react-router-dom';
import { Layout } from './Layout/Layout';

const Dashboard = () => {
  const [islogin, setIsLogin] = useState(false);
  const [isAdmin,setIsAdmin]= useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('usersData')) || [];
    const storedIsLogin = localStorage.getItem('isLogin');
    const logMail = localStorage.getItem('email');
  
    if (storedIsLogin) {
      setIsLogin(true)
        const currentUser = storedUserData?.filter(user => user?.email === logMail);
        const isAdmino = currentUser[0].user === 'admin';
      if (isAdmino) {
        setIsAdmin(true)
      }else{
      setIsAdmin(false)
      }
    } else {
      navigate('/login');
    }
  }, []);
  

  return (
    <Layout>
      <div>
        {islogin && (
          <div>
            {isAdmin ? (
              <div>
                <h3 className='text-center'>Admin Dashboard</h3>
                <UserTable />
              </div>
            ) : (
              <div>
                <h3>welcome to User Dashboard</h3>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
