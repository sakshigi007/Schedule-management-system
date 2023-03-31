import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../common/Loading";

export default function ViewUsers() {
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

  const deleteUser = async (id) => {
    if (id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        customClass: {
          confirmButton: "btn btn-danger",
          cancelButton: "btn btn-secondary",
        },
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`${process.env.REACT_APP_ENDPOINT_HOST}api/v1/users/${id}`, {
            method: "DELETE",
            body: JSON.stringify({ userId: id }),
            headers: {
              "Content-Type": "application/json",
            },
          }).then((response) => {
            if (response.ok) {
              response.json().then((result) => {
                if (result.success) {
                  if (result.success) {
                    Swal.fire({
                      icon: "success",
                      title: "User deleted successfully.",
                      buttonsStyling: false,
                      customClass: {
                        confirmButton: "btn btn-success",
                      },
                    });
                    getUsers().then((result) => {
                      if (result.success) {
                        setUsers(result.data);
                      }
                    });
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: result.message,
                      buttonsStyling: false,
                      customClass: {
                        confirmButton: "btn btn-danger",
                      },
                    });
                  }
                }
              });
            }
          });
        }
      });
    }
  };

  return (
    <>
      <div className="container">
        <div className="row g-3">
          <div className="col-12">
            <h1 className="text-center">
              <i className="fa-solid fa-users me-2"></i>Users
            </h1>
          </div>
          {inProgress && (
            <div className="col-12">
              <Loading />
            </div>
          )}
          {!inProgress && users.length > 0 && (
            <div className="col-12">
              <div className="table-responsive">
                <table className="table table-hover table-bordered">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => {
                      return (
                        <tr key={user._id}>
                          <td>{user.userId}</td>
                          <td>{user.userName}</td>
                          <td>{user.userEmail}</td>
                          <td>
                            <div className="btn-group">
                              <Link
                                className="btn btn-warning"
                                to={`/users/edit?id=${user.userId}`}
                              >
                                <i className="fa-solid fa-pencil me-2"></i>
                                Edit
                              </Link>
                              <button
                                className="btn btn-danger"
                                onClick={() => deleteUser(user.userId)}
                              >
                                <i className="fa-solid fa-trash me-2"></i>
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
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
