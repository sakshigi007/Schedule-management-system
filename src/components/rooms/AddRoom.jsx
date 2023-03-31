import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AddRoom() {
  const [inProgress, setInProgress] = useState(false);
  const add_room_ep = `${process.env.REACT_APP_ENDPOINT_HOST}api/v1/room/add-room`;
  const navigate = useNavigate();

  const onFormSubmit = (e) => {
    e.preventDefault();
    setInProgress(true);
    let data = {};
    new FormData(e.target).forEach((value, key) => (data[key] = value));
    let json_data = JSON.stringify(data);
    fetch(add_room_ep, {
      method: "POST",
      body: json_data,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      setInProgress(false);
      if (response.ok) {
        response.json().then((result) => {
          if (result.success) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "New room added. Do you want to view list of rooms?",
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
                navigate("/rooms");
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
                <i className="fa-solid fa-plus-circle me-2"></i>Add New Room
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
                        name="roomId"
                        id="roomId"
                        placeholder="Room ID"
                        required
                      />
                      <label htmlFor="roomId">Room ID</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        className="form-control"
                        type="text"
                        name="roomName"
                        id="roomName"
                        placeholder="Room Name"
                        required
                      />
                      <label htmlFor="roomName">Room Name</label>
                    </div>
                  </div>
                  <div className="col-12">
                    {inProgress ? (
                      <button className="btn btn-success w-100" disabled>
                        <i className="fa-solid fa-spinner fa-spin me-2"></i>
                        Saving...
                      </button>
                    ) : (
                      <button className="btn btn-success w-100">
                        <i className="fa-solid fa-plus me-2"></i>Add
                      </button>
                    )}
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
