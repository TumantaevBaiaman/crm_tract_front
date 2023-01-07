import React, { useEffect } from "react";
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Input,
  Label,
  Form,
  FormFeedback,
  CardTitle,
  FormGroup
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// action
import {apiError, addNewAccount, getCustomersData, getProfile} from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import ProfileUser from "../../store/profile/reducer";
import profileImg from "../../assets/images/profile-img.png";
import Breadcrumb from "../../components/Common/Breadcrumb";



const RegisterAccount = props => {

  //meta title
  document.title = "Account Information | Account Register";

  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name")
    }),
    onSubmit: (values) => {
      dispatch(addNewAccount(values));
    }
  });

  const { profile } = useSelector(state => ({
    profile: state.ProfileUser.profile,
  }));

  useEffect(() => {
      dispatch(getProfile());
  }, [dispatch]);


  console.log(profile.account)

  if (profile.account){
      return (
        <>
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                      <Breadcrumb title="Tract System" breadcrumbItem="Profile" />

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
                                    <h5>{profile.account["name"]}</h5>
                                    <p className="mb-1">Account Name: {profile.account["name"]}</p>
                                  </div>
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>

                      {/*<h4 className="card-title mb-4">Your Account</h4>*/}

                      <Card>
                        <CardBody>
                          <Form
                            className="form-horizontal"
                            onSubmit={(e) => {
                              e.preventDefault();
                              // validation.handleSubmit();
                              return false;
                            }}
                          >
                          </Form>
                        </CardBody>
                      </Card>
                    </Container>
                  </div>
            </React.Fragment>
            {/*<div className="page-content">*/}
            {/*  <Container fluid>*/}
            {/*    <Breadcrumbs title="Account" breadcrumbItem="Account Information" />*/}
            {/*    <Row>*/}
            {/*      <Col lg="12">*/}
            {/*        <Card>*/}
            {/*            <div className="bg-primary bg-soft">*/}
            {/*              <Row>*/}
            {/*                <Col className="col-7">*/}
            {/*                  <div className="text-primary p-4">*/}
            {/*                    <h5 className="text-primary">You already have an account and cannot create another one</h5>*/}
            {/*                      <br/>*/}
            {/*                      <p className="text-primary">Name: {profile.account["name"]}</p>*/}
            {/*                      <p className="text-primary">Create: {profile.account["create_at"]}</p>*/}
            {/*                  </div>*/}
            {/*                </Col>*/}
            {/*                <Col className="col-5 align-self-end">*/}
            {/*                  <img src={profileImg} alt="" className="img-fluid" />*/}
            {/*                </Col>*/}
            {/*              </Row>*/}
            {/*            </div>*/}
            {/*        </Card>*/}
            {/*      </Col>*/}
            {/*    </Row>*/}
            {/*  </Container>*/}
            {/*</div>*/}
        </>
      );
  }
  else{
      return (
    <>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs title="Account" breadcrumbItem="Create Account" />
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <CardTitle className="mb-4">Create New Account</CardTitle>
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
                                        >Name</Label>
                                        <Col lg="10">
                                          <Input
                                            id="name"
                                            name="name"
                                            className="form-control"
                                            placeholder="Enter name"
                                            type="text"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            // defaultValue={values.name}
                                            invalid={
                                              validation.touched.name && validation.errors.name ? true : false
                                            }
                                          />
                                          {validation.touched.name && validation.errors.name ? (
                                            <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                                          ) : null}
                                      </Col>
                                    </FormGroup>
                                </div>

                                <br/>
                                <div className="mt-2 d-grid">
                                  <button
                                    className="btn btn-primary btn-block "
                                    type="submit"
                                  >
                                    Create
                                  </button>
                                </div>
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
};

export default RegisterAccount;
