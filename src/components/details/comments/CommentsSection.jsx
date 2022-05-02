import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

const CommentsSection = () => {

  return (
    <div>
      <section>
        <Container className="container text-dark">
          <Row className="row d-flex justify-content-center">
            <Col className="col-md-10 col-lg-8 col-xl-6">
              <Card className="card">
                <Card.Body className="card-body p-4">
                  <div className="d-flex flex-start w-100">
                    <img className="rounded-circle shadow-1-strong me-3"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(21).webp" alt="avatar" width="65"
                      height="65" />
                    <div className="w-100">
                      <h5>Add a comment</h5>
                      <div className="form-outline">
                        <textarea className="form-control" id="textAreaExample" rows="4"></textarea>
                        <label className="form-label" for="textAreaExample">What is your view?</label>
                      </div>
                      <div className="d-flex justify-content-between mt-3">
                        <button type="button" className="btn btn-success">Danger</button>
                        <button type="button" className="btn btn-danger">
                          Send <i className="fas fa-long-arrow-alt-right ms-1"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <Container className="p-s">
          <Row className="d-flex justify-content-center">
            <Col className="md-12 col-lg-10">
              <Card className="text-dark">
                <Card.Body className="p-4">
                  <h4 className="fw-light mb-4 pb-2">Recent comments</h4>

                  <div className="d-flex flex-start">
                    <img className="rounded-circle shadow-1-strong me-3"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(23).webp" alt="avatar" width="60"
                      height="60" />
                    <div>
                      <h6 className="fw-bold mb-1">username</h6>
                      <div className="d-flex align-items-center mb-3">
                        <p className="mb-0">
                          March 07, 2021
                          <span className="badge bg-primary">Pending</span>
                        </p>
                        <i class="fas fa-user"></i>
                        <a href="#!" className="link-muted"><i className="fas fa-pencil-alt "></i></a>
                        <a href="#!" className="link-muted"><i className="fas fa-redo-alt ms-2"></i></a>
                        <a href="#!" className="link-muted"><i className="fas fa-heart ms-2"></i></a>
                      </div>
                      <p className="mb-0">
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard dummy text ever
                        since the 1500s, when an unknown printer took a galley of type and
                        scrambled it.
                      </p>
                    </div>
                  </div>
                </Card.Body>

                <hr className="my-0" />
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default CommentsSection