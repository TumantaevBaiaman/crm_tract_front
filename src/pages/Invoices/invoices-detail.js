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
import ModalTask from "./ModalTask";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//Import Image
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
  const [modal, setModal] = useState(false)
  const { invoiceDetail } = useSelector(state => ({
    invoiceDetail: state.invoices.invoiceDetail.invoice,
  }));

  const { accountDetail } = useSelector(state => ({
    accountDetail: state.invoices.invoiceDetail.account,
  }));

  const {
    match: { params },
  } = props;

  const onClickExportNoTask = () => {
    const export_data = {
      "action": "export",
      "invoice_id": params.id,
      "tax": null,
      "send": null
    }
    dispatch(onExportInvoice(export_data))
    setModal(false)
  };

  const onClickExportTask = () => {
    const export_data = {
      "action": "export",
      "invoice_id": params.id,
      "tax": true,
      "send": null
    }
    dispatch(onExportInvoice(export_data))
    setModal(false)
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
      <ModalTask
          show={modal}
          onClickTrue={onClickExportTask}
          onClickFalse={onClickExportNoTask}
          onCloseClick={() => setModal(false)}
      />
      <div className="page-content container align-content-sm-center">
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
                      <Col sm="2">
                        <address className="">
                          <strong>Service Address:</strong>
                          <br/>
                          <span >Same as Billing Address</span>
                        </address>
                      </Col>
                      <Col sm="6">
                        <div className="text-sm-end">
                          <strong className="me-sm-5">Invoice Number:</strong> <strong><span className="ms-sm-3">{invoiceDetail.number}</span></strong><br/>
                          <strong className="me-sm-5">PO Number:</strong> <strong><span className="ms-sm-4">{invoiceDetail.po}</span></strong>
                        </div>
                        <br/>
                        <div className="text-sm-end">
                          <strong className="me-sm-5">Work Order Close Date:</strong> <span className="ms-sm-4">{invoiceDetail.finished_at.substr(0,10)}</span><br/>
                          <strong className="me-sm-5">Invoice Date:</strong> <span className="ms-sm-4">{invoiceDetail.start_at.substr(0,10)}</span><br/>
                          <strong className="me-sm-3">Net Terms:</strong> <span className="ms-sm-3">DUE UPON RECEIPT</span>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6">
                        <div className="font-size-20">
                          {invoiceDetail.car_id.model} (Stock# {invoiceDetail.car_id.stock}, VIN {invoiceDetail.car_id.vin})
                        </div>
                      </Col>
                      <Col sm="6" className="text-sm-end">
                      </Col>
                    </Row>
                    <br/>
                    <Row>
                      <Col lg={12}>
                        <div className="table-responsive">
                          <Table className="table-nowrap">
                            <thead>
                              <tr>
                                <th className="text-sm-end" style={{width: "300px"}}>Task name</th>
                                <th className="text-sm-end">Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {map(
                                invoiceDetail.tasks,
                                (item, key) => (
                                  <tr key={key}>
                                    <td className="text-sm-end">{item.work}</td>
                                    <td className="text-sm-end">$ {item.payment}</td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </Table>
                        </div>
                      </Col>
                    </Row>
                    <br/>
                    <Row>
                      <Col sm="12">
                        <div className="text-sm-start">
                          Comment: <br/>
                          Thank you for your business
                        </div>
                      </Col>
                    </Row>
                    <br/>
                    <Row>
                      <Col sm="12">
                        <div className="text-sm-start font-size-14">
                          <strong className="me-sm-5">Invoice Number:</strong> <strong><span className="ms-sm-3">{invoiceDetail.number}</span></strong><br/>
                          <strong className="me-sm-5">PO Number:</strong> <strong><span className="ms-sm-5">{invoiceDetail.po}</span></strong>
                        </div>
                      </Col>
                    </Row>
                    <br/>
                    <Row>
                      <Col sm="6">
                        <div className="text-sm-start">
                          <strong className="me-sm-5">Work completed by:</strong> <span className="">{invoiceDetail?.crew_id?.username?.toUpperCase() || ""}</span><br/>
                          <strong className="me-sm-5">Generate By:</strong> <span className="ms-sm-5">{invoiceDetail?.customer_id?.full_name?.toUpperCase() || ""}</span>
                        </div>
                      </Col>
                      <Col>
                        <div className="text-sm-end">
                          <strong className="me-sm-5">Sub Total:</strong> <span className="ms-sm-3">${invoiceDetail?.total_sum}</span><br/>
                          <strong className="me-sm-5">HST:</strong> <span className="ms-sm-4">${invoiceDetail?.total_sum}</span> <br/>
                          <strong className="me-sm-5">Total:</strong> <strong><span className="ms-sm-4">${invoiceDetail?.total_sum}</span></strong>
                        </div>
                      </Col>
                    </Row>
                    <br/>
                    <br/>
                    <div className="d-print-none">
                      <div className="float-end">
                        <UncontrolledDropdown>
                              <DropdownToggle tag="a" to="#" className="card-drop w-md me-2" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bx bx-plus font-size-16 btn btn-success"></i>
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-end">
                                {cancel &&
                                  <DropdownItem
                                    className="btn btn-soft-danger w-md"
                                      onClick={event => {
                                        updateStatus("cancel")
                                      }}
                                  >
                                    <i className="bx bx-x font-size-16 align-middle me-2"/>
                                    Cancel
                                </DropdownItem>}
                                {final &&
                                  <DropdownItem
                                    className="btn btn-soft-success w-md"
                                      onClick={event => {
                                        updateStatus("final")
                                      }}
                                  >
                                    <i className="bx bx-check-double font-size-16 align-middle me-2"/>
                                    Final
                                </DropdownItem>}
                                <br/>
                                <DropdownItem
                                  className="btn btn-soft-warning w-md"
                                    onClick={() => {
                                      setModal(true)
                                    }}
                                >
                                    <i className="bx bxs-file-pdf font-size-16 align-middle me-2"/>PDF
                                </DropdownItem>
                                <DropdownItem
                                  className="btn btn-soft-info w-md"
                                    onClick={() => {
                                      onClickView()
                                    }}
                                >
                                    <i className="bx bx-pencil font-size-16 align-middle me-2"/>
                                    Edit
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
