import { useEffect, useState } from "react"
import { Col, Container, Image, Row, Table } from "react-bootstrap"
import { ScrollMenu } from "react-horizontal-scrolling-menu"
import { useLocation, useParams } from "react-router"
import { getActorData, getCombinedCredits, mapCreditsTable } from "../../../../storeAsyncActions/cast"
import { notFoundUrl } from "../../../../variables"
import MovieCard from "../../../movieCard/MovieCard"

const CastDetail = (props) => {

  const params = useParams();
  const actorId = params.id

  const [actorData, setActorData] = useState({})
  const [biography, setBiography] = useState("")
  const [credits, setCredits] = useState([])
  const [table, setTable] = useState([])
  const [aka, setAka] = useState('')

  const location = useLocation()

  useEffect(() => {
    getActorData(actorId).then(res => {
      setActorData(res)
      handleData(res)
    })
    getCombinedCredits(actorId).then(res => {
      const arr = res.map((el) => {
        return (
          <MovieCard movie={el} key={el.id} />
        )
      })
      setCredits(arr)
    })
    mapCreditsTable(actorId).then(res => {
      setTable(res)
    })
  }, [props])

  const handleData = (actor) => {
    if (actor.biography === null || actor.biography === undefined ||
      actor.biography === "")
      setBiography(`We don't have a biography for ${actor.name}.`)
    else {
      if (actor.biography.length > 800) {
        const arr = actor.biography.slice(0, 800).split("\n")
        const block = arr.map((el, index) => <p key={index}>{el}</p>)
        setBiography(block)
      }
      else {
        const arr = actor.biography.split("\n")
        const block = arr.map((el, index) => <p key={index}>{el}</p>)
        setBiography(block)
      }
    }
    console.log(actor.also_known_as)
    setAka(actor.also_known_as[0])
  }

  return (
    <Container className='text-white p-2' fluid={true} xl={10} lg={10} md={10} sm={10} xs={10}  >
      <Row >
        <Col xs lg={3} md={3} sm={1} className="p-2">
          {actorData.profile_path === undefined || actorData.profile_path == null ?
            <Image fluid={true} src={notFoundUrl.actor} rounded />
            :
            <Image fluid={true} src={`https://image.tmdb.org/t/p/original${actorData.profile_path}`} rounded />
          }
        </Col>
        <Col xs lg={9} md={9}>
          <Row >
            <h1 >
              {`${actorData.name} (${aka})`}
            </h1>
            <div className="font-italic">{biography}</div>
          </Row >
          Known for
          <Row className=" p-2 fixed-row-bottom">
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
      <Row className=" justify-content-md-center">
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