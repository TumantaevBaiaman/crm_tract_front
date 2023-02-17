import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Input,
  FormGroup,
  Label,
  Button, UncontrolledTooltip, Table,
} from "reactstrap"

// Import Editor
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

//Import Date Picker
import "react-datepicker/dist/react-datepicker.css"

//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";

import {useDispatch, useSelector} from "react-redux";
import {
  addNewTasks as onAddTasks
} from "../../../store/tasks/actions";
import {Breadcrumbs} from "@material-ui/core";
import {Link, useHistory} from "react-router-dom";
import {getCarDetail as onGetCarDetail, updateCar as onUpdateCar} from "../../../store/car/actions";
import {useFormik} from "formik";
import * as Yup from "yup";
import API_URL from "../../../helpers/api_helper";

const CreateTask = props => {

  //meta title
  document.title="Create Task | AutoPro";

  const dispatch = useDispatch();
  const history = useHistory();

  const { carDetail } = useSelector(state => ({
       carDetail: state.Cars.carDetail,
   }));

  const {
    match: { params },
  } = props;

  const inpRow = [{ id: null, work: "", payment: null }]
  const delTask = [{id: null}]
  const [inputFields, setinputFields] = useState(inpRow)

  const addWork = (idx, work) => {
    inputFields[idx]["work"] = work;
    setinputFields([...inputFields]);
  }

  const addPayment = (idx, payment) => {
    inputFields[idx]["payment"] = payment;
    setinputFields([...inputFields]);
  }

  function handleAddFields() {
    const item1 = { id: null, work: "", payment: 0 }
    setinputFields([...inputFields, item1])
  }

  function handleRemoveFields(idx) {
    inputFields.splice(idx, 1)
    var new_data = [...inputFields];
    setinputFields(new_data);
    // document.getElementById("nested" + idx).style.display = "none"
  }

  const [formData, setFormData] = useState({
    car_id: params.id,
    update_tasks: [],
    new_tasks: [],
    del_tasks: []
  })

  const CreateTasks = () => {
    formData["new_tasks"] = inputFields
    dispatch(onAddTasks(formData, history))
  }

  const onClickPrev = () => {
    history.push("/car-detail/"+params.id)
  };

  useEffect(() => {
    if (params && params.id) {
      dispatch(onGetCarDetail(params.id));
    } else {
      dispatch(onGetCarDetail(1)); //remove this after full integration
    }
  }, [params, onGetCarDetail]);

  const car = carDetail;

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Information" breadcrumbItem="Car" />
              <Row>
                <Col lg={12}>
                  <Row>
                    <Col md={4}>
                            <div className="table-responsive">
                                <Table className="table-nowrap mb-0">
                                  <tbody>
                                    <tr>
                                      <th scope="row" className="text-success">Vin Number :</th>
                                      <td>{car.vin}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row" className="text-success">Stock :</th>
                                      <td>{car.stock}</td>
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
                              <th scope="row" className="text-success">Model :</th>
                              <td>{car.model}</td>
                            </tr>
                            <tr>
                              <th scope="row" className="text-success">make :</th>
                              <td>{car.make}</td>
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
                                      <th scope="row" className="text-success">Image :</th>
                                      <td><img src={API_URL+car.image} width="100" className="rounded" alt=""/></td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </div>
                        </Col>
                    </Row>
              </Col>
              </Row>
          <Breadcrumbs title="Tasks" breadcrumbItem="Create Task" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Create New Task</CardTitle>
                  <form className="outer-repeater">
                    <div data-repeater-list="outer-group" className="outer">
                      <div data-repeater-item className="outer">

                        <div className="inner-repeater mb-4">
                          <div className="inner form-group mb-0 row">
                            <Label className="col-form-label col-lg-2">
                              Works
                            </Label>
                            <div
                              className="inner col-lg-10 ml-md-auto"
                              id="repeater"
                            >
                              {inputFields.map((field, key) => (
                                <div
                                  key={key}
                                  id={"nested" + key}
                                  className="mb-3 row align-items-center"
                                >
                                  <Col md="6">
                                    <input
                                      type="text"
                                      className="inner form-control"
                                      value={field.work}
                                      onChange={(event => addWork(key, event.target.value))}
                                      placeholder="Please Enter Work Name"
                                    />
                                  </Col>
                                  <Col md="4">
                                    <div className="mt-4 mt-md-0">
                                      <Input
                                        type="number"
                                        placeholder="Please Enter Payment $"
                                        className="form-control"
                                        onChange={(event => addPayment(key, event.target.value))}
                                        value={field.payment}
                                      />
                                    </div>
                                  </Col>
                                  <Col md="2">
                                    <div className="mt-2 mt-md-0 d-grid">
                                      <Button
                                        color="danger"
                                        className="inner"
                                        onClick={() => {
                                          handleRemoveFields(key)
                                        }}
                                        block
                                      >
                                        Delete
                                      </Button>
                                    </div>
                                  </Col>
                                </div>
                              ))}
                            </div>
                          </div>
                          <br/>
                          <Row className="justify-content-end">
                            <Col lg="10">
                              <div className="float-end">
                                {/*<Button*/}
                                {/*    onClick={() => {*/}
                                {/*        onClickPrev()*/}
                                {/*    }}*/}
                                {/*    color="primary"*/}
                                {/*    className="w-md me-2"*/}
                                {/*>*/}
                                {/*  <i className="fa fa-chevron-left" />*/}
                                {/*</Button>*/}
                                <Button
                                  color="success"
                                  className="inner me-2"
                                  onClick={() => {
                                    handleAddFields()
                                  }}
                                >
                                  Add Task
                                </Button>
                                <Button
                                    onClick={onClickPrev}
                                    color="primary"
                                    className="me-2"
                                > Prev
                                </Button>
                                <Button
                                    color="primary"
                                    className="me-2"
                                    onClick={CreateTasks}
                                  >
                                    Finish
                                </Button>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </div>
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default CreateTask