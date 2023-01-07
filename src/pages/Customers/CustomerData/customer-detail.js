import React, { useState, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    Alert,
    CardBody,
    Button,
    Label,
    Input,
    FormFeedback,
    Form, CardTitle, FormGroup,
} from "reactstrap";
import { isEmpty, map } from "lodash";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

//redux
import { useSelector, useDispatch } from "react-redux";

import {Link, withRouter} from "react-router-dom";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import {
    addNewCustomerData as onAddNewCustomer,
    getCustomersData as onGetCustomers,
    getCustomerDetail as onGetCustomerDetail,
    updateCustomersData as onUpdateCustomer
} from "../../../store/customer/actions";
import {getInvoiceDetail as onGetInvoiceDetail} from "../../../store/invoices/actions";
import {useHistory} from "react-router-dom";

const CustomerDetail = props => {

   //meta title
   document.title="Customer Detail | Tract System";

   const dispatch = useDispatch();
   const history = useHistory();

   const { customerDetail } = useSelector(state => ({
       customerDetail: state.Customer.customerDetail,
   }));

   const {
        match: { params },
      } = props;

    useEffect(() => {
        if (params && params.id) {
          dispatch(onGetCustomerDetail(params.id));
        } else {
          dispatch(onGetCustomerDetail(1)); //remove this after full integration
        }
      }, [params, onGetCustomerDetail]);

   const customer = customerDetail;

   const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      fullname: (customer && customer.full_name) || '',
      lastname: (customer && customer.last_name) || '',
      email: (customer && customer.email) || '',
      address: (customer && customer.address) || '',
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Please Enter Your FuulName"),
      lastname: Yup.string().required("Please Enter Your LastName"),
      email: Yup.string().required("Please Enter Your Email"),
      address: Yup.string().required("Please Enter Your Address"),
    }),
    onSubmit: (values) => {
        const updateCustomer = {
          id: customer ? customer.id : 0,
          last_name: values.lastname,
          full_name: values.fullname,
          email: values.email,
          address: values.address
            };
        dispatch(onUpdateCustomer(updateCustomer));
        location.reload()
        },
      });

   const onClickCars = () => {
    history.push('/car-list/'+params.id)
  };

  return (
    <React.Fragment>
      <div className="page-content">
          <Container fluid>
            <Breadcrumbs title="Profile" breadcrumbItem={customer["email"]} />
              <Row>
                <Col lg="12">
                  <Card>
                    <CardBody>
                      <div className="d-flex">
                        <div className="ms-3">
                          {/*<img*/}
                          {/*  src={avatar}*/}
                          {/*  alt=""*/}
                          {/*  className="avatar-md rounded-circle img-thumbnail"*/}
                          {/*/>*/}
                        </div>
                        <div className="flex-grow-1 align-self-center">
                          <div className="text-muted">
                              <h5>{customer.email}</h5>
                              <p className="mb-1">FullName: {customer.full_name}</p>
                              <p className="mb-1">LastName: {customer.last_name}</p>
                              <p className="mb-1">Address: {customer.address}</p>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>

              <h4 className="card-title mb-2">Your Profile Customer</h4>
                <Card>
                  <CardBody>
                    <div className="p-2">
                        <Form className="form-horizontal"
                          onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                          }}
                        >
                            <div data-repeater-list="outer-group" className="outer">
                                <div data-repeater-item className="outer">
                                    <FormGroup className="mb-4" row>
                                      <Label
                                        htmlFor="vin"
                                        className="col-form-label col-lg-2"
                                        >Email</Label>
                                        <Col lg="10">
                                          <Input
                                            name="email"
                                            type="email"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.email || ""}
                                            invalid={
                                              validation.touched.email && validation.errors.email ? true : false
                                            }
                                        />
                                        {validation.touched.email && validation.errors.email ? (
                                            <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                                        ) : null}
                                      </Col>
                                    </FormGroup>
                                </div>

                                <div data-repeater-list="outer-group" className="outer">
                                    <div data-repeater-item className="outer">
                                        <FormGroup className="mb-4" row>
                                          <Label
                                            htmlFor="model"
                                            className="col-form-label col-lg-2"
                                            >FullName</Label>
                                            <Col lg="10">
                                              <Input
                                                name="fullname"
                                                type="text"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.fullname || ""}
                                                invalid={
                                                  validation.touched.fullname && validation.errors.fullname ? true : false
                                                }
                                            />
                                            {validation.touched.fullname && validation.errors.fullname ? (
                                                <FormFeedback type="invalid">{validation.errors.fullname}</FormFeedback>
                                            ) : null}
                                            </Col>
                                        </FormGroup>
                                    </div>
                                </div>
                                <div data-repeater-list="outer-group" className="outer">
                                    <div data-repeater-item className="outer">
                                        <FormGroup className="mb-4" row>
                                          <Label
                                            htmlFor="make"
                                            className="col-form-label col-lg-2"
                                            >LastName</Label>
                                            <Col lg="10">
                                              <Input
                                                name="lastname"
                                                type="text"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.lastname || ""}
                                                invalid={
                                                  validation.touched.lastname && validation.errors.lastname ? true : false
                                                }
                                            />
                                            {validation.touched.lastname && validation.errors.lastname ? (
                                                <FormFeedback type="invalid">{validation.errors.lastname}</FormFeedback>
                                            ) : null}
                                            </Col>
                                        </FormGroup>
                                    </div>
                                </div>

                                <div data-repeater-list="outer-group" className="outer">
                                    <div data-repeater-item className="outer">
                                        <FormGroup className="mb-4" row>
                                          <Label
                                            htmlFor="description"
                                            className="col-form-label col-lg-2"
                                            >Address</Label>
                                            <Col lg="10">
                                              <Input
                                                name="address"
                                                type="text"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.address || ""}
                                                invalid={
                                                  validation.touched.address && validation.errors.address ? true : false
                                                }
                                            />
                                            {validation.touched.address && validation.errors.address ? (
                                                <FormFeedback type="invalid">{validation.errors.address}</FormFeedback>
                                            ) : null}
                                            </Col>
                                        </FormGroup>
                                    </div>
                                </div>

                                <br/>
                                <div className="d-print-none">
                                  <div className="float-end">
                                      <button
                                          className="btn btn-success w-auto me-2"
                                        >
                                          <i className="fa fa-cloud-upload-alt" />
                                      </button>
                                    <Link
                                      to="/customers"
                                      className="btn btn-info w-md me-2"
                                    >
                                      <i className="fa fa-chevron-left" />
                                    </Link>
                                      <Link
                                      to="#"
                                      onClick={() => {
                                            onClickCars()
                                        }}
                                      className="btn btn-info w-md me-2"
                                    >
                                      <i className="fa fa-chevron-right" />
                                    </Link>
                                  </div>
                                </div>
                            </div>
                        </Form>
                    </div>
                  </CardBody>
                </Card>
          </Container>
        </div>
    </React.Fragment>
  );
};

export default withRouter(CustomerDetail);
