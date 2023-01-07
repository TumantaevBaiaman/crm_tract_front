import {useFormik} from "formik";
import * as Yup from "yup";
import {Card, CardBody, CardTitle, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row} from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import React, { useEffect, useState, useMemo } from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

import {
  getCustomersData as onGetCustomers,
  addNewCustomerData as onAddNewCustomer,
  updateCustomersData as onUpdateCustomer,
  deleteCustomerData as onDeleteCustomer,
} from "store/customer/actions";

const CreateCustomer = () => {

    document.title="Create Customer | Tract System";

    const dispatch = useDispatch();
    let history = useHistory();
    const [customer, setCustomer] = useState(null);

    //form validation
    const validation = useFormik({

    enableReinitialize: true,

    initialValues: {
      fullname: (customer && customer.fullname) || '',
      lastname: (customer && customer.lastname) || '',
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
          const newCustomer = {
          full_name: values["fullname"],
          email: values["email"],
          last_name: values['lastname'],
          address: values['address'],
        };
          dispatch(onAddNewCustomer(newCustomer));
          history.push("/customers")
          location.reload()
      }
    });

    return (
      <>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs title="Customer" breadcrumbItem="Create Customer" />
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <CardTitle className="mb-4">Create New Customer</CardTitle>
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
                                        htmlFor="email"
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
                                            htmlFor="fullname"
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
                                            htmlFor="lastname"
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
                                            htmlFor="address"
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
                            </div>
                            <div className="mt-2 d-grid">
                              <button
                                className="btn btn-primary btn-block "
                                type="submit"
                              >
                                Create
                              </button>
                            </div>
                        </Form>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
}

export default CreateCustomer;