import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import {
  Alert,
  Card,
  CardBody,
  Col,
  Container, DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Table, UncontrolledDropdown,
  UncontrolledTooltip
} from "reactstrap";
import { isEmpty, map } from "lodash";
import API_URL from "../../helpers/api_helper";


//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//Import Image
import logo from "../../assets/images/logo-dark.png";
import {
  getInvoiceDetail as onGetInvoiceDetail,
  exportInvoice as onExportInvoice,
  updateStatus as onUpdateStatus,
} from "../../store/invoices/actions";
//redux
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from "react-router-dom";
import {use} from "i18next";

const InvoiceDetail = props => {

  document.title="Invoice Detail | AutoPro";

  const dispatch = useDispatch();
  const history = useHistory();
  if (localStorage.getItem("invoiceId")){
        localStorage.removeItem("invoiceId");
      }

  let cancel = true
  let final = true
  const { invoiceDetail } = useSelector(state => ({
    invoiceDetail: state.invoices.invoiceDetail.invoice,
  }));

  const { accountDetail } = useSelector(state => ({
    accountDetail: state.invoices.invoiceDetail.account,
  }));

  const {
    match: { params },
  } = props;

  const onClickExport = () => {
    const export_data = {
      "action": "export",
      "invoice_id": params.id,
      "tax": true
    }
    dispatch(onExportInvoice(export_data))
  };

  const updateStatus = (data) => {
    if (data==="final"){
      const updateData = {
        id: params.id,
        status: "final"
      }
      dispatch(onUpdateStatus(updateData))
      dispatch(onGetInvoiceDetail(1))
    }else{
      const updateData = {
        id: params.id,
        status: "cancel"
      }
      dispatch(onUpdateStatus(updateData))
      dispatch(onGetInvoiceDetail(1))
    }
  }

  useEffect(() => {
    if (params && params.id) {
      dispatch(onGetInvoiceDetail(params.id));
    } else {
      dispatch(onGetInvoiceDetail(1)); //remove this after full integration
    }
  }, [params, onGetInvoiceDetail]);

  const printInvoice = () => {
    window.print();
  };

  const onClickView = () => {
    localStorage.setItem("invoiceId", params.id);
    history.push('/car-detail/'+invoiceDetail.car_id.id);
  };

  useEffect(() => {
    dispatch(onGetInvoiceDetail(params.id));
  }, [dispatch]);

  if (invoiceDetail){
    if (invoiceDetail.status==='final'){final=false}
    if (invoiceDetail.status==='cancel'){cancel=false}
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Invoices" breadcrumbItem="Detail" />
          {!isEmpty(invoiceDetail) && (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <Col>
                      <div className="invoice-title text-center">
                        <h1 className="float-center font-size-22">
                          Invoice
                        </h1>
                      </div>
                    </Col>
                    <Row>
                      <Col sm="6">
                        <address className="font-size-14">
                          <span className="font-size-20"><strong>{accountDetail.name}</strong></span>
                          <br/>
                          <span >{accountDetail.country}</span>
                          <br/>
                          <span>{accountDetail.street1}</span>
                          <br/>
                          <span>{accountDetail.street2}</span>
                          <br/>
                          <span>{accountDetail.phone}</span>
                          <br/>
                          <span>HST# {accountDetail.hst}</span>
                          <br/>
                        </address>
                      </Col>
                      <Col sm="6" className="text-sm-end">
                        <address className="font-size-14">
                          <div className="mb-4">
                            <img src={API_URL+accountDetail.logo} alt="logo" width="200" />
                          </div>
                        </address>
                      </Col>
                    </Row>
                    <br/>
                    <br/>
                    <Row>
                      <Col sm="4">
                        <address className="">
                          <strong>Billing Address</strong>
                          <br/>
                          <span>{invoiceDetail.customer_id.full_name}</span>
                          <br/>
                          <span>{invoiceDetail.customer_id.street1}</span>
                          <br/>
                          <span >{invoiceDetail.customer_id.street2}</span>
                          <br/>
                          <span >{invoiceDetail.customer_id.country}</span>
                          <br/>
                          <span>Phone: {invoiceDetail.customer_id.phone}</span>
                          <br/>
                          <span>Email: {invoiceDetail.customer_id.email}</span>
                          <br/>
                        </address>
                      </Col>
                      <Col sm="4">
                        <address className="">
                          <strong>Service Address:</strong>
                          <br/>
                          <span >Same as Billing Address</span>
                        </address>
                      </Col>
                      <Col sm="4">
                        <Table className="table-nowrap">
                          <tbody>
                            <tr className="text-sm-end">
                              <td>Invoice Number:</td>
                              <td>{invoiceDetail.number}</td>
                            </tr>
                            <tr className="text-sm-end">
                              <td>PO Number:</td>
                              <td>{invoiceDetail.po}</td>
                            </tr>
                            <br/>
                            <tr className="text-sm-end">
                              <td>Invoice Number:</td>
                              <td>{invoiceDetail.number}</td>
                            </tr>
                            <tr className="text-sm-end">
                              <td>PO Number:</td>
                              <td>{invoiceDetail.po}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                    </Row>
                    <br/>
                    <div className="table-responsive">
                      <Table className="table-nowrap">
                        <thead>
                          <tr>
                            <th>Task Name</th>
                            <th className="text-end">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {map(
                            invoiceDetail.tasks,
                            (item, key) => (
                              <tr key={key}>
                                <td>{item.work}</td>
                                <td className="text-end">$ {item.payment}</td>
                              </tr>
                            )
                          )}
                          <tr>
                            <td colSpan="1" className="border-0 text-end">
                              <strong>Total</strong>
                            </td>
                            <td className="border-0 text-end">
                              <h4 className="m-0">
                                $ {invoiceDetail.total_sum}
                              </h4>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                    <div className="d-print-none">
                      <div className="float-end">
                        <UncontrolledDropdown>
                              <DropdownToggle tag="a" to="#" className="card-drop w-md me-2" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bx bx-plus font-size-16 btn btn-success"></i>
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-end">
                                {cancel &&
                                  <DropdownItem>
                                  <button
                                      type="button"
                                      className="btn btn-soft-danger w-md"
                                      onClick={event => {
                                        updateStatus("cancel")
                                      }}
                                  >
                                    <i className="bx bx-x font-size-16 align-middle me-2"/>
                                    Cancel
                                  </button>
                                </DropdownItem>}
                                {final &&
                                  <DropdownItem>
                                  <button
                                      type="button"
                                      className="btn btn-soft-success w-md"
                                      onClick={event => {
                                        updateStatus("final")
                                      }}
                                  >
                                    <i className="bx bx-check-double font-size-16 align-middle me-2"/>
                                    Final
                                  </button>
                                </DropdownItem>}
                                <DropdownItem>
                                  <button
                                    type="button"
                                    className="btn btn-soft-info w-md"
                                    onClick={() => {
                                      onClickExport()
                                    }}
                                  >
                                    <i className="bx bxs-file-pdf font-size-16 align-middle me-2"/>PDF
                                  </button>
                                </DropdownItem>
                                <DropdownItem>
                                  <button
                                    type="button"
                                    className="btn btn-soft-info w-md"
                                    onClick={() => {
                                      onClickView()
                                    }}
                                  >
                                    <i className="bx bx-pencil font-size-16 align-middle me-2"/>
                                    Edit
                                  </button>
                                </DropdownItem>
                                <DropdownItem>
                                  <button
                                    type="button"
                                    className="btn btn-soft-success w-md"
                                    onClick={printInvoice}
                                  >
                                    <i className="bx bx-printer font-size-16 align-middle me-2"/>
                                    Print
                                  </button>
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

InvoiceDetail.propTypes = {
  match: PropTypes.any,
};

export default withRouter(InvoiceDetail);
