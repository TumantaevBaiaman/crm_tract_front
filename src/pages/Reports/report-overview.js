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
import ge from "react-datepicker";

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

  const [customerActiv, setCustomerActiv] = useState(true)
  const [crewActiv, setCrewActiv] = useState(false)
  const [invoiceNumberActiv, setInvoiceNumberActiv] = useState(false)
  const [generatedDateActiv, setGeneratedDateActiv] = useState(false)
  const [invoiceDateActiv, setInvoiceDateActiv] = useState(false)

  const [startDate, setStartDate] = useState('')
  const [dataEmployee, setDataEmployee] = useState(-1)
  const [dataCustomer, setDataCustomer] = useState(-1)
  const [invoiceNumber, setInvoiceNumber] = useState('')
  const [endDate, setEndDate] = useState('')
  const [invoiceDate, setInvoiceDate] = useState('')
  const [generatedDate, setGereratedDate] = useState('')
  const [filter, setFilter] = useState("Customer")
  const { invoices } = useSelector(state => ({
    invoices: state.invoices.myDay,
  }))

  const onClickRun = () => {
      if (startDate!=="")get_data.from_date=startDate;
      if (endDate!=="")get_data.to_date=endDate;
      if (invoiceNumber!=="")get_data.number=invoiceNumber
      if (generatedDate!=="")get_data.start_at=generatedDate;
      if (invoiceDate!=="")get_data.finished_at=invoiceDate;
      if (dataEmployee!==-1)get_data.crew=dataEmployee;
      if (dataCustomer!==-1)get_data.customer_id=dataCustomer;
      dispatch(onGetMyDay(get_data));
  }

  useEffect(() => {
    dispatch(onGetInvoices());
    dispatch(onGetEmployee());
    dispatch(onGetCustomers());
  }, [dispatch])

  const onFilter = (data) => {
    setFilter(data)
    if (data==="Customer"){
        if (customerActiv!==true){
            setCustomerActiv(true)
        }
        setInvoiceNumberActiv(false)
        setCrewActiv(false)
        setGeneratedDateActiv(false)
        setInvoiceDateActiv(false)
    }else if (data==="Invoice Number"){
        if (invoiceNumberActiv!==true){
            setInvoiceNumberActiv(true)
        }
        setCustomerActiv(false)
        setCrewActiv(false)
        setGeneratedDateActiv(false)
        setInvoiceDateActiv(false)
    }else if (data==="Crew"){
        if (crewActiv!==true){
            setCrewActiv(true)
        }
        setCustomerActiv(false)
        setInvoiceNumberActiv(false)
        setGeneratedDateActiv(false)
        setInvoiceDateActiv(false)
    }else if (data==="Generated Date"){
        if (generatedDateActiv!==true){
            setGeneratedDateActiv(true)
        }
        setCustomerActiv(false)
        setInvoiceNumberActiv(false)
        setCrewActiv(false)
        setInvoiceDateActiv(false)
    }else if (filter==="Invoice Date"){
        if (invoiceDateActiv!==true){
            setInvoiceDateActiv(true)
        }
        setCustomerActiv(false)
        setInvoiceNumberActiv(false)
        setCrewActiv(false)
        setGeneratedDateActiv(false)
    }
  }

  useEffect(() => {
    dispatch(onGetMyDay(get_data))
  }, [dispatch])

  const onClickCustomer = (data) => {
      setDataCustomer(data);
      setDataEmployee(-1);
      setInvoiceNumber("");
      setInvoiceDate("");
      setGereratedDate("")
  }

  const onClickCrew = (data) => {
      setDataEmployee(data);
      setDataCustomer(-1);
      setInvoiceNumber("");
      setInvoiceDate("");
      setGereratedDate("")
  }

  const onClickGDate = (data) => {
      setDataCustomer(-1);
      setDataEmployee(-1);
      setInvoiceNumber("");
      setInvoiceDate("");
      setGereratedDate(data)
  }

  const onClickIDate = (data) => {
      setDataCustomer(-1);
      setDataEmployee(-1);
      setInvoiceNumber("");
      setInvoiceDate(data);
      setGereratedDate("")
  }

  const onClickNumber = (data) => {
      setDataCustomer(-1);
      setDataEmployee(-1);
      setInvoiceNumber(data);
      setInvoiceDate("");
      setGereratedDate("")
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="AutoPro" breadcrumbItem="Invoices Customer" />

          <Col xl={12}>
              <Card>
                <CardBody>
                  <div className="d-sm-flex flex-wrap">
                    <Col lg={4}>
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
                    </Col>
                      <Col lg={6}>
                          <div className="position-relative text-end">
                            <div className="me-xxl-2 my-3 my-xxl-0 d-inline-block">
                              <div className="position-relative">
                                <Row>
                                  <Col>
                                  <UncontrolledDropdown>
                                      <DropdownToggle color="success" type="button" className="w-xl font-size-12">
                                          {filter}  <i className="mdi mdi-filter"></i>
                                      </DropdownToggle>
                                      <DropdownMenu>
                                        <DropdownItem onClick={() => onFilter("Customer")}>Customer</DropdownItem>
                                        <DropdownItem onClick={() => onFilter("Invoice Number")}>Invoice Number</DropdownItem>
                                        <DropdownItem onClick={() => onFilter("Crew")}>Crew</DropdownItem>
                                        <DropdownItem onClick={() => onFilter("Generated Date")}>Generated Date</DropdownItem>
                                        <DropdownItem onClick={() => onFilter("Invoice Date")}>Invoice Date</DropdownItem>
                                      </DropdownMenu>
                                    </UncontrolledDropdown>
                                  </Col>
                                    <Col>
                                        {customerActiv ?
                                            <select
                                                className="w-lg form-control select2 mb-3 mb-xxl-0 w-xl"
                                                onChange={(event => {
                                                    if (event.target.value!=="Customer"){
                                                        onClickCustomer(event.target.value)
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
                                          </select> : null
                                        }
                                        {invoiceNumberActiv ?
                                            <Input type="text" className="w-lg form-control" onChange={event => onClickNumber(event.target.value)}/> : null
                                        }
                                        {crewActiv ?
                                            <select
                                              className="w-lg form-control select2 mb-3 mb-xxl-0 w-xl"
                                              onChange={(event => {
                                                  if (event.target.value!=="Employee"){
                                                      onClickCrew(event.target.value)
                                                  }else {
                                                      setDataEmployee('')
                                                  }
                                              })}
                                          >
                                            <option>Employee</option>
                                              {employee.map(option => (
                                                      <option key={option.id} value={option.id} >
                                                          {option.lastname} {option?.username[0]}
                                                      </option>
                                                  ))}
                                        </select> : null
                                        }
                                        {generatedDateActiv ?
                                            <Input type="date" className="form-control" onChange={event => onClickGDate(event.target.value)}/> : null
                                        }
                                        {invoiceDateActiv ?
                                            <Input type="date" className="form-control" onChange={event => onClickIDate(event.target.value)}/> : null
                                        }
                                    </Col>
                                </Row>
                              </div>
                            </div>
                          </div>
                      </Col>
                      <Col lg={2}>
                          <div className="position-relative text-end">
                            <div className="me-xxl-2 my-3 my-xxl-0 d-inline-block">
                              <div className="position-relative">
                                <Row>
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
                  { invoices ?
                      <>
                      {map(Array.from(invoices).slice(0,-1), (invoice, key) => (
                        <Table key={key} className="project-list-table table-nowrap align-middle table-borderless">
                          <thead>
                            <tr className="bg-success text-white">
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
                            <tr >
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                                <td><strong>Total</strong></td>
                                <td><strong className="text-success">$ {invoice.total_sum_invoice}</strong></td>
                            </tr>
                          </tbody>
                        </Table>
                      ))}
                      </>
                  : null }
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
