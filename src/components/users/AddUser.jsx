import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AddUser() {
  const add_user_ep = `${process.env.REACT_APP_ENDPOINT_HOST}api/v1/users/add-user`;
  const navigate = useNavigate();

  const onFormSubmit = (e) => {
    e.preventDefault();
    let data = {};
    new FormData(e.target).forEach((value, key) => (data[key] = value));
    let json_data = JSON.stringify(data);
    fetch(add_user_ep, {
      method: "POST",
      body: json_data,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        response.json().then((result) => {
          if (result.success) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "New user added. Do you want to view list of users?",
              showCancelButton: true,
              buttonsStyling: false,
              customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-secondary",
              },
              confirmButtonText: "Yes",
              cancelButtonText: "No",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/users");
              } else if (result.isDismissed) {
                e.target.reset();
              }
            });
          }
        });
      } else if (response.status === 409) {
        response.json().then((result) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: result.message,
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-danger",
            },
          });
        });
      }
    });
  };
  return (
    <div className="container">
      <div className="row g-3 justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title my-1">
                <i className="fa-solid fa-user-plus me-2"></i>Add New User
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={onFormSubmit}>
                <div className="row g-3">
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        className="form-control"
                        type="text"
                        name="userId"
                        id="userId"
                        placeholder="User ID"
                        required
                      />
                      <label htmlFor="userId">User ID</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        className="form-control"
                        type="text"
                        name="userName"
                        id="userName"
                        placeholder="User Name"
                        required
                      />
                      <label htmlFor="userName">User Name</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        className="form-control"
                        type="email"
                        name="userEmail"
                        id="userEmail"
                        placeholder="User Email"
                        required
                      />
                      <label htmlFor="userEmail">User Email</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-success w-100">
                      <i className="fa-solid fa-plus me-2"></i>Add
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
