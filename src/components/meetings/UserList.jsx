import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../common/Loading";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [inProgress, setInProgress] = useState(true);
  const get_users_ep = `${process.env.REACT_APP_ENDPOINT_HOST}api/v1/users/get-all-users`;

  useEffect(() => {
    getUsers().then((result) => {
      setInProgress(false);
      if (result.success) {
        setUsers(result.data);
      }
    });
  }, []);

  const getUsers = async () => {
    const response = await fetch(get_users_ep);
    const result = await response.json();
    return result;
  };

  return (
    <>
      <div className="container">
        <div className="row g-3">
          <div className="col-12">
            <h1 className="text-center">
              <i className="fa-solid fa-user me-2"></i>Meetings by User
            </h1>
          </div>
          {inProgress && (
            <div className="col-12">
              <Loading />
            </div>
          )}
          {!inProgress &&
            users.length > 0 &&
            users.map((user) => {
              return (
                <div className="col-md-2" key={user.userId}>
                  <div className="card card-body h-100">
                    <h5 className="text-center mb-0">{user.userName}</h5>
                    <Link
                      to={`/meetings/user?id=${user.userId}`}
                      className="stretched-link"
                    />
                  </div>
                </div>
              );
            })}
          {!inProgress && users.length === 0 && (
            <div className="col-12">
              <h1 className="text-center text-danger">No users found!</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
