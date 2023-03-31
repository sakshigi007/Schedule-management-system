import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../common/Loading";

export default function RoomList() {
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

  return (
    <>
      <div className="container">
        <div className="row g-3">
          <div className="col-12">
            <h1 className="text-center">
              <i className="fa-solid fa-person-booth me-2"></i>Meetings by Room
            </h1>
          </div>
          {inProgress && (
            <div className="col-12">
              <Loading />
            </div>
          )}
          {!inProgress &&
            rooms.length > 0 &&
            rooms.map((room) => {
              return (
                <div className="col-md-3" key={room.roomId}>
                  <div className="card card-body h-100">
                    <h5 className="text-center mb-0">{room.roomName}</h5>
                    <Link
                      to={`/meetings/room?id=${room.roomId}`}
                      className="stretched-link"
                    />
                  </div>
                </div>
              );
            })}
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
