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
    Form, CardTitle, FormGroup, UncontrolledTooltip, BreadcrumbItem, Table,
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
    updateCustomersData as onUpdateCustomer, deleteCustomerData as onDeleteCustomer
} from "../../../store/customer/actions";
import {getInvoiceDetail as onGetInvoiceDetail} from "../../../store/invoices/actions";
import {useHistory} from "react-router-dom";
import toastr from "toastr";
import avatar from "../../../assets/images/users/avatar-6.jpg";
import DeleteModal from "../../../components/Common/DeleteModal";

const CustomerDetail = props => {

   //meta title
   document.title="Customer Detail | Tract System";

   const dispatch = useDispatch();
   const history = useHistory();
   if (localStorage.getItem("invoiceId")){
        localStorage.removeItem("invoiceId");
      }

   const [deleteModal, setDeleteModal] = useState(false);
   const [updateBtn, setUpdateBtn] = useState(false)
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
      postal_code: (customer && customer.postal_code) || '',
      city: (customer && customer.city) || '',
      province: (customer && customer.province) || '',
      phone1: (customer && customer.phone1) || '',
      phone2: (customer && customer.phone2) || '',
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Please Enter FuulName"),
      lastname: Yup.string().required("Please Enter LastName"),
      email: Yup.string().required("Please Enter Email"),
      address: Yup.string().required("Please Enter Address"),
      postal_code: Yup.string().required("Please Enter Postal Code"),
      city: Yup.string().required("Please Enter City"),
      province: Yup.string().required("Please Enter Province"),
      phone1: Yup.string().required("Please Enter Phone1"),
    }),
    onSubmit: (values) => {
        const updateCustomer = {
          id: customer ? customer.id : 0,
          last_name: values.lastname,
          full_name: values.fullname,
          email: values.email,
          address: values.address,
          postal_code: values.postal_code,
          city: values.city,
          province: values.province,
          phone1: values.phone1,
          phone2: values.phone2
            };
        dispatch(onUpdateCustomer(updateCustomer));
        },
      });

   const onClickCars = () => {
    history.push('/car-list/'+params.id)
  };

   const onClickPrev = () => {
   history.push('/invoices-list/'+params.id)
  };

   const clickUpdateBtn = () => {
       if (updateBtn ){
           setUpdateBtn(false)
       }
       else {
           setUpdateBtn(true)
       }
   }

   const onClickReset = () => {
       validation.values.email = customer.email;
       validation.values.full_name = customer.full_name;
       validation.values.address = customer.address;
       validation.values.postal_code = customer.postal_code;
       validation.values.city = customer.city;
       validation.values.phone1 = customer.phone1;
       validation.values.phone2 = customer.phone2;
       validation.values.province = customer.province;
  };

  const onClickDelete = (customer) => {
    setDeleteModal(true);
  };

  const handleDeleteCustomer = () => {
    if (customer.id) {
      dispatch(onDeleteCustomer(customer, history));
      setDeleteModal(false);
    }
  };

  useEffect(() => {
    dispatch(onGetCustomerDetail(params.id));
  }, [dispatch]);

  return (
    <React.Fragment>
      <DeleteModal
            show={deleteModal}
            onDeleteClick={handleDeleteCustomer}
            onCloseClick={() => setDeleteModal(false)}
        />
      <div className="page-content">
          <Container fluid>
            {/*<Breadcrumbs title="Profile" breadcrumbItem={customer["email"]} />*/}
              <Row>
                  <Col className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                      <h4 className="mb-sm-0 font-size-18">{customer["email"]}</h4>
                      <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                          <BreadcrumbItem>
                            <span>Profile</span>
                          </BreadcrumbItem>
                          <BreadcrumbItem active>
                            <Link to="#">{customer["email"]}</Link>
                          </BreadcrumbItem>
                        </ol>
                      </div>
                    </div>
                  </Col>
                </Row>
              <FormGroup className="mb-4" row>
              <Col lg={12}>
                  <Row>
                    <Col md={6}>
                      <div className="table-responsive">
                          <p className="text-success font-size-14">Personal information:</p>
                        <Table className="table-nowrap mb-0">
                          <tbody>
                            <tr>
                              <th scope="row">Name :</th>
                              <td>{customer.full_name}</td>
                            </tr>
                            <tr>
                              <th scope="row">Email :</th>
                              <td>{customer.email}</td>
                            </tr>
                            <tr>
                              <th scope="row">Postal code :</th>
                              <td>{customer.postal_code}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                        </Col>
                        <Col md={6}>
                            <div className="table-responsive">
                                <p className="text-success font-size-14">Address information:</p>
                                <Table className="table-nowrap mb-0">
                                  <tbody>
                                    <tr>
                                      <th scope="row">Address :</th>
                                      <td>{customer.address}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">City :</th>
                                      <td>{customer.city}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Province :</th>
                                      <td>{customer.province}</td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </div>
                        </Col>
                    </Row>
              </Col>
              <Col lg={12}>
                  <br/>
                  <Row>
                    <Col md={6}>
                      <div className="table-responsive">
                          <p className="text-success font-size-14">Phone information:</p>
                        <Table className="table-nowrap mb-0">
                          <tbody>
                            <tr>
                              <th scope="row">Mobile Phone1 :</th>
                              <td>{customer.phone1}</td>
                            </tr>
                            <tr>
                              <th scope="row">Mobile Phone1 :</th>
                              <td>{customer.phone2}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                        </Col>
                        <Col md={6}>
                        </Col>
                    </Row>
              </Col>
              </FormGroup>
              <FormGroup className="mb-4" row>
                <Col lg="12">
                  <Row>
                      <div className="text-end">
                      <Button
                          onClick={clickUpdateBtn}
                          className="btn btn-success me-2"
                        >
                          <i className="fa fa-edit me-2" />Edit
                      </Button>
                      <Button
                          onClick={() => {
                                onClickCars()
                            }}
                          className="btn btn-primary me-2 "
                        >
                          <i className="fa fa-car me-2" />Assets
                        </Button>
                      <Button
                          onClick={() => {
                              onClickPrev()
                          }}
                          className="btn btn-warning me-2"
                        >
                          <i className="fa fa-plus-square me-2" />Invoices
                      </Button>
                      </div>
                  </Row>
                </Col>
              </FormGroup>

              {updateBtn &&
                  <>
                    <Col lg={12}>
                        <Row>
                            <h4 className="card-title mb-2">Information Customer</h4>
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
                                        <br/>
                                        <div className="d-print-none">
                                          <div className="float-end">
                                              <button
                                                  className="btn btn-danger w-auto me-2"
                                                  onClick={event => {
                                                      onClickDelete(customer)
                                                  }}
                                                >
                                                  <i className="fa fa-lock me-2" />Delete
                                              </button>
                                              <button
                                                  className="btn btn-info w-auto me-2"
                                                  onClick={onClickReset}
                                                >
                                                  <i className="fa fa-retweet me-2" />Reset
                                              </button>
                                              <button
                                                  className="btn btn-success w-auto me-2"
                                                >
                                                  <i className="fa fa-save me-2" />Save
                                              </button>
                                          </div>
                                        </div>
                                    </Form>
                                </div>
                              </CardBody>
                            </Card>
                        </Row>
                    </Col>
                    </>
              }
          </Container>
        </div>
    </React.Fragment>
  );
};

export default withRouter(CustomerDetail);
