import axios from "axios"
import { Col, Container, Row } from "react-bootstrap"
import { variables } from "../variables"

export const getLists = async () => {
  let response = await axios.get(`${variables.DEFAULT_URL}CustomLists/lists`,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
    })
  return response.data
}

export const createList = async (list) => {
  let response = await axios.post(`${variables.DEFAULT_URL}CustomLists/create`,
    list,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
    })
  return response.data
}

export const mapLists = (lists) => {
  const res = lists.map(list => {
    return (
      <div class="alert alert-primary m-1 p-1">
        <Container fluid>
          <Row>
            <Col className="my-auto">
              {list}
            </Col>
            <Col xl={2} lg={2} md={2} sm={2} xs={2} className="d-flex justify-content-end">
              <button className="btn btn-danger"><i class="fa-solid fa-check"></i></button>
              <button className="btn btn-danger"><i class="fa-solid fa-ban"></i></button>
              <button className="btn btn-danger"><i class="fa-solid fa-trash-can"></i></button>
            </Col>
          </Row>
        </Container>
      </div>
    )
  })
  return res
}