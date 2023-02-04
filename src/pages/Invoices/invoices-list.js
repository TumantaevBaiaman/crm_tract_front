import React, { useEffect, useState } from "react"
import {
  Badge,
  Card,
  CardBody, CardTitle,
  Col,
  Container,
  Input,
  Nav,
  NavItem,
  NavLink,
  Row,
  Table,
  UncontrolledTooltip
} from "reactstrap"
import PropTypes from "prop-types"
import { Link, withRouter } from "react-router-dom"
import { map } from "lodash"

//redux
import { useSelector, useDispatch } from "react-redux"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

//Import Card invoice
import CardInvoice from "./card-invoice"
import { getInvoices as onGetInvoices } from "store/actions"
import classnames from "classnames";
import classNames from "classnames";
import StackedColumnChart from "../Dashboard/StackedColumnChart";
import API_URL from "../../helpers/api_helper";
import TableInvoice from "./table-invoice";

const InvoicesList = props => {

  document.title="Invoice List | AutoPro";

  const dispatch = useDispatch()
  if (localStorage.getItem("invoiceId")){
        localStorage.removeItem("invoiceId");
      }

  const [searchValue, setSearchValue] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [periodType, setPeriodType] = useState("");
  const [activList, setActivList] = useState("")
  const [activCard, setActivCard] = useState("active")
  const [activListTrue, setActivListTrue] = useState(false)
  const [activCardTrue, setActivCardTrue] = useState(true)

  const { invoices } = useSelector(state => ({
    invoices: state.invoices.invoices,
  }))

  useEffect(() => {
    dispatch(onGetInvoices())
  }, [dispatch])

  const filterDate = invoices.filter(invoice => {
    // return invoice.finished_at.toLowerCase().includes(searchValue.toLowerCase())

    if (startDate!=="" && endDate!==""){
      return invoice.finished_at > startDate && invoice.finished_at < endDate && invoice.status.toLowerCase().includes(periodType.toLowerCase()) && (invoice.crew_id.lastname+' '+invoice.crew_id.username).toLowerCase().includes(searchValue.toLowerCase())
    }
    if (startDate!=="" && endDate===""){
      return invoice.finished_at > startDate && invoice.status.toLowerCase().includes(periodType.toLowerCase()) && (invoice.crew_id.lastname+' '+invoice.crew_id.username).toLowerCase().includes(searchValue.toLowerCase())
    }
    if (startDate==="" && endDate!==""){
      return invoice.finished_at < endDate && invoice.status.toLowerCase().includes(periodType.toLowerCase()) && (invoice.crew_id.lastname+' '+invoice.crew_id.username).toLowerCase().includes(searchValue.toLowerCase())
    }
    else{
      return invoice.status.toLowerCase().includes(periodType.toLowerCase()) && (invoice.crew_id.lastname+' '+invoice.crew_id.username).toLowerCase().includes(searchValue.toLowerCase())
    }
  });

  const onChangeChartPeriod = (data) => {
    if (periodType !== data){
      setPeriodType(data)
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Invoices" breadcrumbItem="Invoice List" />

            <Col xl={12}>
                <Card>
                  <CardTitle className="font-size-12">
                        <div className="d-flex align-items-center">
                            <div className="mb-0 flex-grow-1">
                            </div>
                            <div className="flex-shrink-0">
                               <ul className="nav nav-pills">
                                  <NavItem>
                                    <Link
                                      className={"nav-link "+activCard}
                                      onClick={()=>{
                                          setActivCard("active");
                                          setActivList("")
                                          setActivListTrue(false)
                                          setActivCardTrue(true)
                                      }}
                                    >
                                        <i className="mdi mdi-view-grid-outline"/>
                                    </Link>
                                  </NavItem>
                                  <NavItem>
                                    <Link
                                        className={"nav-link "+activList}
                                        onClick={()=>{
                                            setActivCard("");
                                            setActivList("active")
                                            setActivListTrue(true)
                                            setActivCardTrue(false)
                                        }}
                                    >
                                        <i className="mdi mdi-format-list-bulleted"/>
                                    </Link>
                                  </NavItem>
                                </ul>
                            </div>
                        </div>
                    </CardTitle>
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
                                <Col>
                                  <label htmlFor="search-bar-0" className="search-label">
                                  <Input
                                      type="text"
                                      className="form-control"
                                      autoComplete="off"
                                      placeholder="employee"
                                      onChange={(event) => setSearchValue(event.target.value)}
                                  />
                                  </label>
                                </Col>
                              </Row>
                            </div>
                        </div>
                    </div>
                    <div className="position-relative ms-auto">
                        <div className="search-box me-xxl-2 my-3 my-xxl-0 d-inline-block">
                          <div className="position-relative">
                            <ul className="nav nav-pills">
                              <li className="nav-item">
                                <Link
                                  to="#"
                                  className={classNames(
                                    { active: periodType === "" },
                                    "nav-link"
                                  )}
                                  onClick={() => {
                                    onChangeChartPeriod("");
                                  }}
                                  id="all"
                                >
                                  All
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  to="#"
                                  className={classNames(
                                    { active: periodType === "final" },
                                    "nav-link"
                                  )}
                                  onClick={() => {
                                    onChangeChartPeriod("final");
                                  }}
                                  id="final"
                                >
                                  Final
                                </Link>{" "}
                              </li>
                              <li className="nav-item">
                                <Link
                                  to="#"
                                  className={classNames(
                                    { active: periodType === "cancel" },
                                    "nav-link"
                                  )}
                                  onClick={() => {
                                    onChangeChartPeriod("cancel");
                                  }}
                                  id="cancel"
                                >
                                  Cancel
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  to="#"
                                  className={classNames(
                                    { active: periodType === "draft" },
                                    "nav-link"
                                  )}
                                  onClick={() => {
                                    onChangeChartPeriod("draft");
                                  }}
                                  id="draft"
                                >
                                  Draft
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                    </div>
                  </div>
                  {/* <div className="clearfix"></div> */}
                  {/*<StackedColumnChart periodData={periodData} dataColors='["--bs-primary", "--bs-warning", "--bs-success"]' />*/}
                </CardBody>
              </Card>
            </Col>

          {activCardTrue &&
              <Row>
                {map(filterDate, (invoice, key) => (
                    <CardInvoice data={invoice} key={"_invoice_" + key}/>
                ))}
              </Row>
          }
          {activListTrue && <Col lg="12">
            <div className="">
              <div className="table-responsive">
                <Table className="project-list-table table-nowrap align-middle table-borderless">
                  <thead>
                    <tr className="text-white bg-info">
                      <th scope="col" style={{ width: "100px" }}>
                        Invoice
                      </th>
                      <th scope="col" >Status</th>
                      <th scope="col" >Employee</th>
                      <th scope="col">Total</th>
                      <th scope="col">Create Date</th>
                      <th scope="col" style={{ width: "100px" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterDate.map((item, key) => (
                      <tr key={key}>
                        <td>{item.id}</td>
                        <td>
                          {<TableInvoice item={item} key={"_invoice_" + key} />}
                        </td>
                        <td>
                          {item.crew_id.lastname + ' ' + item.crew_id.username}
                        </td>
                        <td>$ {item.total_sum}</td>
                        <td>{item.finished_at}</td>
                        <td>
                            <ul className="list-unstyled hstack gap-1 mb-0">

                              <li>
                                  <Link
                                      to={"/invoices-detail/" + item.id}
                                      className="btn btn-sm btn-soft-primary"
                                  >
                                      View <i className="mdi mdi-arrow-right-bold" id="deletetooltip" />
                                      <UncontrolledTooltip placement="top" target="deletetooltip">
                                          View
                                      </UncontrolledTooltip>
                                  </Link>
                              </li>
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </Col>}
        </Container>
      </div>
    </React.Fragment>
  )
}

InvoicesList.propTypes = {
  invoices: PropTypes.array,
  onGetInvoices: PropTypes.func,
}

export default withRouter(InvoicesList)
