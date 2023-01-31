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
import {
  getCustomers as onGetEmployee,
  getCustomersData as onGetCustomers,
  getInvoiceDetail as onGetInvoiceDetail,
  getMyDay as onGetMyDay,
  getInvoices as onGetInvoices,
} from "store/actions"
//redux
import { useSelector, useDispatch } from "react-redux";

const ReportOverview = props => {

  document.title="Invoice Report Overview | AutoPro";

  const dispatch = useDispatch()
  if (localStorage.getItem("invoiceId")){
        localStorage.removeItem("invoiceId");
      }

  const { employee } = useSelector(state => ({
    employee: state.ecommerce.customers,
  }));

  const { customers } = useSelector(state => ({
    customers: state.Customer.customers,
  }));

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
      crew: null,
      car_id: null,
      customer_id: null,
      number: null,
      finished_at: null,
      start_at: null,
      page: null,
      page_size: null,
  }

  const [startDate, setStartDate] = useState('')
  const [dataEmployee, setDataEmployee] = useState(-1)
  const [dataCustomer, setDataCustomer] = useState(-1)
  const [endDate, setEndDate] = useState('')
  const [invoiceDate, setInvoiceDate] = useState('')
  const [generatedDate, setGereratedDate] = useState('')
  const [filter, setFilter] = useState("Customer")
  const { invoices } = useSelector(state => ({
    invoices: state.invoices.myDay,
  }))

  const onClickRun = () => {
      if (startDate!=="")get_data.start_at=startDate;
      if (endDate!=="")get_data.finished_at=endDate;
      if (generatedDate!=="")get_data.to_date=generatedDate;
      if (invoiceDate!=="")get_data.from_date=invoiceDate;
      if (dataEmployee!==-1)get_data.crew=dataEmployee;
      if (dataCustomer!==-1)get_data.customer_id=dataCustomer;
      dispatch(onGetMyDay(get_data));
  }

  useEffect(() => {
    dispatch(onGetInvoices());
    dispatch(onGetEmployee());
    dispatch(onGetCustomers());
  }, [dispatch])

  // console.log(invoices)
  // console.log(invoices?.results[0]?.invoices && JSON.parse(invoices?.results[0]?.invoices))
  // console.log(invoices?.results && JSON.parse(invoices?.results[0]?.invoices))
  // console.log(invoices)

  const onFilter = () => {
    if (filter==="Customer"){return(
      <>
        <select
            className="form-control select2 mb-3 mb-xxl-0 w-xl"
            onChange={(event => {
                console.log(event.target.value)
                if (event.target.value!=="Customer"){
                    setDataCustomer(event.target.value)
                }else {
                    setDataCustomer('')}
            })}
        >
          <option>Customer</option>
          {
                customers.map(option => (
                    <option key={option.id} value={option.id}>
                        {option.full_name}
                    </option>
                ))}
      </select>
      </>
    )}else if (filter==="Invoice Number"){return(
      <>
        <Input type="text" className="form-control"/>
      </>
    )}else if (filter==="Crew"){return(
      <>
        <select
              className="form-control select2 mb-3 mb-xxl-0 w-xl"
              onChange={(event => {
                  if (event.target.value!=="Employee"){
                      setDataEmployee(event.target.value)
                  }else {
                      setDataEmployee('')
                  }
              })}
          >
            <option>Employee</option>
              {employee.map(option => (
                      <option key={option.id} value={option.id}>
                          {option.lastname} {option.username}
                      </option>
                  ))}
        </select>
      </>
    )}else if (filter==="Generated Date"){return(
      <>
        <Input type="date" className="form-control" onChange={event => setGereratedDate(event.target.value)}/>
      </>
    )}else if (filter==="Invoice Date"){return(
      <>
        <Input type="date" className="form-control" onChange={event => setInvoiceDate(event.target.value)}/>
      </>
    )}
  }

  useEffect(() => {
    dispatch(onGetMyDay(get_data))
  }, [dispatch])

  console.log(invoices)

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="AutoPro" breadcrumbItem="Invoices Customer" />

          <Col xl={12}>
              <Card>
                <CardBody>
                  <div className="d-sm-flex flex-wrap">
                    <Col lg={6}>
                    <div className="position-relative">
                        <div className=" me-xxl-2 my-3 my-xxl-0 d-inline-block">
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
                    </Col>
                      <Col lg={6}>
                          <div className="position-relative text-end">
                            <div className=" me-xxl-2 my-3 my-xxl-0 d-inline-block">
                              <div className="position-relative">
                                <Row>
                                  <Col>
                                  <UncontrolledDropdown>
                                      <DropdownToggle color="success" type="button" className="w-lg font-size-12">
                                          {filter}  <i className="mdi mdi-filter"></i>
                                      </DropdownToggle>
                                      <DropdownMenu>
                                        <DropdownItem onClick={event => setFilter("Customer")}>Customer</DropdownItem>
                                        <DropdownItem onClick={event => setFilter("Invoice Number")}>Invoice Number</DropdownItem>
                                        <DropdownItem onClick={event => setFilter("Crew")}>Crew</DropdownItem>
                                        <DropdownItem onClick={event => setFilter("Generated Date")}>Generated Dat</DropdownItem>
                                        <DropdownItem onClick={event => setFilter("Invoice Date")}>Invoice Date</DropdownItem>
                                      </DropdownMenu>
                                    </UncontrolledDropdown>
                                  </Col>
                                    <Col>
                                        {onFilter()}
                                    </Col>
                                    <Col>
                                    <button className="btn btn-success" onClick={onClickRun}>Run</button>
                                    </Col>
                                </Row>
                              </div>
                            </div>
                          </div>
                      </Col>
                  </div>
                </CardBody>
              </Card>
            </Col>

          <Col lg="12">
            <div className="">
              <div className="table-responsive">
                  {map(invoices, (invoice, key) => (
                    <Table key={key} className="project-list-table table-nowrap align-middle table-borderless">
                      <thead>
                        <tr>
                          <th scope="col" style={{width: "200px"}}>
                              {invoice?.customer_name}
                          </th>
                          <th scope="col" >Crew</th>
                          <th scope="col" >Number</th>
                          <th scope="col" >Generated Date</th>
                          <th scope="col">Invoice date</th>
                          <th scope="col" style={{width: "100px"}}>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {map(invoice?.invoices, (task, key2) => (
                        <tr key={key2}>
                          <td></td>
                          <td>{task?.crew_id.username}</td>
                          <td>{task?.number}</td>
                          <td>{task?.finished_at}</td>
                          <td>{task?.start_at}</td>
                          <td>$ {task?.total_sum}</td>
                        </tr>
                        ))}
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>Total</td>
                          <td>$ {invoice.total_sum}</td>
                        </tr>
                      </tbody>
                    </Table>
                  ))}
              </div>
            </div>
          </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};

ReportOverview.propTypes = {
  match: PropTypes.any,
};

export default withRouter(ReportOverview);
