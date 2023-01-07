import React from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import {Badge, Card, CardBody, Col, Row, UncontrolledTooltip} from "reactstrap"
import images from "assets/images"

const CardInvoice = ({ data }) => {

  const name = data.founder;
  const invoices = data;

  let status = '';
  if (data.status==='draft'){
    status = 'secondary';
  }else if (data.status==='cancel'){
    status = 'danger';
  }else if (data.status==='final'){
    status = 'success';
  }

  return (
    <React.Fragment>
      <Col xl="4" sm="6">
        <Card>
          <CardBody>
            <Row>
              <Col lg="4">
                <div className="text-lg-center">
                  {data.image ? (
                    <img
                      src={images[data.car_id.image]}
                      className="avatar-sm me-3 mx-lg-auto mb-3 mt-1 float-start float-lg-none rounded-circle"
                      alt="img"
                    />
                  ) : (
                    <div className="avatar-sm me-3 mx-lg-auto mb-3 mt-1 float-start float-lg-none rounded-circle">
                      <span
                        className={
                          "avatar-title rounded-circle bg-soft bg-" +
                          data.color +
                          " text-primary font-size-16"
                        }
                      >
                        {/*{nameIcon}*/}
                      </span>
                    </div>
                  )}

                  <h5 className="mb-1 font-size-15 text-truncate">
                    {data.car_id.model}
                  </h5>
                  <Link to="#" className="text-muted">
                    @Tract
                  </Link>
                </div>
              </Col>

              <Col lg="8">
                <div>
                  <Link
                    to={"/invoices-detail/" + data.id}
                    className="d-block text-primary text-decoration-underline mb-2"
                  >
                    Invoice #{data.id}
                  </Link>
                  <h5 className="text-truncate">{data.customer_id.email}</h5>
                  <Badge color={status} className="me-1 mb-4 mb-lg-4">
                    {data.status}
                  </Badge>
                  <ul className="list-inline mb-0">
                    <li className="list-inline-item me-3">
                      <h5 className="font-size-14" id="amountTooltip">
                        <i className="bx bx-money me-1 text-muted"/> ${" "}
                        {data.total_sum}
                        <UncontrolledTooltip
                          placement="top"
                          target="amountTooltip"
                        >
                          Amount
                        </UncontrolledTooltip>
                      </h5>
                    </li>{" "}
                    {/*<li className="list-inline-item me-3">*/}
                    {/*  <h5 className="font-size-14" id="duedateTooltip">*/}
                    {/*    <i className="bx bx-calendar me-1 text-muted" />{" "}*/}
                    {/*    {data.start_at}*/}
                    {/*    <UncontrolledTooltip*/}
                    {/*      placement="top"*/}
                    {/*      target="duedateTooltip"*/}
                    {/*    >*/}
                    {/*      Due Date*/}
                    {/*    </UncontrolledTooltip>*/}
                    {/*  </h5>*/}
                    {/*</li>*/}
                  </ul>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

CardInvoice.propTypes = {
  data: PropTypes.any,
}

export default CardInvoice
