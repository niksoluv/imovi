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
    if (localStorage.getItem('userToken')) {
      getUserData(localStorage.getItem('userToken')).then(res => {
        const payload = {
          userData: res
        }
        dispatch(getDataAction(payload))
      })
    }
  }, [userData?.id])

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/trending">
          <ReactSVG
            beforeInjection={(svg) => {
              svg.classList.add('svg-class-name')
              svg.setAttribute('style', 'width: 100px; height: 40px')
            }}
            src={process.env.PUBLIC_URL + "/imoviIcon.svg"} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link>
              <NavLink onClick={() => {
                const payload = { movies: [] }
                dispatch(getMoviesAction(payload))
              }} to={{ pathname: '/trending' }} style={{ textDecoration: 'none', color: 'grey' }}>Trending</NavLink>
            </Nav.Link>
            {userData?.id ?
              <Nav.Link>
                <NavLink to={{ pathname: '/favourites' }} style={{ textDecoration: 'none', color: 'grey' }}>Favourites</NavLink>
              </Nav.Link>
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
                <Nav.Link href="#" disabled>{userData.username}</Nav.Link>
                <Button as={Row} onClick={() => logout(dispatch)} variant="secondary"
                  className="mx-2">logout</Button>
              </>
              :
              <>
                <NavLink as={Col} to={{ pathname: '/login' }}>
                  <Button as={Col} variant="secondary" className="mx-2">login</Button>
                </NavLink>
              </>}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default Header