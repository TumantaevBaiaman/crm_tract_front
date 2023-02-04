import React from "react";
import {Link} from "react-router-dom";
import {Alert, Card, CardBody, Col, Container, Form, FormFeedback, Input, Label, Row} from "reactstrap";
import {useFormik} from "formik";
import * as Yup from "yup";
import profileImg from "../../assets/images/profile-img.png";
import logoImg from "../../assets/images/logo.svg";


const UserDetails = ({ nextStep, handleFormData, values }) => {

    document.title="Register | Skote - React Admin & Dashboard Template";

    const validation = useFormik({
      enableReinitialize: true,

      initialValues: {
        email: values.email,
        username: values.username,
        password: values.password,
      },
      validationSchema: Yup.object({
        email: Yup.string().required("Please Enter Your Email"),
        username: Yup.string().required("Please Enter Your Username"),
        password: Yup.string().required("Please Enter Your Password"),
      }),
      onSubmit: (value) => {
          handleFormData(value.email, 'email')
          handleFormData(value.username, 'username')
          handleFormData(value.password, 'password')
          nextStep();
      }
    });

    return (
      <React.Fragment>
        <div className="account-pages my-5 pt-sm-5">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={8} xl={5}>
                <Card className="overflow-hidden">
                  <div className="bg-primary bg-soft">
                    <Row>
                      <Col className="col-7">
                        <div className="text-primary p-4">
                          <h5 className="text-primary">Free Register</h5>
                          <p>Get your free Skote account now.</p>
                        </div>
                      </Col>
                      <Col className="col-5 align-self-end">
                        <img src={profileImg} alt="" className="img-fluid" />
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-0">
                    <div>
                      <Link to="/">
                        <div className="avatar-md profile-user-wid mb-4">
                          <span className="avatar-title rounded-circle bg-light">
                            <img
                              src={logoImg}
                              alt=""
                              className="rounded-circle"
                              height="34"
                            />
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="p-2">
                        <Form className="form-horizontal"
                          onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                          }}
                        >
                            <div className="mb-3">
                              <Label className="form-label">Email</Label>
                              <Input
                                id="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter email"
                                defaultValue={values.email}
                                type="email"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                // value={values.email || ""}
                                invalid={
                                  validation.touched.email && validation.errors.email ? true : false
                                }
                              />
                              {validation.touched.email && validation.errors.email ? (
                                <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                              ) : null}
                            </div>

                            <div className="mb-3">
                              <Label className="form-label">Username</Label>
                              <Input
                                name="username"
                                type="text"
                                placeholder="Enter username"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                // value={values.username || ""}
                                defaultValue={values.username}
                                invalid={
                                  validation.touched.username && validation.errors.username ? true : false
                                }
                              />
                              {validation.touched.username && validation.errors.username ? (
                                <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Password</Label>
                              <Input
                                name="password"
                                type="password"
                                placeholder="Enter password"
                                defaultValue={values.password}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                // value={validation.values.password || ""}
                                invalid={
                                  validation.touched.password && validation.errors.password ? true : false
                                }
                              />
                              {validation.touched.password && validation.errors.password ? (
                                <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                              ) : null}
                            </div>

                            <div className="mt-4 d-grid">
                              <button
                                className="btn btn-primary btn-block "
                                type="submit"
                              >
                                Next
                              </button>
                            </div>

                            <div className="mt-4 text-center">
                              <p>
                                Already have an account ?{" "}
                                <Link
                                  to="/pages-login"
                                  className="fw-medium text-primary"
                                >
                                  {" "}
                                  Login
                                </Link>{" "}
                              </p>

                            </div>
                        </Form>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
}

export default UserDetails