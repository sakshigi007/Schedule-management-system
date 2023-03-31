import "./App.css";
import React from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AddUser from "./components/users/AddUser";
import ViewUsers from "./components/users/ViewUsers";
import EditUser from "./components/users/EditUser";
import ViewRooms from "./components/rooms/ViewRooms";
import AddRoom from "./components/rooms/AddRoom";
import EditRoom from "./components/rooms/EditRoom";
import ViewMeetingsByUser from "./components/meetings/ViewMeetingsByUser";
import RoomList from "./components/meetings/RoomList";
import Error404 from "./components/common/Error404";
import AddMeeting from "./components/meetings/AddMeeting";
import ViewMeetingsByRoom from "./components/meetings/ViewMeetingsByRoom";
import UserList from "./components/meetings/UserList";
import ViewMeetings from "./components/meetings/ViewMeetings";

export default function App() {
  return (
    <>
      <Header />
      <main className="py-4">
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/users">
            <Route index element={<ViewUsers />}></Route>
            <Route path="add" element={<AddUser />}></Route>
            <Route path="edit" element={<EditUser />}></Route>
          </Route>
          <Route path="/rooms">
            <Route index element={<ViewRooms />}></Route>
            <Route path="add" element={<AddRoom />}></Route>
            <Route path="edit" element={<EditRoom />}></Route>
          </Route>
          <Route path="/meetings">
            <Route index element={<ViewMeetings />}></Route>
            <Route path="users" element={<UserList />}></Route>
            <Route path="rooms" element={<RoomList />}></Route>
            <Route path="user" element={<ViewMeetingsByUser />}></Route>
            <Route path="room" element={<ViewMeetingsByRoom />}></Route>
            <Route path="add" element={<AddMeeting />}></Route>
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
    </>
  );
}
