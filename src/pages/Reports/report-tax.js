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
  getInvoiceDetail as onGetInvoiceDetail,
  getInvoiceCustomer as onGetInvoiceCustomer, getInvoices as onGetInvoices,
} from "../../store/invoices/actions";
//redux
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from "react-router-dom";
import CardInvoice from "../Invoices/card-invoice";
import classNames from "classnames";
import TableInvoice from "../Invoices/table-invoice";

const ReportTax = props => {

  document.title="Tax Reports | AutoPro";

  const dispatch = useDispatch()
  if (localStorage.getItem("invoiceId")){
        localStorage.removeItem("invoiceId");
      }

  const [searchValue, setSearchValue] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [periodType, setPeriodType] = useState("");
  const { invoices } = useSelector(state => ({
    invoices: state.invoices.invoices,
  }))

  useEffect(() => {
    dispatch(onGetInvoices())
  }, [dispatch])

  const filterDate = invoices.filter(invoice => {
    // return invoice.finished_at.toLowerCase().includes(searchValue.toLowerCase())

    if (startDate!=="" && endDate!==""){
      return invoice.finished_at > startDate && invoice.finished_at < endDate && invoice.status.toLowerCase().includes(periodType.toLowerCase())
    }
    if (startDate!=="" && endDate===""){
      return invoice.finished_at > startDate && invoice.status.toLowerCase().includes(periodType.toLowerCase())
    }
    if (startDate==="" && endDate!==""){
      return invoice.finished_at < endDate && invoice.status.toLowerCase().includes(periodType.toLowerCase())
    }
    else{
      return invoice.status.toLowerCase().includes(periodType.toLowerCase())
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
          <Breadcrumbs title="AutoPro" breadcrumbItem="Tax Reports" />

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
                            NST
                        </td>
                        <td>
                            13%
                        </td>
                        <td>

                        </td>
                        <td>

                        </td>
                        <td>

                        </td>
                        <td>
                        </td>
                      </tr>
                  </tbody>
                    <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td>
                            totals
                        </td>
                        <td>
                            $
                        </td>
                        <td>
                            $
                        </td>
                        <td>
                            $
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
