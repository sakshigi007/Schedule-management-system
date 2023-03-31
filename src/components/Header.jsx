import React from "react";
import {
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import IconLink from "./common/IconLink";

export default function Header() {
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
        className="shadow"
      >
        <Container>
          <LinkContainer to="/" className="navbar-brand h4 mb-0">
            <NavbarBrand className="h4 mb-0 small">
              Schedule Management System
            </NavbarBrand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbarMain" />
          <Navbar.Collapse id="navbarMain">
            <Nav className="ms-auto mb-2 mb-lg-0">
              <LinkContainer to="/">
                <Nav.Link href="/">
                  <IconLink icon="fa-solid fa-home fa-fw me-2" text="Home" />
                </Nav.Link>
              </LinkContainer>
              <NavDropdown
                title={
                  <IconLink icon="fa-solid fa-users fa-fw me-2" text="Users" />
                }
                id="users-dropdown"
              >
                <LinkContainer to="/users">
                  <NavDropdown.Item href="/users">
                    <IconLink
                      icon="fa-solid fa-user-group fa-fw me-2"
                      text="View Users"
                    />
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/users/add">
                  <NavDropdown.Item href="/users/add">
                    <IconLink
                      icon="fa-solid fa-user-plus fa-fw me-2"
                      text="Add User"
                    />
                  </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              <NavDropdown
                title={
                  <IconLink
                    icon="fa-solid fa-person-booth fa-fw me-2"
                    text="Rooms"
                  />
                }
                id="rooms-dropdown"
              >
                <LinkContainer to="/rooms">
                  <NavDropdown.Item href="/rooms">
                    <IconLink
                      icon="fa-solid fa-person-booth fa-fw me-2"
                      text="View Rooms"
                    />
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/rooms/add">
                  <NavDropdown.Item href="/rooms/add">
                    <IconLink
                      icon="fa-solid fa-plus-circle fa-fw me-2"
                      text="Add Room"
                    />
                  </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              <NavDropdown
                title={
                  <IconLink
                    icon="fa-solid fa-handshake fa-fw me-2"
                    text="Meetings"
                  />
                }
                id="meetings-dropdown"
              >
                <LinkContainer to="/meetings/users">
                  <NavDropdown.Item href="/meetings/users">
                    <IconLink
                      icon="fa-solid fa-user fa-fw me-2"
                      text="Meetings by User"
                    />
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/meetings/rooms">
                  <NavDropdown.Item href="/meetings/room">
                    <IconLink
                      icon="fa-solid fa-person-booth fa-fw me-2"
                      text="Meetings by Room"
                    />
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/meetings/add">
                  <NavDropdown.Item href="/meetings/add">
                    <IconLink
                      icon="fa-solid fa-plus-circle fa-fw me-2"
                      text="Add Meeting"
                    />
                  </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
