import { useEffect, useState } from "react"
import { Col, Container, Image, Row, Table } from "react-bootstrap"
import { ScrollMenu } from "react-horizontal-scrolling-menu"
import { useLocation } from "react-router"
import { getActorData, getCombinedCredits, mapCreditsTable } from "../../../storeAsyncActions/cast"
import MovieCard from "../../movieCard/MovieCard"

const CastDetail = (props) => {

  const [actorData, setActorData] = useState({})
  const [biography, setBiography] = useState("")
  const [credits, setCredits] = useState([])
  const [table, setTable] = useState([])

  const location = useLocation()

  const actor = location.state.actor

  useEffect(() => {
    getActorData(actor).then(res => {
      console.log(res)
      setActorData(res)
      handleData(res)
    })
    getCombinedCredits(actor).then(res => {
      console.log(res)
      const arr = res.map((el) => {
        return (
          <MovieCard movie={el} />
        )
      })
      setCredits(arr)
    })
    mapCreditsTable(actor).then(res => {
      setTable(res)
    })
  }, [props])

  const handleData = (actor) => {
    if (actor.biography === null || actor.biography === undefined ||
      actor.biography === "")
      setBiography(`We don't have a biography for ${actor.name}.`)
    else {
      const arr = actor.biography.split("\n")
      const block = arr.map(el => <p>{el}</p>)
      setBiography(block)
    }
  }

  return (
    <Container className=' p-2' fluid={true}  >
      <Row>
        <Col lg={3} md={3} sm={1}>
          <Image fluid={true} src={`https://image.tmdb.org/t/p/original${actorData.profile_path}`} rounded />
        </Col>
        <Col>
          <Row height={50}>
            <h1>
              {`${actorData.name} (${actorData.also_known_as})`}
            </h1>
            <p className="font-italic">{biography}</p>
          </Row >
          Known for
          <Row className="fixed-row-bottom">
            <ScrollMenu
              dragging={true}
              wheel={false}
              alignCenter={false}
              clickWhenDrag={false} >
              {credits}
            </ScrollMenu>
          </Row>
        </Col>
      </Row>
      History
      <Row className="justify-content-md-center">
        <Col xs lg="7">
          <Table responsive="sm">
            <tbody>
              {table}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container >
  )
}

export default CastDetail