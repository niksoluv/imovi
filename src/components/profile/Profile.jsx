import Avatar from "boring-avatars";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getLists } from './../../storeAsyncActions/customLists';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { getListsMovies } from "../../storeAsyncActions/account";
import MovieCard from "../movieCard/MovieCard";
import { defineMediatype } from './../../storeAsyncActions/account';
import { Navigate } from "react-router";

const Profile = () => {

  const [lists, setLists] = useState([])

  const userData = useSelector((state) => {
    return state.userInfo.userData
  })

  useEffect(() => {
    getLists()
      .then(res => {
        getListsMovies(res)
          .then(res => {

            const mappedLists = mapLists(res)
            setLists(mappedLists)

          }
          )
      })
  }, [userData])

  const mapLists = (lists) => {
    return lists.map(list => {
      if (list.relatedMovies.length < 1) {
        return (
          <>
            <div style={{ color: 'white' }}>{list.listName}</div>
            < Row xs="auto" bg="dark" >
              <div style={{ color: 'white' }}>There are no movies in this list yet</div>
            </Row >
          </>
        )
      }
      const arr = list.relatedMovies.DATA.map((el) => {
        el.data.media_type = defineMediatype(el)
        return (
          <MovieCard movie={el.data} key={`${el.data.id}_popular`} />
        )
      })
      return (<>
        <div style={{ color: 'white' }}>{list.listName}</div>
        < Row xs="auto" bg="dark" >
          <ScrollMenu
            dragging={true}
            wheel={false}
            alignCenter={false}
            clickWhenDrag={false} >
            {arr}
          </ScrollMenu>
        </Row >
      </>
      )
    })
  }

  if (userData) {
		if (userData?.id===undefined) {
			return <Navigate to='/' />
		}
	}
  
  let date = new Date(userData.date)

  return (
    <Container fluid={true} xl={10} lg={10} md={10} sm={10} xs={10} >
      <Row>
        <Col xl={2} lg={2} md={2} sm={2}>
          <Avatar
            size={200}
            name={userData.username}
            variant="beam"
            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
          />
        </Col>
        <Col xl={8} lg={8} md={8} sm={8}>
        <div style={{ color: 'white' }}>Username: {userData.username}</div>
        <div style={{ color: 'white' }}>Email: {userData.email}</div>
        <div style={{ color: 'white' }}>Registration Date: {date.getFullYear()}-{date.getMonth()}-{date.getDay()}</div>
        </Col>
      </Row>
      {lists}
    </Container>)
}

export default Profile