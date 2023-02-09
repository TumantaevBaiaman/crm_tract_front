import {useFormik} from "formik";
import * as Yup from "yup";
import {Card, CardBody, CardTitle, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row} from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import React, { useEffect, useState, useMemo } from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

import {
  addNewCustomer as onAddNewEmployee,
  getStatus as onGetStatus,
} from "store/e-commerce/actions";

const CreateEmployee = () => {

    document.title="Create Employee | AutoPro";

    const dispatch = useDispatch();
    let history = useHistory();
    const [employee, setEmployee] = useState(null);

    const { status } = useSelector(state=>({
        status: state.ecommerce.status,
      }));

    const validation = useFormik({

    enableReinitialize: true,

    initialValues: {
      username: (employee && employee.username) || '',
      lastname: (employee && employee.lastname) || '',
      status: (employee && employee.status) || '',
      phone: (employee && employee.phone) || '',
      email: (employee && employee.email) || '',
      joiningDate: (employee && employee.joiningDate) || '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Your Name"),
      lastname: Yup.string().required("Please Enter Your LastName"),
      status: Yup.string().required("Please Enter Your Status"),
      phone: Yup.string().required("Please Enter Your Phone"),
      email: Yup.string().required("Please Enter Your Email"),
      joiningDate: Yup.string().required("Please Enter Your Joining Date"),
    }),

      onSubmit: (values) => {
          const newEmployee = {
              step: 2,
              username: values["username"],
              phone: values["phone"],
              status: values["status"],
              email: values["email"],
              lastname: values['lastname'],
              date_of_birth: values["joiningDate"],
        };
          dispatch(onAddNewEmployee(newEmployee));
          history.push("/employee")
          location.reload()
      }
    });

    useEffect(() => {
        dispatch(onGetStatus())
      }, [])

    return (
      <>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs title="Employee" breadcrumbItem="Create Employee" />
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
                                                type="text"
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
                                            htmlFor="username"
                                            className="col-form-label col-lg-2"
                                            >UserName</Label>
                                            <Col lg="10">
                                              <Input
                                                name="username"
                                                type="text"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.username || ""}
                                                invalid={
                                                  validation.touched.username && validation.errors.username ? true : false
                                                }
                                            />
                                            {validation.touched.username && validation.errors.username ? (
                                                <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
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
                                            htmlFor="phone"
                                            className="col-form-label col-lg-2"
                                            >Phone Number</Label>
                                            <Col lg="10">
                                              <Input
                                                name="phone"
                                                type="text"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.phone || ""}
                                                invalid={
                                                  validation.touched.phone && validation.errors.phone ? true : false
                                                }
                                            />
                                            {validation.touched.phone && validation.errors.phone ? (
                                                <FormFeedback type="invalid">{validation.errors.phone}</FormFeedback>
                                            ) : null}
                                            </Col>
                                        </FormGroup>
                                    </div>
                                </div>

                                <div data-repeater-list="outer-group" className="outer">
                                    <div data-repeater-item className="outer">
                                        <FormGroup className="mb-4" row>
                                          <Label
                                            htmlFor="status"
                                            className="col-form-label col-lg-2"
                                            >Status</Label>
                                            <Col lg="10">
                                              <select
                                                  name="status"
                                                  type="select"
                                                  className="form-select"
                                                  onChange={validation.handleChange}
                                                  onBlur={validation.handleBlur}
                                              >
                                                <option value=""></option>
                                                {status.map(option => (
                                                    <option key={option.id} value={option.name}>
                                                      {option.name}
                                                    </option>
                                                  ))}
                                                {validation.touched.status && validation.errors.status ? (
                                                <FormFeedback type="invalid">{validation.errors.status}</FormFeedback>
                                              ) : null}
                                              </select>
                                            </Col>
                                        </FormGroup>
                                    </div>
                                </div>

                                <div data-repeater-list="outer-group" className="outer">
                                    <div data-repeater-item className="outer">
                                        <FormGroup className="mb-4" row>
                                          <Label
                                            htmlFor="joiningDate"
                                            className="col-form-label col-lg-2"
                                            >Date of birth</Label>
                                            <Col lg="10">
                                              <Input
                                                name="joiningDate"
                                                type="date"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.joiningDate || ""}
                                                invalid={
                                                  validation.touched.joiningDate && validation.errors.joiningDate ? true : false
                                                }
                                            />
                                            {validation.touched.joiningDate && validation.errors.joiningDate ? (
                                                <FormFeedback type="invalid">{validation.errors.joiningDate}</FormFeedback>
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

export default CreateEmployee;