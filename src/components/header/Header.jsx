import { Button, Col, Container, Form, FormControl, Nav, Navbar, NavDropdown, Row } from "react-bootstrap"
import { ReactSVG } from "react-svg"
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, logout } from "../../storeAsyncActions/account";
import { useEffect, useState } from "react";
import { search } from "../../storeAsyncActions/movies";
import { getMoviesAction } from "../../store/moviesReducer";
import { getDataAction } from "../../store/authReducer";

const Header = () => {

  const [searchKeyword, setSearchKeyword] = useState('')

  const dispatch = useDispatch()

  const userData = useSelector((state) => {
    return state.userInfo.userData
  })

  const handleChange = (e) => {
    setSearchKeyword(e.target.value)
  }

  const submitForm = () => {
    search(searchKeyword).then(res => {
      const payload = { movies: res }
      dispatch(getMoviesAction(payload))
    })
  }

  useEffect(() => {
    if (localStorage.getItem('userToken') !== undefined && localStorage.getItem('userToken') !== "undefined") {
      getUserData(localStorage.getItem('userToken')).then(res => {
        const payload = {
          userData: res
        }
        dispatch(getDataAction(payload))
      })
    }
  }, [userData?.id])

  return (
    <Navbar collapseOnSelect bg="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/trending">
          <NavLink to={{ pathname: "trending" }}>
            <ReactSVG
              beforeInjection={(svg) => {
                svg.classList.add('svg-class-name')
                svg.setAttribute('style', 'width: 100px; height: 40px')
              }}
              src={process.env.PUBLIC_URL + "/imoviIcon.svg"} />
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Item className="p-1">
              <NavLink onClick={() => {
                const payload = { movies: [] }
                dispatch(getMoviesAction(payload))
              }} to={{ pathname: '/trending' }} style={{ textDecoration: 'none', color: 'grey' }}>
                Trending
                <i style={{ marginLeft: '5px', marginRight: '5px', display: 'inline' }} className="fa-solid fa-bolt"></i>
              </NavLink>
            </Nav.Item>
            {userData?.id ?
              <>
                <Nav.Item className="p-1">
                  <NavLink to={{ pathname: '/favourites' }} style={{ textDecoration: 'none', color: 'grey' }}>
                    Favourites
                    <i style={{ marginLeft: '5px', marginRight: '5px', display: 'inline' }} className="fa-solid fa-bookmark"></i>
                  </NavLink>
                </Nav.Item>
                <Nav.Item className="p-1">
                  <NavLink to={{ pathname: '/history' }} style={{ textDecoration: 'none', color: 'grey' }}>
                    History
                    <i style={{ marginLeft: '5px', marginRight: '5px', display: 'inline' }} className="fa-solid fa-clock-rotate-left"></i>
                  </NavLink>
                </Nav.Item>
                <Nav.Item className="p-1">
                  <NavLink to={{ pathname: '/history' }} style={{ textDecoration: 'none', color: 'grey' }}>
                    {userData.username}
                    <i style={{ marginLeft: '5px', marginRight: '5px', display: 'inline' }} className="fa-solid fa-address-card"></i>
                  </NavLink>
                </Nav.Item>
              </>
              :
              <></>
            }
          </Nav>
          <Form className="d-flex"
            onSubmit={(e) => {
              e.preventDefault()
              submitForm()
            }}
          >
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => {
                handleChange(e)
              }}
            />
            <NavLink as={Col} to={{ pathname: '/search' }}>
              <Button variant="outline-success" onClick={() => {
                submitForm()
              }} type='submit'>Search</Button>
            </NavLink>
            {userData?.id ?
              <>
                <Button as={Row} onClick={() => logout(dispatch)} variant="secondary"
                  className="mx-2">
                  logout
                  <i style={{ marginLeft: '5px', display: 'inline' }} className="fa-solid fa-door-open"></i>
                </Button>
              </>
              :
              <>
                <NavLink as={Col} to={{ pathname: '/login' }}>
                  <Button as={Col} variant="secondary" className="mx-2">
                    login
                    <i style={{ marginLeft: '5px', display: 'inline' }} className="fa-solid fa-right-to-bracket"></i>
                  </Button>
                </NavLink>
              </>}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  )
}
export default Header