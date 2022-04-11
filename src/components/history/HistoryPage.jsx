import { Container, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { defineMediatype, getHistory } from "../../storeAsyncActions/account"
import MovieCard from "../movieCard/MovieCard"

const HistoryPage = (props) => {

  const [movies, setMovies] = useState([])

  const userData = useSelector((state) => {
    return state.userInfo.userData
  })

  useEffect(() => {
    getHistory().then(res => {
      const arr = res.map((el) => {
        el.data.media_type = defineMediatype(el.data)
        return (
          <MovieCard movie={el.data} />
        )
      })
      setMovies(arr)
    })
  }, [userData])

  return (
    <Container className='d-flex p-2' fluid={true} xl={10} lg={10} md={10} sm={10} xs={10} >
      <Row className='d-flex justify-content-center'>
        {movies}
      </Row>
    </Container>
  )
}

export default HistoryPage