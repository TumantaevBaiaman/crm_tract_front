import React from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Col, DropdownItem, DropdownMenu, DropdownToggle,
  Row,
  UncontrolledDropdown,
  UncontrolledTooltip
} from "reactstrap"
import images from "assets/images"
import API_URL from "../../helpers/api_helper";
import wechat from "../../assets/images/companies/wechat.svg";

const CardInvoice = ({ data }) => {

  let status = '';
  let icon = '';
  if (data.status==='draft'){
    status = 'secondary';
    icon = "mdi mdi-alert-circle-outline me-2";
  }else if (data.status==='cancel'){
    status = 'danger';
    icon = "mdi mdi-block-helper me-2";
  }else if (data.status==='final'){
    status = 'success';
    icon = "mdi mdi-check-all me-2";
  }

  return (
    <React.Fragment>
      <Col xl="4" sm="4">
        <Card>
          <CardBody>

            <Row>
                <Col lg={12}>
                    <div className="vstack gap-6">
                        <div className="d-flex">
                            <div className="vstack gap-6">
                                <div className="d-flex">
                                        <Col lg="3">
                                            <div className="text-lg-start">
                                                <img src={API_URL+data.car_id.image} alt="" width="70" className="rounded" />
                                            </div>
                                        </Col>
                                        <Col lg="9">
                                        <div className="ms-2 flex-grow-1">
                                            <h6 className="mb-1 font-size-15">{data.customer_id.full_name}</h6>
                                            <p><i className="bx bx-user-circle me-1 text-primary"/>{data.crew_id.lastname} {data.crew_id.username}</p>
                                            <ul className="list-inline mb-0">
                                              <li className="list-inline-item me-3">
                                                <h5 className="font-size-14" id="amountTooltip">
                                                  <i className="bx bx-money me-1 text-success"/> ${" "}
                                                  {data.total_sum}
                                                  <UncontrolledTooltip
                                                    placement="top"
                                                    target="amountTooltip"
                                                  >
                                                    Amount
                                                  </UncontrolledTooltip>
                                                </h5>
                                              </li>{" "}
                                              <li className="list-inline-item me-3">
                                                <h5 className="font-size-14" id="duedateTooltip">
                                                  <i className="bx bx-calendar me-1 text-primary" />{" "}
                                                  {data.finished_at.substring(0,10)}
                                                  <UncontrolledTooltip
                                                    placement="top"
                                                    target="duedateTooltip"
                                                  >
                                                    Date
                                                  </UncontrolledTooltip>
                                                </h5>
                                              </li>
                                            </ul>
                                        </div>
                                    </Col>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
              <Row>
                  <Col xs="3">
                      <div className="text-lg-start">
                            <h6 className="font-size-16">
                                <Badge color={status} className="w-auto">
                                    {data.status}
                                </Badge>
                            </h6>
                        </div>
                  </Col>
                  <Col xs="6">
                      <div className="text-center">
                            <h6 className=" font-size-16">
                                {data.number}
                            </h6>
                        </div>
                  </Col>
                  <Col xs="3">
                      <div className="text-end">
                            <Link
                                to={"/invoices-detail/" + data.id}
                                className="btn-sm btn-info font-size-16"
                            >
                                <i className="mdi mdi-arrow-right-circle-outline" id="edittooltip" />
                                <UncontrolledTooltip placement="top" target="edittooltip">
                                    Next
                                </UncontrolledTooltip>
                            </Link>
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
