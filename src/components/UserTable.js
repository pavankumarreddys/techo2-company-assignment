import React, { useEffect, useState } from 'react';

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem('usersData');
    const parsedData = storedData ? JSON.parse(storedData) : [];
    setUsers(parsedData);
  }, []);

  const onDelete = (email) => {
    const updatedUsers = users?.filter((user) => user?.email !== email);
    setUsers(updatedUsers);

    localStorage.setItem('usersData', JSON.stringify(updatedUsers));
  };

  return (
    <div>
      {users && users.length < 1 ? (
        <h4>No data found</h4>
      ) : (
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((user) => (
              <tr key={user.email}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => onDelete(user.email)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserTable;
