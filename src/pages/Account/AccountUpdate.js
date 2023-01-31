import React, { useEffect, useState } from "react";
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
    FormGroup, Table
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// action
import {apiError, addNewAccount, getCustomersData, getProfile} from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";

import Breadcrumbs from "../../components/Common/Breadcrumb";
import Breadcrumb from "../../components/Common/Breadcrumb";
import {useHistory} from "react-router-dom";
import API_URL from "../../helpers/api_helper";


const UpdateAccount = props => {

  //meta title
  document.title = "Update Account | AutoPro";

  const dispatch = useDispatch();
  const history = useHistory();

  const [image, setImage] = useState('')
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
        name: profile?.account?.name || '',
        address: profile?.account?.name || '',
        city: profile?.account?.street1 || '',
        country: profile?.account?.country || '',
        phone: profile?.account?.phone || '',
        email: profile?.account?.email || '',
        hst: profile?.account?.hst || '',
    },
    validationSchema: Yup.object({
        name: Yup.string().required("Please Enter Your Name"),
        address: Yup.string().required("Please Enter Address"),
        city: Yup.string().required("Please Enter City"),
        country: Yup.string().required("Please Enter Country"),
        phone: Yup.string().required("Please Enter Phone"),
        email: Yup.string().required("Please Enter Email"),
        hst: Yup.string().required("Please Enter Your hst")
    }),
    onSubmit: (values) => {
        let data_form = new FormData();
        data_form.append('name', values.name);
        data_form.append('hst', values.hst);
        data_form.append('street2', values.address);
        data_form.append('street1', values.city);
        data_form.append('country', values.country);
        data_form.append('email', values.email);
        data_form.append('phone', values.phone);
        data_form.append('logo', image, image.name);
        dispatch(addNewAccount(data_form, props.history));
    }
  });

  const { profile } = useSelector(state => ({
    profile: state.ProfileUser.profile,
  }));

  useEffect(() => {
      dispatch(getProfile());
  }, [dispatch]);

  const handleImageChange = (file) => {
        setImage(file.target.files[0])
    };

  if (profile.account){
      return (
        <>
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                      <Breadcrumb title="AutoPro" breadcrumbItem="Account" />
                        <Card>
                        <CardBody>
                          <Col lg={12}>
                              <Row>
                                <Col md={4}>
                                        <div className="table-responsive">
                                            <Table className="table-nowrap mb-0">
                                              <tbody>
                                                <tr>
                                                  <th scope="row" className="text-success">Name :</th>
                                                  <td>{profile?.account?.name}</td>
                                                </tr>
                                                <tr>
                                                  <th scope="row" className="text-success">Email :</th>
                                                  <td>{profile?.account?.email}</td>
                                                </tr>
                                                <tr>
                                                  <th scope="row" className="text-success">HST :</th>
                                                  <td>{profile?.account?.hst}%</td>
                                                </tr>
                                              </tbody>
                                            </Table>
                                          </div>
                                    </Col>
                                  <Col md={4}>
                                        <div className="table-responsive">
                                            <Table className="table-nowrap mb-0">
                                              <tbody>
                                                <tr>
                                                  <th scope="row" className="text-success">Country :</th>
                                                  <td>{profile?.account?.country}</td>
                                                </tr>
                                                <tr>
                                                  <th scope="row" className="text-success">City :</th>
                                                  <td>{profile?.account?.street1}</td>
                                                </tr>
                                                <tr>
                                                  <th scope="row" className="text-success">Address :</th>
                                                  <td>{profile?.account?.street2}</td>
                                                </tr>
                                              </tbody>
                                            </Table>
                                          </div>
                                    </Col>
                                  <Col md={4}>
                                        <div className="table-responsive">
                                            <Table className="table-nowrap mb-0">
                                              <tbody>
                                                <tr>
                                                  <th scope="row" className="text-success">Logo :</th>
                                                  <td><img src={API_URL+profile?.account?.logo} width="100" className="rounded" alt=""/></td>
                                                </tr>
                                              </tbody>
                                            </Table>
                                          </div>
                                    </Col>
                              </Row>
                          </Col>

                      {/*<h4 className="card-title mb-4">Your Account</h4>*/}
                        </CardBody>
                      </Card>
                    </Container>
                  </div>
            </React.Fragment>
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
                                        >Email</Label>
                                        <Col lg="10">
                                          <Input
                                            id="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Enter email"
                                            type="email"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
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

                                <div data-repeater-item className="outer">
                                    <FormGroup className="mb-4" row>
                                      <Label
                                        htmlFor="vin"
                                        className="col-form-label col-lg-2"
                                        >Country</Label>
                                        <Col lg="10">
                                          <Input
                                            id="country"
                                            name="country"
                                            className="form-control"
                                            placeholder="Enter country"
                                            type="text"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            // defaultValue={values.name}
                                            invalid={
                                              validation.touched.country && validation.errors.country ? true : false
                                            }
                                          />
                                          {validation.touched.country && validation.errors.country ? (
                                            <FormFeedback type="invalid">{validation.errors.country}</FormFeedback>
                                          ) : null}
                                      </Col>
                                    </FormGroup>
                                </div>

                                <div data-repeater-item className="outer">
                                    <FormGroup className="mb-4" row>
                                      <Label
                                        htmlFor="vin"
                                        className="col-form-label col-lg-2"
                                        >City</Label>
                                        <Col lg="10">
                                          <Input
                                            id="city"
                                            name="city"
                                            className="form-control"
                                            placeholder="Enter city"
                                            type="text"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
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

                                <div data-repeater-item className="outer">
                                    <FormGroup className="mb-4" row>
                                      <Label
                                        htmlFor="address"
                                        className="col-form-label col-lg-2"
                                        >Address</Label>
                                        <Col lg="10">
                                          <Input
                                            id="address"
                                            name="address"
                                            className="form-control"
                                            placeholder="Enter address"
                                            type="text"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
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

                                <div data-repeater-item className="outer">
                                    <FormGroup className="mb-4" row>
                                      <Label
                                        htmlFor="phone"
                                        className="col-form-label col-lg-2"
                                        >Phone</Label>
                                        <Col lg="10">
                                          <Input
                                            id="phone"
                                            name="phone"
                                            className="form-control"
                                            placeholder="Enter phone"
                                            type="text"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
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

                                <div data-repeater-item className="outer">
                                    <FormGroup className="mb-4" row>
                                      <Label
                                        htmlFor="vin"
                                        className="col-form-label col-lg-2"
                                        >HST</Label>
                                        <Col lg="10">
                                          <Input
                                            id="hst"
                                            name="hst"
                                            className="form-control"
                                            placeholder="Enter hst"
                                            type="number"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            invalid={
                                              validation.touched.hst && validation.errors.hst ? true : false
                                            }
                                          />
                                          {validation.touched.hst && validation.errors.hst ? (
                                            <FormFeedback type="invalid">{validation.errors.hst}</FormFeedback>
                                          ) : null}
                                      </Col>
                                    </FormGroup>
                                </div>

                                <div data-repeater-item className="outer">
                                    <FormGroup className="mb-4" row>
                                      <Label
                                        htmlFor="vin"
                                        className="col-form-label col-lg-2"
                                        >Logo</Label>
                                        <Col lg="10">
                                          <Input
                                            id="image"
                                            name="image"
                                            className="form-control"
                                            placeholder="Enter country"
                                            accept="image/png, image/jpg"
                                            type="file"
                                            onChange={handleImageChange}
                                            onBlur={validation.handleBlur}
                                            required
                                          />
                                      </Col>
                                    </FormGroup>
                                </div>

                                <br/>
                                <div className="mt-2 d-grid text-end">
                                  <button
                                    className="btn btn-primary"
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

export default UpdateAccount;
