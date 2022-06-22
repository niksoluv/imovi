import { Card, Col, Container, Image, Row } from "react-bootstrap"
import { smallImageStyle } from "../../../variables"

const TVData = (props) => {

  const data = props.state

  let seasons = []
  let lastSeason = {}
  let date = undefined
  if (data.seasons?.length > 0) {
    seasons = data.seasons
    lastSeason = seasons[seasons.length - 1]
    date = new Date(lastSeason?.air_date)
  }

  return (
    <div>
      {data.in_production ? "Current season" : `Latest season (finished ${data.last_air_date})`}
      <div className="bg-dark">
        <Row>
          <Col xl={2} lg={2} md={2} sm={2}>
            <Image  fluid={true} style={smallImageStyle} src={`https://image.tmdb.org/t/p/w500${lastSeason?.poster_path}`} />
          </Col>
          <Col xl={8} lg={8} md={8} sm={8}>
            <Row>{lastSeason?.name}</Row>
            <Row>{date?.getFullYear()} {lastSeason.episode_count} episodes</Row>
            <Row>{lastSeason?.overview}</Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default TVData