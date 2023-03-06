import React, { useEffect, useState } from "react"
import {
    Card,
    CardBody,
    Col,
    Container,
    Input, Label,
    Row,
    Table
} from "reactstrap"
import PropTypes from "prop-types"
import {Link, useHistory, withRouter} from "react-router-dom"
import { map } from "lodash"

import { useSelector, useDispatch } from "react-redux"

import CardInvoice from "../Invoices/card-invoice";
import {
    getCustomers as onGetEmployee,
    getCustomersData as onGetCustomers,
    invoiceMyDay as onInvoiceMyDay,
} from "store/actions"
import ListInvoices from "../Invoices/list-invoice";
import AccordionContent from "components/Accordion/Accordion"

const MyDayDashboard = props => {

  const dispatch = useDispatch()
  const history = useHistory()
  if (localStorage.getItem("invoiceId")){
    localStorage.removeItem("invoiceId");
  }

  const [searchValue, setSearchValue] = useState('')
  const [startDate, setStartDate] = useState('')
  const [dataEmployee, setDataEmployee] = useState(-1)
  const [dataCustomer, setDataCustomer] = useState(-1)
  const [endDate, setEndDate] = useState('')
  const [periodType, setPeriodType] = useState("");
  const [activList, setActivList] = useState("")
  const [activCard, setActivCard] = useState("active")
  const [activListTrue, setActivListTrue] = useState(false)
  const [activCardTrue, setActivCardTrue] = useState(true)

  const { invoices } = useSelector(state => ({
    invoices: state.invoices.invoicesMyDay,
  }))

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
    from_date: year+"-"+month+"-"+date,
    to_date: year+"-"+month+"-"+date,
    crew_id: null,
    customer_id: null
    }
  useEffect(() => {
    dispatch(onInvoiceMyDay(get_data));
    dispatch(onGetEmployee());
    dispatch(onGetCustomers());
  }, [dispatch])

  const onClickRun = () => {
      if (startDate!=="")get_data.from_date=startDate;
      if (endDate!=="")get_data.to_date=endDate;
      if (dataEmployee!==-1)get_data.crew_id=dataEmployee;
      if (dataCustomer!==-1)get_data.customer_id=dataCustomer;
      dispatch(onInvoiceMyDay(get_data));
  }

  const onClickToday = () => {
      setStartDate(year+"-"+month+"-"+date)
      setEndDate(year+"-"+month+"-"+date);
      get_data.from_date=year+"-"+month+"-"+date;
      get_data.to_date=year+"-"+month+"-"+date;
      // dispatch(onInvoiceMyDay(get_data));
  }

  const onChangeChartPeriod = (data) => {
    if (periodType !== data){
      setPeriodType(data)
    }
  }

  useEffect(() => {
    dispatch(onInvoiceMyDay(get_data));
  }, [dispatch])

  const filterData = invoices?.invoices?.filter(invoice => {
      return invoice.status.toLowerCase().includes(periodType.toLowerCase())
  })

  let isAdmin = false;
  if (localStorage.getItem("status_user")){
    if(localStorage.getItem("status_user")==="admin"){
      isAdmin=true
    }
  }

  return (
      <React.Fragment>
          <div className="page-content">
            <Container fluid>
                <AccordionContent text="open">
                <Col lg={12}>
                    <Row className="display-inline-flex">
                        {/*<Col lg={3} className="float-start">*/}
                        {/*    <div className="mb-3 text-start">*/}
                        {/*        <button className="btn btn-success w-lg" onClick={onClickRun}>Search By Range</button>*/}
                        {/*    </div>*/}
                        {/*</Col>*/}
                      {/*<Col>*/}
                      {/*    <div className="d-inline-flex align-center">*/}
                      {/*      <Label className="form-label align-center mt-2">OpenDate</Label>*/}
                      {/*        <Input*/}
                      {/*            type="date"*/}
                      {/*            className="form-control w-md ms-2"*/}
                      {/*            autoComplete="off"*/}
                      {/*            value={startDate || year+"-"+month+"-"+date}*/}
                      {/*            onChange={(event) => setStartDate(event.target.value)}*/}
                      {/*        />*/}
                      {/*    </div>*/}
                      {/*  </Col>*/}
                        <Col lg={8}>
                            <div className="mb-3 d-flex">
                                <div className="text-start me-4">
                                    <button className="btn btn-success w-lg form-control" onClick={onClickRun}>Search By Range</button>
                                </div>
                                <div className="d-inline-flex ms-4">
                                    <Label className="form-label align-center mt-2">OpenDate</Label>
                                      <Input
                                          type="date"
                                          className="form-control w-md ms-2"
                                          autoComplete="off"
                                          value={startDate || year+"-"+month+"-"+date}
                                          onChange={(event) => setStartDate(event.target.value)}
                                      />
                                </div>
                                <div className="d-inline-flex ms-4">
                                <Label className="form-label align-center mt-2">CloseDate</Label>
                                  <Input
                                      type="date"
                                      className="form-control w-md ms-2"
                                      autoComplete="off"
                                      value={endDate || year+"-"+month+"-"+date}
                                      onChange={(event) => setEndDate(event.target.value)}
                                  />
                                </div>
                            </div>
                        </Col>
                        {/*<Col className="ms-4">*/}
                        {/*    <div className="text-center">*/}
                        {/*        <button className="btn btn-success w-md" onClick={onClickToday}>Today</button>*/}
                        {/*    </div>*/}
                        {/*</Col>*/}
                        <Col lg={4} className="float-end">
                            <div className="text-end d-flex">
                                <button className="btn btn-success w-md me-4 form-control" onClick={onClickToday}>Today</button>
                                <button className="btn btn-success w-md form-control" onClick={onClickRun}>Run</button>
                            </div>
                        </Col>
                      </Row>
                  {/*  <Card>*/}
                  {/*  <CardBody>*/}
                  {/*    <div className="d-sm-flex flex-wrap">*/}
                  {/*        <Col lg={12}>*/}
                  {/*          <div className="position-relative">*/}
                  {/*              <div className="me-xxl-2 my-3 my-xxl-0 d-inline-block">*/}
                  {/*                <div className="position-relative">*/}
                  {/*                  <Row>*/}
                  {/*                    <Col>*/}
                  {/*                        <div className="d-inline-flex align-center">*/}
                  {/*                          <Label className="form-label align-center mt-2">OpenDate</Label>*/}
                  {/*                            <Input*/}
                  {/*                                type="date"*/}
                  {/*                                className="form-control w-md ms-2"*/}
                  {/*                                autoComplete="off"*/}
                  {/*                                value={startDate || year+"-"+month+"-"+date}*/}
                  {/*                                onChange={(event) => setStartDate(event.target.value)}*/}
                  {/*                            />*/}
                  {/*                        </div>*/}
                  {/*                      </Col>*/}
                  {/*                      <Col>*/}
                  {/*                      <div className="mb-3 d-inline-flex">*/}
                  {/*                          <Label className="form-label align-center mt-2">CloseDate</Label>*/}

                  {/*                        <Input*/}
                  {/*                            type="date"*/}
                  {/*                            className="form-control w-md ms-2"*/}
                  {/*                            autoComplete="off"*/}
                  {/*                            value={endDate || year+"-"+month+"-"+date}*/}
                  {/*                            onChange={(event) => setEndDate(event.target.value)}*/}
                  {/*                        />*/}
                  {/*                      </div>*/}
                  {/*                      </Col>*/}
                  {/*                      <Col className="float-end">*/}
                  {/*                          <div className="text-end">*/}
                  {/*                              <button className="btn btn-success w-md" onClick={onClickRun}>Run</button>*/}
                  {/*                          </div>*/}
                  {/*                      </Col>*/}
                  {/*                    </Row>*/}
                  {/*                  </div>*/}
                  {/*              </div>*/}
                  {/*          </div>*/}
                  {/*        </Col>*/}
                  {/*        /!*<Col lg={2}>*!/*/}
                  {/*        /!*    <div className="position-relative">*!/*/}
                  {/*        /!*      <div className="search-box me-xxl-2 my-3 my-xxl-0 d-inline-block">*!/*/}
                  {/*        /!*        <div className="position-relative">*!/*/}
                  {/*        /!*            {isAdmin ?*!/*/}
                  {/*        /!*            <Row>*!/*/}
                  {/*        /!*                <Col>*!/*/}
                  {/*        /!*                    <select*!/*/}
                  {/*        /!*                        className="form-control select2 mb-3 mb-xxl-0 w-xl"*!/*/}
                  {/*        /!*                        onChange={(event => {*!/*/}
                  {/*        /!*                            if (event.target.value !== "Select Employee") {*!/*/}
                  {/*        /!*                                setDataEmployee(event.target.value)*!/*/}
                  {/*        /!*                            } else {*!/*/}
                  {/*        /!*                                setDataEmployee(-1)*!/*/}
                  {/*        /!*                            }*!/*/}
                  {/*        /!*                        })}*!/*/}
                  {/*        /!*                    >*!/*/}
                  {/*        /!*                        <option>Select Employee</option>*!/*/}
                  {/*        /!*                        {*!/*/}
                  {/*        /!*                            employee.map(option => (*!/*/}
                  {/*        /!*                                <option key={option.id} value={option.id}>*!/*/}
                  {/*        /!*                                    {option?.lastname || ""} {option?.username?.[0] || ""}*!/*/}
                  {/*        /!*                                </option>*!/*/}
                  {/*        /!*                            ))*!/*/}
                  {/*        /!*                        }*!/*/}
                  {/*        /!*                    </select>*!/*/}
                  {/*        /!*                </Col>*!/*/}
                  {/*        /!*            </Row>: null*!/*/}
                  {/*        /!*            }*!/*/}
                  {/*        /!*        </div>*!/*/}
                  {/*        /!*      </div>*!/*/}
                  {/*        /!*    </div>*!/*/}
                  {/*        /!*</Col>*!/*/}
                  {/*        /!*<Col lg={2}>*!/*/}
                  {/*        /!*    <div className="text-sm-end">*!/*/}
                  {/*        /!*      <button className="btn btn-success w-md" onClick={onClickRun}>Run</button>*!/*/}
                  {/*        /!*    </div>*!/*/}
                  {/*        /!*</Col>*!/*/}
                  {/*    </div>*/}
                  {/*  </CardBody>*/}
                  {/*</Card>*/}
                </Col>
                </AccordionContent>

                {activCardTrue && <Row>
                    {map(filterData, (invoice, key) => (
                        <CardInvoice data={invoice} history={history} key={"_invoice_" + key}/>
                    ))}
                </Row>}
                {activListTrue &&
                    <Row>
                        <Col lg="12">
                            <div className="">
                                <div className="table-responsive">
                                    <Table className="project-list-table table-nowrap align-middle table-borderless">
                                        <thead>
                                        <tr className="text-white bg-info">
                                            <th scope="col" style={{width: "100px"}}>
                                                Image Car
                                            </th>
                                            <th scope="col" style={{width: "150px"}}>
                                                Invoice
                                            </th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Employee</th>
                                            <th scope="col">Total</th>
                                            <th scope="col">Create Date</th>
                                            <th scope="col" style={{width: "100px"}}>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {map(filterData, (invoice, key) => (
                                            <ListInvoices item={invoice} history={history} key={"_invoice_" + key}/>
                                        ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </Col>
                    </Row>
                }
            </Container>
          </div>
      </React.Fragment>
  )
}

MyDayDashboard.propTypes = {
  invoices: PropTypes.array,
  onGetInvoices: PropTypes.func,
}

export default withRouter(MyDayDashboard)
