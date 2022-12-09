import React from "react";
import {Link} from "react-router-dom";
import {Alert, Card, CardBody, Col, Container, Form, FormFeedback, Input, Label, Row} from "reactstrap";
import {useFormik} from "formik";
import * as Yup from "yup";
import profileImg from "../../assets/images/profile-img.png";
import logoImg from "../../assets/images/logo.svg";


const AccountDetails = ({ prevStep, nextStep, handleFormData, values }) => {

    document.title="Register | Skote - React Admin & Dashboard Template";

    //form validation
    const validation = useFormik({
      // enableReinitialize : use this flag when initial values needs to be changed
      enableReinitialize: true,

      initialValues: {
        address: values.address,
        account_name: values.account_name,
      },
      validationSchema: Yup.object({
        address: Yup.string().required("Please Enter Your Address"),
        account_name: Yup.string().required("Please Enter Your Account name"),
      }),
      onSubmit: (value) => {
          handleFormData(value.address, 'address')
          handleFormData(value.account_name, 'account_name')
          nextStep()
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
                              <Label className="form-label">Address</Label>
                              <Input
                                id="address"
                                name="address"
                                className="form-control"
                                placeholder="Enter address"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                // value={validation.values.email || ""}
                                defaultValue={values.address}
                                invalid={
                                  validation.touched.address && validation.errors.address ? true : false
                                }
                              />
                              {validation.touched.address && validation.errors.address ? (
                                <FormFeedback type="invalid">{validation.errors.address}</FormFeedback>
                              ) : null}
                            </div>

                            <div className="mb-3">
                              <Label className="form-label">Account name</Label>
                              <Input
                                name="account_name"
                                type="text"
                                placeholder="Enter account-name"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                // value={validation.values.username || ""}
                                defaultValue={values.account_name}
                                invalid={
                                  validation.touched.account_name && validation.errors.account_name ? true : false
                                }
                              />
                              {validation.touched.account_name && validation.errors.account_name ? (
                                <FormFeedback type="invalid">{validation.errors.account_name}</FormFeedback>
                              ) : null}
                            </div>

                            <div className="mt-4 d-grid">
                              <button
                                className="btn btn-primary btn-block "
                                type="submit"
                                onClick={prevStep}
                              >
                                Prev
                              </button>
                            </div>
                            <div className="mt-2 d-grid">
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

export default AccountDetails