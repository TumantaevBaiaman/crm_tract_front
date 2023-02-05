import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

//Images
import client1 from "../../../../assets/images/clients/1.png";
import client2 from "../../../../assets/images/clients/2.png";
import client3 from "../../../../assets/images/clients/3.png";
import client4 from "../../../../assets/images/clients/4.png";
import client5 from "../../../../assets/images/clients/5.png";
import client6 from "../../../../assets/images/clients/6.png";

//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from "swiper";
import "../../../../../node_modules/swiper/swiper.scss";

const AboutUs = () => {

  return (
    <React.Fragment>
      <section className="section pt-4 bg-white" id="about">
        <Container>
          <Row>
            <Col lg="12">
              <div className="text-center mb-5">
                <div className="small-title">About us</div>
                <h4>What is AutoPro?</h4>
              </div>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col lg="5">
              <div className="text-muted">
                <h4>Best ICO for your cryptocurrency business</h4>
                <p>
                  An 'About Us' page is a spot for your founding story, a place to show off your business wins, and a sales page that answers the most pressing question new customers have about your business.

What an 'About Us' page should be is a goal-oriented sales page, one that focuses on highlighting the biggest selling points of your story and brand at the top of the page, making a strong first impression on curious customers
                </p>
                <p className="mb-4">
                  It would be necessary to have uniform pronunciation.
                </p>

              </div>
            </Col>

            <Col lg="6" className="ms-auto">
              <div className="mt-4 mt-lg-0">
                <Row>
                  <Col sm="6">
                    <Card className="border">
                      <CardBody>
                        <div className="mb-3">
                          <i className="mdi mdi-bitcoin h2 text-success" />
                        </div>
                        <h5>Lending</h5>
                        <p className="text-muted mb-0">
                          At vero eos et accusamus et iusto blanditiis
                        </p>
                      </CardBody>
                      <div className="card-footer bg-transparent border-top text-center">
                        <Link to="#" className="text-primary">
                          Learn more
                        </Link>
                      </div>
                    </Card>
                  </Col>
                  <Col sm="6">
                    <Card className="border mt-lg-5">
                      <CardBody>
                        <div className="mb-3">
                          <i className="mdi mdi-wallet-outline h2 text-success" />
                        </div>
                        <h5>Wallet</h5>
                        <p className="text-muted mb-0">
                          Quis autem vel eum iure reprehenderit
                        </p>
                      </CardBody>
                      <div className="card-footer bg-transparent border-top text-center">
                        <Link to="#" className="text-primary">
                          Learn more
                        </Link>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>

        </Container>
      </section>
    </React.Fragment>
  );
};

export default AboutUs;
