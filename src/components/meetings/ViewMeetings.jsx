import React from "react";
import { Link } from "react-router-dom";

export default function ViewMeetings() {
  return (
    <div className="container">
      <div className="row g-3">
        <div className="col-md-6">
          <div className="card card-body border-0 rounded-0 bg-pink">
            <Link
              className="tile-title stretched-link link-light text-center text-decoration-none"
              to="/meetings/users"
            >
              <i className="fa-solid fa-user me-3"></i>Meetings by User
            </Link>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card card-body border-0 rounded-0 bg-indigo">
            <Link
              className="tile-title stretched-link link-light text-center text-decoration-none"
              to="/meetings/rooms"
            >
              <i className="fa-solid fa-person-booth me-3"></i>Meetings by Room
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
