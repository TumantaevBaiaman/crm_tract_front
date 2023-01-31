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
import ModalTask from "./ModalTask";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//Import Image
import logo from "../../assets/images/logo-dark.png";
import {
  getInvoiceDetail as onGetInvoiceDetail,
  getInvoiceCustomer as onGetInvoiceCustomer,
  getInvoices as onGetInvoices,
  exportInvoice as onExportInvoice,
  exportInvoiceList as onExportInvoiceList,
  exportInvoiceCSV as onExportInvoiceCSV
} from "../../store/invoices/actions";
//redux
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from "react-router-dom";
import CardInvoice from "./card-invoice";
import classNames from "classnames";
import TableInvoice from "./table-invoice";
import toastr from "toastr";

const InvoiceCustomer = props => {

  document.title="Invoice List | AutoPro";

  const dispatch = useDispatch();
  const history = useHistory();
  if (localStorage.getItem("invoiceId")){
        localStorage.removeItem("invoiceId");
      }

  const [startDate, setStartDate] = useState('')
  const [dataId, setDataId] = useState(0)
  const [endDate, setEndDate] = useState('')
  const [modalList, setModalList] = useState(false)
  const [modalOne, setModalOne] = useState(false)
  const [periodType, setPeriodType] = useState("");
  const { invoices } = useSelector(state => ({
    invoices: state.invoices.invoicesCustomer,
  }));

  const {
    match: { params },
  } = props;

  useEffect(() => {
    if (params && params.id) {
      dispatch(onGetInvoiceCustomer(params.id));
    } else {
      dispatch(onGetInvoiceCustomer(1));
    }
  }, [params, onGetInvoiceCustomer]);


  const filterDate = invoices.filter(invoice => {

    if (startDate!=="" && endDate!==""){
      return invoice.finished_at > startDate && invoice.finished_at < endDate && invoice.status.toLowerCase().includes(periodType.toLowerCase()) || invoice.finished_at.toLowerCase().includes(endDate.toLowerCase())
    }
    if (startDate!=="" && endDate===""){
      return invoice.finished_at > startDate && invoice.status.toLowerCase().includes(periodType.toLowerCase())
    }
    if (startDate==="" && endDate!==""){
      return invoice.finished_at < endDate && invoice.status.toLowerCase().includes(periodType.toLowerCase()) || invoice.finished_at.toLowerCase().includes(endDate.toLowerCase())
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

  const onClickExportListTrue = () => {
    if (startDate==="" || endDate===""){
      toastr.error("Date Error");
    }
    else{
      const export_data = {
      action: "export",
      start_date: startDate+" 00:00:00",
      end_date: endDate+" 23:59:59",
      customer_id: params.id,
      tax: true
    }
    dispatch(onExportInvoiceList(export_data))
    setModalList(false)
    }
  };

  const onClickExportListFalse = () => {
    if (startDate==="" || endDate===""){
      toastr.error("Date Error");
    }
    else{
      const export_data = {
      action: "export",
      start_date: startDate+" 00:00:00",
      end_date: endDate+" 23:59:59",
      customer_id: params.id,
      tax: false
    }
    dispatch(onExportInvoiceList(export_data))
    setModalList(false)
    }
  };

  const onClickExportOne = (data) => {
    setDataId(data)
    setModalOne(true)
  };

  const onClickExportOneTrue = (data) => {
    const export_data = {
      "action": "export",
      "invoice_id": dataId,
      "tax": true
    }
    dispatch(onExportInvoice(export_data))
    setModalOne(false)
  };

  const onClickExportOneFalse = (data) => {
    const export_data = {
      "action": "export",
      "invoice_id": dataId,
      "tax": false
    }
    dispatch(onExportInvoice(export_data))
    setModalOne(false)
  };

  return (
    <React.Fragment>
      <ModalTask
          show={modalList}
          onClickTrue={onClickExportListTrue}
          onClickFalse={onClickExportListFalse}
          onCloseClick={() => setModalList(false)}
      />
      <ModalTask
          show={modalOne}
          onClickTrue={onClickExportOneTrue}
          onClickFalse={onClickExportOneFalse}
          onCloseClick={() => setModalOne(false)}
      />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="AutoPro" breadcrumbItem="Invoices Customer" />

          <Col xl={12}>
              <Card>
                <CardBody>
                  <div className="d-sm-flex flex-wrap">
                    <div className="position-relative">
                      <div className="search-box me-xxl-2 my-3 my-xxl-0 d-inline-block">
                        <div className="position-relative">
                          <Button
                            color="success"
                          >
                            Invoice Statement
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="position-relative">
                      <div className="search-box me-xxl-2 my-3 my-xxl-0 d-inline-block">
                        <div className="position-relative">
                          <Button
                            color="warning"
                            onClick={event => setModalList(true)}
                          >
                            PDF
                          </Button>
                        </div>
                      </div>
                    </div>
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
                </CardBody>
              </Card>
            </Col>

          {/*<Row>*/}
          {/*  {map(filterDate, (invoice, key) => (*/}
          {/*    <CardInvoice data={invoice} key={"_invoice_" + key} />*/}
          {/*  ))}*/}
          {/*</Row>*/}
          <Col lg="12">
            <div className="">
              <div className="table-responsive">
                <Table className="project-list-table table-nowrap align-middle table-borderless">
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: "100px" }}>
                        Invoice
                      </th>
                      <th scope="col" >Status</th>
                      <th scope="col" >Employee</th>
                      <th scope="col">Total</th>
                      <th scope="col">Create Date</th>
                      <th scope="col" style={{ width: "150px" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterDate.map((item, key) => (
                      <tr key={key}>
                        <td>{item.number}</td>
                        <td>
                          {<TableInvoice item={item} key={"_invoice_" + key} />}
                        </td>
                        <td>
                          {item.crew_id.username}
                        </td>
                        <td>$ {item.total_sum}</td>
                        <td>{item.finished_at}</td>
                        <td>
                            <ul className="list-unstyled hstack gap-1 mb-0">

                              <li>
                                  <Button
                                      to="#"
                                      className="btn btn-sm btn-soft-primary"
                                      onClick={event => onClickExportOne(item.id)}
                                  >
                                      <i className="mdi mdi-file-pdf" id="deletetooltip" />
                                      <UncontrolledTooltip placement="top" target="deletetooltip">
                                          Export
                                      </UncontrolledTooltip>
                                  </Button>
                              </li>

                              <li>
                                  <Link
                                      to={"/invoices-detail/"+item.id}
                                      className="btn btn-sm btn-soft-primary"
                                  >
                                      <i className="mdi mdi-page-next" id="deletetooltip" />
                                      <UncontrolledTooltip placement="top" target="deletetooltip">
                                          Next
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
          </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};

InvoiceCustomer.propTypes = {
  match: PropTypes.any,
};

export default withRouter(InvoiceCustomer);
