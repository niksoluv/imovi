import { Card, Col, Row } from "react-bootstrap"
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
      <Card className="bg-dark">
        <Row>
          <Col md='2'>
            <Card.Img style={smallImageStyle} src={`https://image.tmdb.org/t/p/w500${lastSeason?.poster_path}`} />
          </Col>
          <Col md='8'>
            <Card.Text>{lastSeason?.name}</Card.Text>
            <Card.Text>{date?.getFullYear()} {lastSeason.episode_count} episodes</Card.Text>
            <Card.Text>{lastSeason?.overview}</Card.Text>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default TVData