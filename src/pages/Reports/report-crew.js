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
  Table
} from "reactstrap";
import { isEmpty, map } from "lodash";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import {
  getReportsCrew as onGetReportCrew,
} from "store/actions"
//redux
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from "react-router-dom";
import CardInvoice from "../Invoices/card-invoice";
import classNames from "classnames";
import TableInvoice from "../Invoices/table-invoice";
import AccordionContent from "components/Accordion/Accordion";

const ReportCrew = props => {

  document.title="Crew Revenue Report | AutoPro";

  const dispatch = useDispatch()
  const history = useHistory()
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

  const [invoiceDate, setInvoiceDate] = useState(year+"-"+month+"-"+"01")
  const [generatedDate, setGereratedDate] = useState(year+"-"+month+"-"+date)

  let get_data = {
    from_date: year+"-"+month+"-"+"01",
    to_date: year+"-"+month+"-"+date,
  }

  const { report_crew } = useSelector(state => ({
    report_crew: state.Report.crewData,
  }))

  const onClickRun = () => {
      if (generatedDate!=="")get_data.to_date=generatedDate;
      if (invoiceDate!=="")get_data.from_date=invoiceDate;
      dispatch(onGetReportCrew(get_data))
  }
  useEffect(() => {
    dispatch(onGetReportCrew(get_data))
  }, [dispatch])

  const onClickNext = (data) => {
    if (generatedDate===""){
          setGereratedDate(year+"-"+month+"-"+date)
      }
      if (invoiceDate===""){
          setInvoiceDate(year+"-"+month+"-"+"01")
      }
    const url = ("/report-overview-detail/"+data+"?from_date="+(invoiceDate || (year+"-"+month+"-"+"01"))+"&to_date="+(generatedDate || year+"-"+month+"-"+date)+"&data=crew")
    window.open(url)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="AutoPro" breadcrumbItem="Crew Revenue Report" />

          <Col xl={12}>
              <Card>
                <CardBody>
                  <AccordionContent text="open me">
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
                                          value={year+"-"+month+"-"+"01" || invoiceDate}
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
                                          value={year+"-"+month+"-"+date || generatedDate}
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
                        Crew Name
                      </th>
                      <th scope="col" >Number of invoices</th>
                      <th scope="col" style={{ width: "150px" }}>Sub Total</th>
                      <th scope="col" style={{ width: "150px" }}>Gross Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                  {map(report_crew?.list_customers, (crew, key) => (
                    <tr key={key} onClick={()=>onClickNext(crew.id)}>
                      <td>{crew.username}</td>
                      <td>{crew.invoice_count}</td>
                      <td>$ {crew.total_sum}</td>
                      <td>$ {crew.gross}</td>
                    </tr>
                  ))}
                    <tr className="text-success">
                      <td><strong className="text-black">Totals</strong></td>
                      <td><strong>{report_crew?.total_count}</strong></td>
                      <td><strong>$ {report_crew?.total_all_sum}</strong></td>
                      <td><strong>$ {report_crew?.total_gross}</strong></td>
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

ReportCrew.propTypes = {
  match: PropTypes.any,
};

export default withRouter(ReportCrew);
