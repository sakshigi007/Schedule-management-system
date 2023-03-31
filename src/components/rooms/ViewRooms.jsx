import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../common/Loading";

export default function ViewRooms() {
  const [rooms, setRooms] = useState([]);
  const [inProgress, setInProgress] = useState(true);
  const get_rooms_ep = `${process.env.REACT_APP_ENDPOINT_HOST}api/v1/room/get-all-rooms`;

  useEffect(() => {
    getRooms().then((result) => {
      setInProgress(false);
      if (result.success) {
        setRooms(result.data);
      }
    });
  }, []);

  const getRooms = async () => {
    const response = await fetch(get_rooms_ep);
    const result = await response.json();
    return result;
  };

  const deleteRoom = async (id) => {
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
          fetch(`${process.env.REACT_APP_ENDPOINT_HOST}api/v1/room/${id}`, {
            method: "DELETE",
            body: JSON.stringify({ roomId: id }),
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
                      title: "Room deleted successfully.",
                      buttonsStyling: false,
                      customClass: {
                        confirmButton: "btn btn-success",
                      },
                    });
                    getRooms().then((result) => {
                      if (result.success) {
                        setRooms(result.data);
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
              <i className="fa-solid fa-person-booth me-2"></i>Rooms
            </h1>
          </div>
          {inProgress && (
            <div className="col-12">
              <Loading />
            </div>
          )}
          {!inProgress && rooms.length > 0 && (
            <div className="col-12">
              <div className="table-responsive">
                <table className="table table-hover table-bordered">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rooms.map((room) => {
                      return (
                        <tr key={room._id}>
                          <td>{room.roomId}</td>
                          <td>{room.roomName}</td>
                          <td>
                            <div className="btn-group">
                              <Link
                                className="btn btn-warning"
                                to={`/rooms/edit?id=${room.roomId}`}
                              >
                                <i className="fa-solid fa-pencil me-2"></i>
                                Edit
                              </Link>
                              <button
                                className="btn btn-danger"
                                onClick={() => deleteRoom(room.roomId)}
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
          {!inProgress && rooms.length === 0 && (
            <div className="col-12">
              <h1 className="text-center text-danger">No rooms found!</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
