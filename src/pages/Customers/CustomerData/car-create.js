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

import {useFormik} from "formik";
import * as Yup from "yup";
import {
    addNewCar as onAddNewCar
} from "../../../store/car/actions";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import axios from "axios";


const CreateCar = props => {

    document.title="Create Car | AutoPro";

    const dispatch = useDispatch();
    const history = useHistory();

    const [image, setImage] = useState('')
    const [formDataCar, setFormDataCar] = useState({
        description: '',
        vin: '',
        model: '',
        make: '',
        stock: '',
        image: null,
      })

    const {
        match: { params },
      } = props;

    //form validation
    const validation = useFormik({
      // enableReinitialize : use this flag when initial values needs to be changed
      enableReinitialize: true,

      initialValues: {
          // description: formDataCar.description,
          vin: formDataCar.vin,
          model: formDataCar.model,
          make: formDataCar.make,
          stock: formDataCar.stock,
          // image: values.image.name,
      },
      validationSchema: Yup.object({
        // description: Yup.string().required("Please Enter Description"),
        vin: Yup.string().required("Please Enter VIN Number Car"),
        model: Yup.string().required("Please Enter Model"),
        make: Yup.string().required("Please Enter Make"),
        stock: Yup.string().required("Please Enter Stock"),
      }),
      onSubmit: (value) => {
          let data_form = new FormData();
          data_form.append("customer", params.id);
          data_form.append("description", "null");
          data_form.append("vin", value.vin);
          data_form.append('stock', value.stock);
          data_form.append("model", value.model);
          data_form.append("make", value.make);
          data_form.append('image', image, image.name)
          dispatch(onAddNewCar(data_form, history))
      }
    });

    const handleImageChange = (file) => {
        setImage(file.target.files[0])
    };

    const onClickPrev = () => {
        history.push("/car-list/"+params.id)
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
                                            <div className="input-group">
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
                                          ) : <button className="btn btn-success info_new" id="inputGroupFileAddon03" data-title="Need an vin number to register"><i className="mdi mdi-alert-circle-outline"></i></button>}
                                            </div>
                                      </Col>
                                    </FormGroup>
                                </div>

                                <div data-repeater-list="outer-group" className="outer">
                                    <div data-repeater-item className="outer">
                                        <FormGroup className="mb-4" row>
                                          <Label
                                            htmlFor="model"
                                            className="col-form-label col-lg-2"
                                            >Stock</Label>
                                            <Col lg="10">
                                                <div className="input-group">
                                              <Input
                                                name="stock"
                                                type="text"
                                                placeholder="Enter stock"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                defaultValue={formDataCar.stock}
                                                invalid={
                                                  validation.touched.stock && validation.errors.stock ? true : false
                                                }
                                              />
                                              {validation.touched.stock && validation.errors.stock ? (
                                                <FormFeedback type="invalid">{validation.errors.stock}</FormFeedback>
                                              ) : <button className="btn btn-success info_new" id="inputGroupFileAddon03" data-title="Need an stock car to register"><i className="mdi mdi-alert-circle-outline"></i></button>}
                                                </div>
                                            </Col>
                                        </FormGroup>
                                    </div>
                                </div>

                                <div data-repeater-list="outer-group" className="outer">
                                    <div data-repeater-item className="outer">
                                        <FormGroup className="mb-4" row>
                                          <Label
                                            htmlFor="model"
                                            className="col-form-label col-lg-2"
                                            >Model</Label>
                                            <Col lg="10">
                                                <div className="input-group">
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
                                              ) : <button className="btn btn-success info_new" id="inputGroupFileAddon03" data-title="Need an model car to register"><i className="mdi mdi-alert-circle-outline"></i></button>}
                                                </div>
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
                                                <div className="input-group">
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
                                              ) : <button className="btn btn-success info_new" id="inputGroupFileAddon03" data-title="Need an make car to register"><i className="mdi mdi-alert-circle-outline"></i></button>}
                                                </div>
                                            </Col>
                                        </FormGroup>
                                    </div>
                                </div>

                                {/*<div data-repeater-list="outer-group" className="outer">*/}
                                {/*    <div data-repeater-item className="outer">*/}
                                {/*        <FormGroup className="mb-4" row>*/}
                                {/*          <Label*/}
                                {/*            htmlFor="description"*/}
                                {/*            className="col-form-label col-lg-2"*/}
                                {/*            >Description</Label>*/}
                                {/*            <Col lg="10">*/}
                                {/*                <div className="input-group">*/}
                                {/*              <Input*/}
                                {/*                name="description"*/}
                                {/*                type="textarea"*/}
                                {/*                placeholder="Enter description"*/}
                                {/*                onChange={validation.handleChange}*/}
                                {/*                onBlur={validation.handleBlur}*/}
                                {/*                defaultValue={formDataCar.description}*/}
                                {/*                invalid={*/}
                                {/*                  validation.touched.description && validation.errors.description ? true : false*/}
                                {/*                }*/}
                                {/*              />*/}
                                {/*              {validation.touched.description && validation.errors.description ? (*/}
                                {/*                <FormFeedback type="invalid">{validation.errors.description}</FormFeedback>*/}
                                {/*              ) : <button className="btn btn-success info_new" id="inputGroupFileAddon03" data-title="Need an description to register"><i className="mdi mdi-alert-circle-outline"></i></button>}*/}
                                {/*                </div>*/}
                                {/*            </Col>*/}
                                {/*        </FormGroup>*/}
                                {/*    </div>*/}
                                {/*</div>*/}

                                <div data-repeater-list="outer-group" className="outer">
                                    <div data-repeater-item className="outer">
                                        <FormGroup className="mb-4" row>
                                          <Label
                                            htmlFor="image"
                                            className="col-form-label col-lg-2"
                                            >Image</Label>
                                            <Col lg="10">
                                                <div className="input-group">
                                              <Input
                                                name="image"
                                                type="file"
                                                accept="image/png, image/jpg"
                                                placeholder="Image car"
                                                className="form-control"
                                                onChange={handleImageChange}
                                                onBlur={validation.handleBlur}
                                                required
                                                // defaultValue={values.image.name}
                                                // invalid={
                                                //   validation.touched.image && validation.errors.image ? true : false
                                                // }
                                              />
                                                    <button className="btn btn-success info_new" id="inputGroupFileAddon03" data-title="Need an image car to register"><i className="mdi mdi-alert-circle-outline"></i></button>
                                                </div>
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
                            </div>
                            <div className="d-print-none">
                              <div className="float-end">
                                <button
                                    onClick={() => {
                                        onClickPrev()
                                    }}
                                  className="btn btn-primary w-md me-2"
                                >
                                  <i className="fa fa-chevron-left" />
                                </button>
                                <button
                                  className="btn btn-primary w-md me-2"
                                  type="submit"
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
      </>
    );
}

export default CreateCar;