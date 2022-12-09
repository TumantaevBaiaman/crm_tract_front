import React from "react";
import {Link} from "react-router-dom";
import {Alert, Card, CardBody, Col, Container, Form, FormFeedback, Input, Label, Row} from "reactstrap";
import {useFormik} from "formik";
import * as Yup from "yup";
import profileImg from "../../assets/images/profile-img.png";
import logoImg from "../../assets/images/logo.svg";


const PersonalDetails = ({ prevStep, nextStep, handleFormData, values }) => {

    document.title="Register | Skote - React Admin & Dashboard Template";

    //form validation
    const validation = useFormik({
      // enableReinitialize : use this flag when initial values needs to be changed
      enableReinitialize: true,

      initialValues: {
        fullname: values.fullname,
        lastname: values.lastname,
        phone: values.phone,
      },
      validationSchema: Yup.object({
        fullname: Yup.string().required("Please Enter Your Fullname"),
        lastname: Yup.string().required("Please Enter Your Lastname"),
        phone: Yup.string().required("Please Enter Your Phone"),
      }),
      onSubmit: (value) => {
          handleFormData(value.fullname, 'fullname')
          handleFormData(value.lastname, 'lastname')
          handleFormData(value.phone, 'phone')
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
                              <Label className="form-label">FullName</Label>
                              <Input
                                id="fullname"
                                name="fullname"
                                className="form-control"
                                placeholder="Enter fullname"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                // value={validation.values.email || ""}
                                defaultValue={values.fullname}
                                invalid={
                                  validation.touched.fullname && validation.errors.fullname ? true : false
                                }
                              />
                              {validation.touched.fullname && validation.errors.fullname ? (
                                <FormFeedback type="invalid">{validation.errors.fullname}</FormFeedback>
                              ) : null}
                            </div>

                            <div className="mb-3">
                              <Label className="form-label">LastName</Label>
                              <Input
                                name="lastname"
                                type="text"
                                placeholder="Enter lastname"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                // value={validation.values.username || ""}
                                defaultValue={values.lastname}
                                invalid={
                                  validation.touched.lastname && validation.errors.lastname ? true : false
                                }
                              />
                              {validation.touched.lastname && validation.errors.lastname ? (
                                <FormFeedback type="invalid">{validation.errors.lastname}</FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Phone</Label>
                              <Input
                                name="phone"
                                type="text"
                                placeholder="Enter phone"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                // value={validation.values.password || ""}
                                defaultValue={values.phone}
                                invalid={
                                  validation.touched.phone && validation.errors.phone ? true : false
                                }
                              />
                              {validation.touched.phone && validation.errors.phone ? (
                                <FormFeedback type="invalid">{validation.errors.phone}</FormFeedback>
                              ) : null}
                            </div>

                            <div className="mt-4 d-grid">
                              <button
                                className="btn btn-primary btn-block "
                                type='submit'
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

export default PersonalDetails