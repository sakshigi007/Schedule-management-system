import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function () {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [room, setRoom] = useState({});
  const [error, setError] = useState("");

  const onFormSubmit = (e) => {
    e.preventDefault();
    let data = {};
    new FormData(e.target).forEach((value, key) => (data[key] = value));
    let json_data = JSON.stringify(data);
    fetch(`${process.env.REACT_APP_ENDPOINT_HOST}api/v1/room/${room.roomId}`, {
      method: "PUT",
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
              text: "Room details updated",
              buttonsStyling: false,
              customClass: {
                confirmButton: "btn btn-success",
              },
            }).then(() => {
              navigate("/rooms");
            });
          } else {
            Swal.fire({
              icon: "warning",
              title: "Oops...",
              text: result.message,
              buttonsStyling: false,
              customClass: {
                confirmButton: "btn btn-secondary",
              },
            });
          }
        });
      } else if (response.status === 409) {
        response.json().then((result) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: result.message,
          });
        });
      }
    });
  };

  useEffect(() => {
    if (searchParams.get("id")) {
      getRoom(searchParams.get("id")).then((result) => {
        if (result.success) {
          setRoom(result.data);
        } else {
          setError(result.message);
        }
      });
    }
  }, []);

  const getRoom = async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_ENDPOINT_HOST}api/v1/room/${id}`
    );
    const result = await response.json();
    return result;
  };

  return (
    <div className="container">
      <div className="row g-3 justify-content-center">
        {room.roomName && (
          <div className="col-md-6 col-lg-4">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title my-1">
                  <i className="fa-solid fa-pencil me-2"></i>Edit Room
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
                          name="roomName"
                          id="roomName"
                          placeholder="Room Name"
                          defaultValue={room.roomName}
                          required
                        />
                        <label htmlFor="roomName">Room Name</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button className="btn btn-success w-100">
                        <i className="fa-solid fa-save me-2"></i>Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="col-12 text-danger fw-bold fs-4 text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
