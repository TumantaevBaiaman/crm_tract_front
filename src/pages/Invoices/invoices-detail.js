import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import {Card, CardBody, Col, Container, Row, Table, UncontrolledTooltip} from "reactstrap";
import { isEmpty, map } from "lodash";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//Import Image
import logo from "../../assets/images/logo-dark.png";
import { getInvoiceDetail as onGetInvoiceDetail } from "../../store/invoices/actions";
//redux
import { useSelector, useDispatch } from "react-redux";

const InvoiceDetail = props => {

   //meta title
  document.title="Invoice Detail | Tract System";

  const dispatch = useDispatch();

  const { invoiceDetail } = useSelector(state => ({
    invoiceDetail: state.invoices.invoiceDetail,
  }));

  const {
    match: { params },
  } = props;

  console.log(params.id)

  useEffect(() => {
    if (params && params.id) {
      dispatch(onGetInvoiceDetail(params.id));
    } else {
      dispatch(onGetInvoiceDetail(1)); //remove this after full integration
    }
  }, [params, onGetInvoiceDetail]);

  //Print the Invoice
  const printInvoice = () => {
    window.print();
  };
  console.log(invoiceDetail)

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Invoices" breadcrumbItem="Detail" />
          {!isEmpty(invoiceDetail) && (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <div className="invoice-title">
                      <h4 className="float-end font-size-16">
                        Order # {invoiceDetail.id}
                      </h4>
                      <div className="mb-4">
                        <img src={logo} alt="logo" height="20" />
                      </div>
                    </div>
                    <hr />
                    <Row>
                      <Col sm="6">
                        <address>
                          <strong>Employee To:</strong>
                          {/*{map(*/}
                          {/*  invoiceDetail.crew_id.split(","),*/}
                          {/*  (item, key) => (*/}
                          {/*    <React.Fragment key={key}>*/}
                          {/*      <span>{item}</span>*/}
                          {/*      <br />*/}
                          {/*    </React.Fragment>*/}
                          {/*  )*/}
                          {/*)}*/}
                          <br/>
                          {map(
                            invoiceDetail.crew_id,
                            (item, key) => (
                              <React.Fragment key={key}>
                                <span>{item}</span>
                                <br />
                              </React.Fragment>
                            )
                          )}
                        </address>
                      </Col>
                      <Col sm="6" className="text-sm-end">
                        <address>
                          <strong>Customer To:</strong>
                          <br />
                          {map(
                            invoiceDetail.customer_id,
                            (item, key) => (
                              <React.Fragment key={key}>
                                <span>{item}</span>
                                <br />
                              </React.Fragment>
                            )
                          )}
                        </address>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6" className="mt-3">
                        <address>
                          <strong>Payment Method:</strong>
                          <br />
                          {invoiceDetail.card}
                          <br />
                          {invoiceDetail.email}
                        </address>
                      </Col>
                      <Col sm="6" className="mt-3 text-sm-end">
                        <address>
                          <strong>Order Date:</strong>
                          <br />
                          {invoiceDetail.start_at}
                          <br />
                          <br />
                        </address>
                      </Col>
                    </Row>
                    <div className="py-2 mt-3">
                      <h3 className="font-size-15 fw-bold">Order summary</h3>
                    </div>
                    <div className="table-responsive">
                      <Table className="table-nowrap">
                        <thead>
                          <tr>
                            <th style={{ width: "70px" }}>ID.</th>
                            <th>Work</th>
                            <th className="text-end">Payment</th>
                          </tr>
                        </thead>
                        <tbody>
                          {map(
                            invoiceDetail.tasks,
                            (item, key) => (
                              <tr key={key}>
                                <td>{item.id}</td>
                                <td>{item.work}</td>
                                <td className="text-end">$ {item.payment}</td>
                              </tr>
                            )
                          )}
                          <tr>
                            <td colSpan="2" className="text-end">
                              Total
                            </td>
                            <td className="text-end">
                              $ {invoiceDetail.total_sum}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                    <div className="d-print-none">
                      <div className="float-end">
                        <Link
                            to={'/car-detail/'+invoiceDetail.car_id.id}
                            className="btn btn-info me-2"
                        >
                            <i className="mdi mdi-border-color" id="edittooltip" />
                            <UncontrolledTooltip placement="top" target="edittooltip">
                                View
                            </UncontrolledTooltip>
                        </Link>
                        <Link
                          to="#"
                          onClick={printInvoice}
                          className="btn btn-success  me-2"
                        >
                          <i className="fa fa-print" />
                        </Link>
                        <Link to="#" className="btn btn-primary w-md ">
                          Send
                        </Link>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

InvoiceDetail.propTypes = {
  match: PropTypes.any,
};

export default withRouter(InvoiceDetail);
