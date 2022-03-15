import { useEffect, useState } from "react"
import { Button, Dropdown, Modal } from "react-bootstrap"
import YouTube from "react-youtube"
import { getVideos } from "../../../storeAsyncActions/movies"

const VideoModal = (props) => {

  const movieData = props.state
  const [videos, setVideos] = useState([])
  const [choice, setChoice] = useState({})

  const opts = {
    width: 'auto',
    height: 'auto',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  useEffect(() => {
    getVideos(movieData).then(res => {
      setVideos(res.results)
      setChoice(res.results[0])
      console.log(res)
    })
  }, [props])

  return (
    <Modal
      {...props}
      xs={'auto'}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h5>"{choice?.name}" trailer</h5>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
              {choice?.name}
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">
              {videos?.map(el => {
                return <Dropdown.Item key={el.id} onClick={() => {
                  console.log('fff')
                  setChoice(el)
                }}>{el.name}</Dropdown.Item>
              })}
            </Dropdown.Menu>
          </Dropdown>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <YouTube
          videoId={choice?.key}
          opts={opts}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal >
  )
}

export default VideoModal