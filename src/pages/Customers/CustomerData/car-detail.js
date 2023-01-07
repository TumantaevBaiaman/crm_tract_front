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
    Form, CardTitle, FormGroup, UncontrolledTooltip, DropdownItem,
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
    getCarDetail as onGetCarDetail,
    updateCar as onUpdateCar,
    deleteCar as onDeleteCar,
} from "../../../store/car/actions";

import {useHistory} from "react-router-dom";
import {getCustomersData as onGetCustomers} from "../../../store/customer/actions";
import de from "react-datepicker";
import DeleteModal from "../../../components/Common/DeleteModal";

const CarDetail = props => {

   //meta title
   document.title="Car Detail | Tract System";

   const dispatch = useDispatch();
   const history = useHistory();

   const { carDetail } = useSelector(state => ({
       carDetail: state.Cars.carDetail,
   }));

   const {
        match: { params },
      } = props;

    useEffect(() => {
        if (params && params.id) {
          dispatch(onGetCarDetail(params.id));
        } else {
          dispatch(onGetCarDetail(1)); //remove this after full integration
        }
      }, [params, onGetCarDetail]);

   const car = carDetail;
   console.log(car)

   const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      description: (car && car.description) || '',
      vin: (car && car.vin) || '',
      model: (car && car.model) || '',
      make: (car && car.make) || 'test',
    },
    validationSchema: Yup.object({
      description: Yup.string().required("Please Enter Description"),
      vin: Yup.string().required("Please Enter VIN Number Car"),
      model: Yup.string().required("Please Enter Model"),
      make: Yup.string().required("Please Enter Make"),
    }),
    onSubmit: (values) => {
        const updateCar = {
          id: params.id,
          description: values.description,
          vin: values.vin,
          model: values.model,
          make: values.make
            };
        dispatch(onUpdateCar(updateCar));
        location.reload()
        },
      });

   const handleImageChange = (file) => {
      // formDataCar['image'] = file.target.files[0];
       console.log(file.target.files[0])
    };

   const onClickTask = () => {
       history.push('/tasks-create/'+params.id)
    };

   const onClickDeleteCar = () => {
       const deleteCar = {
           "id": params.id
       }
       console.log(deleteCar)
       dispatch(onDeleteCar(deleteCar))
       history.push("/car-list/"+car.customer)
       // location.reload()
   };

   const [deleteModal, setDeleteModal] = useState(false);

   const onClickDelete = () => {
       setDeleteModal(true);
   };

   const onClickPrev = () => {
    history.push("/car-list/"+car.customer)
  };

  return (
    <React.Fragment>
        <DeleteModal
            show={deleteModal}
            onDeleteClick={onClickDeleteCar}
            onCloseClick={() => setDeleteModal(false)}
        />
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs title="Car" breadcrumbItem="Update Car" />
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <CardTitle className="mb-4">Create New Car</CardTitle>
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
                                        >VIN</Label>
                                        <Col lg="10">
                                          <Input
                                            id="vin"
                                            name="vin"
                                            className="form-control"
                                            placeholder="Enter vin number"
                                            type="text"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.vin || ""}
                                            invalid={
                                              validation.touched.vin && validation.errors.vin ? true : false
                                            }
                                          />
                                          {validation.touched.vin && validation.errors.vin ? (
                                            <FormFeedback type="invalid">{validation.errors.vin}</FormFeedback>
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
                                            >Model</Label>
                                            <Col lg="10">
                                              <Input
                                                name="model"
                                                type="text"
                                                placeholder="Enter model"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.model || ""}
                                                invalid={
                                                  validation.touched.model && validation.errors.model ? true : false
                                                }
                                              />
                                              {validation.touched.model && validation.errors.model ? (
                                                <FormFeedback type="invalid">{validation.errors.model}</FormFeedback>
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
                                            >Make</Label>
                                            <Col lg="10">
                                              <Input
                                                name="make"
                                                type="text"
                                                placeholder="Enter make"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.make || ""}
                                                invalid={
                                                  validation.touched.make && validation.errors.make ? true : false
                                                }
                                              />
                                              {validation.touched.make && validation.errors.make ? (
                                                <FormFeedback type="invalid">{validation.errors.make}</FormFeedback>
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
                                            >Description</Label>
                                            <Col lg="10">
                                              <Input
                                                name="description"
                                                type="textarea"
                                                placeholder="Enter description"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.description || ""}
                                                invalid={
                                                  validation.touched.description && validation.errors.description ? true : false
                                                }
                                              />
                                              {validation.touched.description && validation.errors.description ? (
                                                <FormFeedback type="invalid">{validation.errors.description}</FormFeedback>
                                              ) : null}
                                            </Col>
                                        </FormGroup>
                                    </div>
                                </div>

                                <div data-repeater-list="outer-group" className="outer">
                                    <div data-repeater-item className="outer">
                                        <FormGroup className="mb-4" row>
                                          <Label
                                            htmlFor="image"
                                            className="col-form-label col-lg-2"
                                            >Image</Label>
                                            <Col lg="10">
                                              <Input
                                                name="image"
                                                type="file"
                                                placeholder="Image car"
                                                className="form-control"
                                                onChange={handleImageChange}
                                                onBlur={validation.handleBlur}
                                                // defaultValue={values.image.name}
                                                // invalid={
                                                //   validation.touched.image && validation.errors.image ? true : false
                                                // }
                                              />
                                              {/*{validation.touched.image && validation.errors.image ? (*/}
                                              {/*  <FormFeedback type="invalid">{validation.errors.image}</FormFeedback>*/}
                                              {/*) : null}*/}
                                            </Col>
                                            {/*<Card*/}
                                            {/*    className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"*/}
                                            {/*    key={"-file"}*/}
                                            {/*  >*/}
                                            {/*    <div className="p-2">*/}
                                            {/*      <Row className="align-items-center">*/}
                                            {/*        <Col>*/}
                                            {/*            {formDataCar.image.name}*/}
                                            {/*          <p className="mb-0">*/}
                                            {/*            <strong>{formDataCar.image.size}</strong>*/}
                                            {/*          </p>*/}
                                            {/*        </Col>*/}
                                            {/*      </Row>*/}
                                            {/*    </div>*/}
                                            {/*  </Card>*/}
                                        </FormGroup>
                                    </div>
                                </div>
                                <br/>
                                {/*<FormGroup className="mb-4" row>*/}
                                {/*    <Col lg="12">*/}
                                {/*      <Row>*/}
                                {/*        <Col md="4" className="pl-0">*/}
                                {/*          <DropdownItem*/}
                                {/*              onClick={() => {*/}
                                {/*                onClickDelete();*/}
                                {/*              }}>*/}
                                {/*              <i className="mdi mdi-trash-can font-size-16 text-danger me-1" id="deletetooltip"></i>*/}
                                {/*              <UncontrolledTooltip placement="top" target="deletetooltip">*/}
                                {/*                Delete*/}
                                {/*              </UncontrolledTooltip>*/}
                                {/*            </DropdownItem>*/}
                                {/*        </Col>*/}
                                {/*        <Col md="4" className="pr-0">*/}
                                {/*          <button*/}
                                {/*            className="btn btn-primary btn-block inner form-control"*/}
                                {/*            type="submit"*/}
                                {/*            // onClick={prevStep}*/}
                                {/*          >*/}
                                {/*            Update*/}
                                {/*          </button>*/}
                                {/*        </Col>*/}
                                {/*        <Col md="4" className="pl-0">*/}
                                {/*          <button*/}
                                {/*            className="btn btn-primary btn-block inner form-control"*/}
                                {/*            type="submit"*/}
                                {/*            onClick={() => {*/}
                                {/*                onClickTask()*/}
                                {/*            }}*/}
                                {/*          >*/}
                                {/*            Next*/}
                                {/*          </button>*/}
                                {/*        </Col>*/}
                                {/*      </Row>*/}
                                {/*    </Col>*/}
                                {/*  </FormGroup>*/}
                            </div>
                            <div className="d-print-none">
                              <div className="float-end">
                                  <button
                                      className="btn btn-success w-auto me-2"
                                    >
                                      <i className="fa fa-cloud-upload-alt" />
                                  </button>
                                <button
                                    onClick={() => {
                                        onClickPrev()
                                    }}
                                  className="btn btn-primary w-md me-2"
                                >
                                  <i className="fa fa-chevron-left" />
                                </button>
                                <button
                                  onClick={() => {
                                        onClickTask()
                                    }}
                                  className="btn btn-primary w-md me-2"
                                >
                                  <i className="fa fa-chevron-right" />
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
    </React.Fragment>
  );
};

export default withRouter(CarDetail);
