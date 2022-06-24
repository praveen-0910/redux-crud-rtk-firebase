import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarNav,
} from "mdb-react-ui-kit";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  return (
    <MDBNavbar expand="lg" dark bgColor="dark">
      <MDBContainer fluid>
        <MDBNavbarBrand tag="span" className="mb-0 h1 fw-bold">
          <Link to="/"> RTK-QUERY FIREBASE BLOG APP</Link>
        </MDBNavbarBrand>
        <div style={{ float: "right", marginRight: "50px" }}>
          <MDBNavbarNav className="mb-2 mb-lg-0" fullWidth={false}>
            <MDBNavbarItem>
              <Link className="header-text" to="/">
                Home
              </Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <Link className="header-text" to="/create">
                Create
              </Link>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </div>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Navbar;
