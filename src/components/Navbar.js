import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { Link, NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
    let classes = {
        active: 'nav-link active',
        noActive: 'nav-link'
    }
    const history = useNavigate();
    const [profile, setProfile] = React.useState(null);

    const getProfile = () => {
        const profileValue = JSON.parse(localStorage.getItem('profile'));
        if (profileValue) {
            setProfile(profileValue);
        }
    }

    React.useEffect(() => {
        console.log('useeffect navbar');
        getProfile();
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
        history('/')
        history(0)
    }
    return (
        <>
            <Navbar bg="success" expand="lg" variant="dark">
                <Container>
                    <Link className="navbar-brand" to="/" exact="true">CodingThailand</Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavLink className={(navData) => navData.isActive ? classes.active : classes.noActive} to="/" >Home</NavLink>
                            <NavLink className={(navData) => navData.isActive ? classes.active : classes.noActive} to="/product" >Product</NavLink>
                            <NavLink className={(navData) => navData.isActive ? classes.active : classes.noActive} to="/about" >About</NavLink>
                            <NavLink className={(navData) => navData.isActive ? classes.active : classes.noActive} to="/upload" >อัปโหลดไฟล์</NavLink>
                            <NavLink className={(navData) => navData.isActive ? classes.active : classes.noActive} to="/member" >เมมเบอร์</NavLink>
                            <NavDropdown title="Link" id="navbarScrollingDropdown">
                                <NavDropdown.Item onClick={() => { history('/hospital') }}>ข้อมูลสถานพยาบาล (Pagination)</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => { history('/category') }}>หมวดหมู่ข่าว (CRUD)</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        {
                            profile ? (
                                <span className='navbar-text text-white'>
                                    ยินดีต้อนรับ {profile.name} role: {profile.role}
                                    <button className='btn btn-danger ml-2' onClick={logout}>Log out</button>
                                </span>
                            ) : (
                                <>
                                    <Nav>
                                        <NavLink className={(navData) => navData.isActive ? classes.active : classes.noActive} to="/register" >สมัครสมาชิก</NavLink>
                                        <NavLink className={(navData) => navData.isActive ? classes.active : classes.noActive} to="/login" >เข้าสู่ระบบ</NavLink>
                                    </Nav>
                                </>
                            )
                        }
                        {/* className?: string | ((props: {
        isActive: boolean;
    }) => string); */}
                    </Navbar.Collapse>
                </Container >
            </Navbar >
        </>
    )
}

export default NavBar
