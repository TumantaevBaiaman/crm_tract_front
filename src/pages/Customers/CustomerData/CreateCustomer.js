import {useFormik} from "formik";
import * as Yup from "yup";
import {Card, CardBody, CardTitle, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row} from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import React, { useEffect, useState, useMemo } from "react";
import {useDispatch} from "react-redux";
import {Link, useHistory} from "react-router-dom";

import {
  getCustomersData as onGetCustomers,
  addNewCustomerData as onAddNewCustomer,
  updateCustomersData as onUpdateCustomer,
  deleteCustomerData as onDeleteCustomer,
} from "store/customer/actions";

const CreateCustomer = () => {

    document.title="Create Customer | AutoPro";

    const dispatch = useDispatch();
    let history = useHistory();
    const [customer, setCustomer] = useState(null);

    const validation = useFormik({

    enableReinitialize: true,

    initialValues: {
      fullname: (customer && customer.fullname) || '',
      email: (customer && customer.email) || '',
      address: (customer && customer.address) || '',
      postal_code: (customer && customer.postal_code) || '',
      city: (customer && customer.city) || '',
      province: (customer && customer.province) || '',
      phone1: (customer && customer.phone1) || '',
      phone2: (customer && customer.phone2) || '',
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Please Enter Your FullName"),
      // lastname: Yup.string().required("Please Enter Your LastName"),
      email: Yup.string().required("Please Enter Your Email"),
      address: Yup.string().required("Please Enter Your Address"),
      postal_code: Yup.string().required("Please Enter Postal Code"),
      city: Yup.string().required("Please Enter City"),
      province: Yup.string().required("Please Enter Province"),
      phone1: Yup.string().required("Please Enter Phone1"),
    }),

      onSubmit: (values) => {
          const newCustomer = {
          full_name: values.fullname,
          email: values.email,
          street1: values.address,
          postal_code: values.postal_code,
          country: values.city,
          street2: values.province,
          phone: values.phone1,
          phone2: values.phone2
        };
          console.log(newCustomer)
          dispatch(onAddNewCustomer(newCustomer, history));
          // history.push("/customers")
          // location.reload()
      }
    });

    const onClickCancel = () => {
        validation.values.fullname = "";
        validation.values.email = "";
        validation.values.address = "";
        validation.values.city = "";
        validation.values.province = "";
        validation.values.phone1 = "";
        validation.values.phone2 = "";
        validation.values.postal_code = "";
    }

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
                                <Row>
                                <Col md={6}>
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
                                                htmlFor="postal_code"
                                                className="col-form-label col-lg-2"
                                                >Postal Code</Label>
                                                <Col lg="10">
                                                  <Input
                                                    name="postal_code"
                                                    type="text"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.postal_code || ""}
                                                    invalid={
                                                      validation.touched.postal_code && validation.errors.postal_code ? true : false
                                                    }
                                                />
                                                {validation.touched.postal_code && validation.errors.postal_code ? (
                                                    <FormFeedback type="invalid">{validation.errors.postal_code}</FormFeedback>
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
                                </Col>
                                <Col md={6}>
                                    <div data-repeater-list="outer-group" className="outer">
                                        <div data-repeater-item className="outer">
                                            <FormGroup className="mb-4" row>
                                              <Label
                                                htmlFor="city"
                                                className="col-form-label col-lg-2"
                                                >City</Label>
                                                <Col lg="10">
                                                  <Input
                                                    name="city"
                                                    type="text"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.city || ""}
                                                    invalid={
                                                      validation.touched.city && validation.errors.city ? true : false
                                                    }
                                                />
                                                {validation.touched.city && validation.errors.city ? (
                                                    <FormFeedback type="invalid">{validation.errors.city}</FormFeedback>
                                                ) : null}
                                              </Col>
                                            </FormGroup>
                                        </div>

                                        <div data-repeater-list="outer-group" className="outer">
                                            <div data-repeater-item className="outer">
                                                <FormGroup className="mb-4" row>
                                                  <Label
                                                    htmlFor="province"
                                                    className="col-form-label col-lg-2"
                                                    >Province</Label>
                                                    <Col lg="10">
                                                      <Input
                                                        name="province"
                                                        type="text"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.province || ""}
                                                        invalid={
                                                          validation.touched.province && validation.errors.province ? true : false
                                                        }
                                                    />
                                                    {validation.touched.province && validation.errors.province ? (
                                                        <FormFeedback type="invalid">{validation.errors.province}</FormFeedback>
                                                    ) : null}
                                                    </Col>
                                                </FormGroup>
                                            </div>
                                        </div>
                                        <div data-repeater-list="outer-group" className="outer">
                                            <div data-repeater-item className="outer">
                                                <FormGroup className="mb-4" row>
                                                  <Label
                                                    htmlFor="phone1"
                                                    className="col-form-label col-lg-2"
                                                    >Phone1</Label>
                                                    <Col lg="10">
                                                      <Input
                                                        name="phone1"
                                                        type="text"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.phone1 || ""}
                                                        invalid={
                                                          validation.touched.phone1 && validation.errors.phone1 ? true : false
                                                        }
                                                    />
                                                    {validation.touched.phone1 && validation.errors.phone1 ? (
                                                        <FormFeedback type="invalid">{validation.errors.phone1}</FormFeedback>
                                                    ) : null}
                                                    </Col>
                                                </FormGroup>
                                            </div>
                                        </div>

                                        <div data-repeater-list="outer-group" className="outer">
                                            <div data-repeater-item className="outer">
                                                <FormGroup className="mb-4" row>
                                                  <Label
                                                    htmlFor="phone2"
                                                    className="col-form-label col-lg-2"
                                                    >Phone2</Label>
                                                    <Col lg="10">
                                                      <Input
                                                        name="phone2"
                                                        type="text"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.phone2 || ""}
                                                    />
                                                    </Col>
                                                </FormGroup>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                </Row>
                            </div>
                            <div className="mt-2 text-end">
                              <button
                                className="btn btn-info"
                                onClick={onClickCancel}
                              >
                                Reset
                              </button>
                              <Link
                                className="btn btn-danger ms-1"
                                to="/customers"
                              >
                                Cancel
                              </Link>
                              <button
                                className="btn btn-success w-md ms-1"
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