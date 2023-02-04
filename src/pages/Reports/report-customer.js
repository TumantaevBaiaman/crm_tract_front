import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Row,
  Table,
} from "reactstrap";
import { map } from "lodash";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import {
  getReportsCustomer as onGetReportCustemer,
} from "store/actions"
//redux
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from "react-router-dom";

const ReportCustomer = props => {

  document.title="Customer Revenue Report | AutoPro";

  const history = useHistory()

  const [invoiceDate, setInvoiceDate] = useState('')
  const [generatedDate, setGereratedDate] = useState('')

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

  const onClickRun = () => {
      if (generatedDate!=="")get_data.to_date=generatedDate;
      if (invoiceDate!=="")get_data.from_date=invoiceDate;
      dispatch(onGetReportCustemer(get_data))
  }

  useEffect(() => {
    dispatch(onGetReportCustemer(get_data))
  }, [dispatch])

  const onClickNext = (data) => {
      if (generatedDate===""){
          setGereratedDate(year+"-"+month+"-"+date)
      }
      if (invoiceDate===""){
          setInvoiceDate(year+"-"+month+"-"+"01")
      }
      const url = ("/report-overview-detail/"+data+"?from_date="+invoiceDate+"&to_date="+generatedDate+"&data=customer")
      window.open(url)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="AutoPro" breadcrumbItem="Customer Revenue Report" />

          <Col xl={12}>
              <Card>
                <CardBody>
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
                                        onChange={(event) => setInvoiceDate(event.target.value)}
                                    />
                                    </label>
                                  </Col>
                                  <Col>
                                <label htmlFor="search-bar-0" className="search-label">
                                    <Input
                                        type="date"
                                        className="form-control"
                                        autoComplete="off"
                                        onChange={(event) => setGereratedDate(event.target.value)}
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
                        Customer Name
                      </th>
                      <th scope="col" >Number of invoices</th>
                      <th scope="col" style={{ width: "150px" }}>SubTotal</th>
                      <th scope="col" style={{ width: "150px" }}>Gross Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                  {map(report_customers?.list_customers, (customer, key) => (
                    <tr key={key} onClick={()=>onClickNext(customer.id)}>
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
