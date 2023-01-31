import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import {
  Badge, Button,
  Card,
  CardBody,
  Col,
  Container, DropdownItem,
  DropdownMenu,
  DropdownToggle, Input,
  Row,
  Table, UncontrolledDropdown,
  UncontrolledTooltip
} from "reactstrap";
import { isEmpty, map } from "lodash";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//Import Image
import logo from "../../assets/images/logo-dark.png";
import {
  getReportsCustomer as onGetReportCustemer,
} from "store/actions"
//redux
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from "react-router-dom";
import CardInvoice from "../Invoices/card-invoice";
import classNames from "classnames";
import TableInvoice from "../Invoices/table-invoice";

const ReportCustomer = props => {

  document.title="Customer Revenue Report | AutoPro";

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

  const dispatch = useDispatch()
  if (localStorage.getItem("invoiceId")){
        localStorage.removeItem("invoiceId");
      }

  
  const { report_customers } = useSelector(state => ({
    report_customers: state.Report.customerData,
  }))

  useEffect(() => {
    dispatch(onGetReportCustemer(get_data))
  }, [dispatch])

  console.log(report_customers)

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="AutoPro" breadcrumbItem="Customer Revenue Report" />

          <Col xl={12}>
              <Card>
                <CardBody>
                  <div className="d-sm-flex flex-wrap">
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
                                      onChange={(event) => setEndDate(event.target.value)}
                                  />
                                  </label>
                                </Col>
                              </Row>
                            </div>
                        </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>

          <Col lg="12">
            <div className="">
              <div className="table-responsive">
                <Table className="project-list-table table-nowrap align-middle table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">
                        Customer Name
                      </th>
                      <th scope="col" >Number of invoices</th>
                      <th scope="col" style={{ width: "150px" }}>SubTotal</th>
                      <th scope="col" style={{ width: "150px" }}>Gross Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                  {map(report_customers?.list_customers, (customer, key) => (
                    <tr key={key}>
                      <td>{customer.full_name}</td>
                      <td>{customer.invoice_count}</td>
                      <td>$ {customer.total_sum}</td>
                      <td>$ {customer.gross}</td>
                    </tr>
                  ))}
                  <tr>
                      <td></td>
                      <td>{report_customers?.total_count}</td>
                      <td>$ {report_customers?.total_all_sum}</td>
                      <td>$ {report_customers?.total_gross}</td>
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

ReportCustomer.propTypes = {
  match: PropTypes.any,
};

export default withRouter(ReportCustomer);
