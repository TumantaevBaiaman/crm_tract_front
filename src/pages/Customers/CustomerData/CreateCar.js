import React, {useState} from "react";
import {Link} from "react-router-dom";
import {
    Alert,
    Card,
    CardBody,
    CardTitle,
    Col,
    Container,
    Form,
    FormFeedback,
    Input,
    Label,
    Row,
    FormGroup,
    Collapse
} from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import List from "../../JobPages/CandidateList/List";
import {useFormik} from "formik";
import * as Yup from "yup";
import {
    addNewCar as onAddNewCar
} from "../../../store/car/actions";
import {useDispatch, useSelector} from "react-redux";


const ListCars = ({ DataCustomer, nextStep, prevStep }) => {

    document.title="Create Car";

    const dispatch = useDispatch();

    const [formDataCar, setFormDataCar] = useState({
        description: '',
        vin: '',
        model: '',
        make: '',
        image: null,
      })

    //form validation
    const validation = useFormik({
      // enableReinitialize : use this flag when initial values needs to be changed
      enableReinitialize: true,

      initialValues: {
          description: formDataCar.description,
          vin: formDataCar.vin,
          model: formDataCar.model,
          make: formDataCar.make,
          // image: values.image.name,
      },
      validationSchema: Yup.object({
        description: Yup.string().required("Please Enter Description"),
        vin: Yup.string().required("Please Enter VIN Number Car"),
        model: Yup.string().required("Please Enter Model"),
        make: Yup.string().required("Please Enter Make"),
      }),
      onSubmit: (value) => {
          formDataCar['customer'] = DataCustomer["id"]
          formDataCar["description"] = value.description
          formDataCar["vin"] = value.vin
          formDataCar["model"] = value.model
          formDataCar["make"] = value.make
          dispatch(onAddNewCar(formDataCar))
          nextStep()
      }
    });

    const { car } = useSelector(state => ({
        car: state.Cars.car,
      }));

    const handleImageChange = (file) => {
      formDataCar['image'] = file.target.files[0];
    };

    return (
      <>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs title="Car" breadcrumbItem="Create Car" />
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
                                            defaultValue={formDataCar.vin}
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
                                                defaultValue={formDataCar.model}
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
                                                defaultValue={formDataCar.make}
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
                                                defaultValue={formDataCar.description}
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
                                <FormGroup className="mb-4" row>
                                    <Col lg="12">
                                      <Row>
                                        <Col md="6" className="pr-0">
                                          <button
                                            className="btn btn-primary btn-block inner form-control"
                                            type="submit"
                                            onClick={prevStep}
                                          >
                                            Prev
                                          </button>
                                        </Col>
                                        <Col md="6" className="pl-0">
                                          <button
                                            className="btn btn-primary btn-block inner form-control"
                                            type="submit"
                                            // onClick={createCar}
                                          >
                                            Next
                                          </button>
                                        </Col>
                                      </Row>
                                    </Col>
                                  </FormGroup>
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

export default ListCars;