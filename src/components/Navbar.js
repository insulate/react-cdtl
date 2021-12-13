import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { Link, NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
    let classes = {
        active: 'nav-link active',
        noActive: 'nav-link'
    }
    const history = useNavigate();
    return (
        <>
            <Navbar bg="success" expand="lg" variant="dark">
                <Container>
                    <Link className="navbar-brand" to="/" exact="true">CodingThailand</Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className={(navData) => navData.isActive ? classes.active : classes.noActive} to="/" >Home</NavLink>
                            <NavLink className={(navData) => navData.isActive ? classes.active : classes.noActive} to="/product" >Product</NavLink>
                            <NavLink className={(navData) => navData.isActive ? classes.active : classes.noActive} to="/about" >About</NavLink>
                            <NavDropdown title="Link" id="navbarScrollingDropdown">
                                <NavDropdown.Item onClick={() => { history('/hospital') }}>ข้อมูลสถานพยาบาล (Pagination)</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => { history('/category') }}>หมวดหมู่ข่าว (CRUD)</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        {/* className?: string | ((props: {
        isActive: boolean;
    }) => string); */}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar
