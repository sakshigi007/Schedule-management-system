import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../common/Loading";

export default function AddMeeting() {
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [otherUsers, setOtherUsers] = useState([]);
  const [inProgress, setInProgress] = useState(true);
  const add_meeting_ep = `${process.env.REACT_APP_ENDPOINT_HOST}api/v1/schedule/create-meeting`;
  const get_users_ep = `${process.env.REACT_APP_ENDPOINT_HOST}api/v1/users/get-all-users`;
  const get_rooms_ep = `${process.env.REACT_APP_ENDPOINT_HOST}api/v1/room/get-all-rooms`;
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([getUsers(), getRooms()])
      .then((result) => {
        if (result[0].success) {
          setUsers(result[0].data);
        }
        if (result[1].success) {
          setRooms(result[1].data);
        }
      })
      .finally(() => {
        setInProgress(false);
      });
  }, []);

  const getUsers = async () => {
    const response = await fetch(get_users_ep);
    const result = await response.json();
    return result;
  };

  const getRooms = async () => {
    const response = await fetch(get_rooms_ep);
    const result = await response.json();
    return result;
  };

  const onHostUserChange = (e) => {
    setOtherUsers(users.filter((user) => user.userId !== e.target.value));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    let data = {};
    let fd = new FormData(e.target);
    fd.forEach((value, key) => {
      data[key] = key === "guestUsers" ? fd.getAll("guestUsers") : value;
    });
    if (!data["guestUsers"]) {
      data["guestUsers"] = [];
    }
    fetch(add_meeting_ep, {
      method: "POST",
      body: JSON.stringify(data),
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
              text: "New meeting scheduled. Do you want to view list of meetings?",
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
                navigate("/meetings");
              } else if (result.isDismissed) {
                e.target.reset();
              }
            });
          }
        });
      } else if (response.status === 400) {
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
          {inProgress && <Loading />}
          {!inProgress && users.length > 0 && rooms.length > 0 && (
            <div className="card">
              <div className="card-header">
                <h5 className="card-title my-1">
                  <i className="fa-solid fa-handshake me-2"></i>Add New Meeting
                </h5>
              </div>
              <div className="card-body">
                <form onSubmit={onFormSubmit}>
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="form-floating">
                        <select
                          className="form-select"
                          name="userId"
                          id="userId"
                          defaultValue=""
                          required
                          onChange={onHostUserChange}
                        >
                          <option value="">Select Host User</option>
                          {users.map((user) => {
                            return (
                              <option value={user.userId} key={user._id}>
                                {user.userName}
                              </option>
                            );
                          })}
                        </select>
                        <label htmlFor="userId">Host User</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <select
                          className="form-select"
                          name="roomId"
                          id="roomId"
                          defaultValue=""
                          required
                        >
                          <option value="">Select Meeting Room</option>
                          {rooms.map((room) => {
                            return (
                              <option value={room.roomId} key={room._id}>
                                {room.roomName}
                              </option>
                            );
                          })}
                        </select>
                        <label htmlFor="roomId">Meeting Room</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <Dropdown>
                        <Dropdown.Toggle className="w-100">
                          Select Guests
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="w-100 p-3">
                          {otherUsers.map((user) => {
                            return (
                              <div className="form-check" key={user._id}>
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="guestUsers"
                                  value={user.userId}
                                  id={`check-${user.userId}`}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`check-${user.userId}`}
                                >
                                  {user.userName}
                                </label>
                              </div>
                            );
                          })}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          className="form-control"
                          type="date"
                          name="meetingDate"
                          id="meetingDate"
                          placeholder="Meeting Date"
                          required
                        />
                        <label htmlFor="meetingDate">Meeting Date</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          className="form-control"
                          type="time"
                          name="startTime"
                          id="startTime"
                          placeholder="Start Time"
                          required
                        />
                        <label htmlFor="startTime">Start Time</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          className="form-control"
                          type="time"
                          name="endTime"
                          id="endTime"
                          placeholder="End Time"
                          required
                        />
                        <label htmlFor="endTime">End Time</label>
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
          )}
        </div>
      </div>
    </div>
  );
}
