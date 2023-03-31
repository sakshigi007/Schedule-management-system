import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container">
      <div className="row g-3">
        <div className="col-md-4">
          <div className="card card-body border-0 rounded-0 bg-pink">
            <Link
              className="tile-title stretched-link link-light text-center text-decoration-none"
              to="/users"
            >
              <i className="fa-solid fa-users me-3"></i>Users
            </Link>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card card-body border-0 rounded-0 bg-indigo">
            <Link
              className="tile-title stretched-link link-light text-center text-decoration-none"
              to="/rooms"
            >
              <i className="fa-solid fa-person-booth me-3"></i>Rooms
            </Link>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card card-body border-0 rounded-0 bg-success">
            <Link
              className="tile-title stretched-link link-light text-center text-decoration-none"
              to="/meetings"
            >
              <i className="fa-solid fa-handshake me-3"></i>Meetings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
