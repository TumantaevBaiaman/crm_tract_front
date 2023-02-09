import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Row,
  Table,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";

import {
    getMyDay as onGetMyDay,
    getReportTax as onGetReportTax
} from "store/actions";
//redux
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from "react-router-dom";
import CardInvoice from "../Invoices/card-invoice";
import classNames from "classnames";
import TableInvoice from "../Invoices/table-invoice";
import AccordionContent from "components/Accordion/Accordion";

const ReportTax = props => {

  document.title="Tax Reports | AutoPro";

  const dispatch = useDispatch()
  if (localStorage.getItem("invoiceId")){
        localStorage.removeItem("invoiceId");
      }

  let newDate = new Date()
  let date_raw = newDate.getDate();
  let month_raw = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let date = ''
  let month = ''

  if (date_raw<10)  {  date ="0"+date_raw.toString()} else {  date =date_raw.toString()}
  if (month_raw<10)  {  month ="0"+month_raw.toString()} else {  month =month_raw.toString()}

  let get_data = {
      from_date: year+"-"+month+"-"+"01",
      to_date: year+"-"+month+"-"+date,
  }

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [periodType, setPeriodType] = useState("");
  const { tax } = useSelector(state => ({
    tax: state.Report.taxData,
  }))

 const onClickRun = () => {
      if (startDate!=="")get_data.from_date=startDate;
      if (endDate!=="")get_data.to_date=endDate;
      dispatch(onGetReportTax(get_data))
  }

  useEffect(() => {
    dispatch(onGetReportTax(get_data))
  }, [dispatch])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="AutoPro" breadcrumbItem="Tax Reports" />

          <Col xl={12}>
              <Card>
                <CardBody>
                  <AccordionContent text="open">
                  <div className="d-sm-flex flex-wrap">
                  <Col lg={6}>
                    <div className="position-relative">
                        <div className="search-box me-xxl-2 my-3 my-xxl-0 d-inline-block">
                          <div className="position-relative">
                            <Row>
                              <Col>
                              <label htmlFor="search-bar-0" className="search-label">
                                  <Input
                                      type="date"
                                      className="form-control"
                                      autoComplete="off"
                                      value={startDate || year+"-"+month+"-"+"01"}
                                      onChange={(event) => setStartDate(event.target.value)}
                                  />
                                  </label>
                                </Col>
                                <Col>
                              <label htmlFor="search-bar-0" className="search-label">
                                  <Input
                                      type="date"
                                      className="form-control"
                                      autoComplete="off"
                                      value={endDate || year+"-"+month+"-"+date}
                                      onChange={(event) => setEndDate(event.target.value)}
                                  />
                                  </label>
                                </Col>
                              </Row>
                            </div>
                        </div>
                    </div>
                  </Col>
                      <Col lg={6}>
                          <div className="text-sm-end">
                              <Col>
                                <button className="btn btn-success" onClick={onClickRun}>Run</button>
                              </Col>
                          </div>
                      </Col>
                  </div>
                  </AccordionContent>
                </CardBody>
              </Card>
            </Col>

          <Col lg="12">
            <div className="">
              <div className="table-responsive">
                <Table className="project-list-table table-nowrap align-middle table-borderless">
                  <thead>
                    <tr className="bg-success text-white">
                      <th scope="col">
                        Tax Name
                      </th>
                      <th scope="col" >Rate</th>
                      <th scope="col" >Number of Invoices</th>
                      <th scope="col">Invoices SubTotal</th>
                      <th scope="col">Invoices Total</th>
                      <th scope="col">Tax Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                        <td>
                            {tax?.name}
                        </td>
                        <td>
                            {tax?.rate} %
                        </td>
                        <td>
                            {tax?.invoices_count}
                        </td>
                        <td>
                            $ {tax?.subtotal}
                        </td>
                        <td>
                            $ {tax?.gross}
                        </td>
                        <td>
                            $ {tax?.tax}
                        </td>
                      </tr>
                  </tbody>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>
                                <strong>totals</strong>
                            </td>
                            <td className="text-success">
                                <strong>$ {tax?.subtotal}</strong>
                            </td>
                            <td className="text-success">
                                <strong>$ {tax?.gross}</strong>
                            </td>
                            <td className="text-success">
                                <strong>$ {tax?.tax}</strong>
                            </td>
                          </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};

ReportTax.propTypes = {
  match: PropTypes.any,
};

export default withRouter(ReportTax);
