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
  Button, UncontrolledTooltip,
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

const CreateTask = props => {

  //meta title
  document.title="Create Task | Tract System";

  const dispatch = useDispatch();
  const history = useHistory();

  const { carDetail } = useSelector(state => ({
       carDetail: state.Cars.carDetail,
   }));

  const {
    match: { params },
  } = props;

  const inpRow = [{ id: null, work: "", payment: 0 }]
  const delTask = [{id: null}]
  const [inputFields, setinputFields] = useState(inpRow)

  const addWork = (idx, work) => {
    inputFields[idx]["work"] = work;
  }

  const addPayment = (idx, payment) => {
    inputFields[idx]["payment"] = payment;
  }

  function handleAddFields() {
    const item1 = { id: null, work: "", payment: 0 }
    setinputFields([...inputFields, item1])
  }

  function handleRemoveFields(idx) {
    inputFields.splice(idx, 1)
    document.getElementById("nested" + idx).style.display = "none"
  }

  const [formData, setFormData] = useState({
    car_id: 0,
    tasks: []
  })

  const CreateTasks = () => {
    formData["car_id"] = params.id
    formData["tasks"] = inputFields
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
                <Col lg="12">
                  <Card>
                    <CardBody>
                      <div className="d-flex">
                        <div className="ms-3">
                          <img
                            src={'https://www.ford.com/is/image/content/dam/vdm_ford/live/en_us/ford/nameplate/mustang/2022/collections/dm/21_FRD_MST_wdmp_200510_02313a.tif?croppathe=1_3x2&wid=900'}
                            alt=""
                            className="avatar-md rounded-circle  me-4"
                          />
                        </div>
                        <div className="flex-grow-1 align-self-center">
                          <div className="text-muted">
                              <h5 className="flex-row">
                                {(car && car.model) || ''}
                                <Link
                                    to={'/car-detail/'+params.id}
                                    className="btn btn-soft-info"
                                >
                                    <i className="mdi mdi-border-color" id="edittooltip" />
                                    <UncontrolledTooltip placement="top" target="edittooltip">
                                        View
                                    </UncontrolledTooltip>
                                </Link>
                              </h5>
                              <p className="mb-1">Make: {(car && car.make) || ''}</p>
                          </div>
                        </div>
                      </div>
                      <br/>
                      <div className="d-flex">
                        <div className="flex-grow-1 align-self-center">
                          <div className="text-muted">
                              <p className="mb-1">Description: {(car && car.description) || ''}</p>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
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
                              Tasks
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
                                      defaultValue={field.work}
                                      onChange={(event => addWork(key, event.target.value))}
                                      placeholder="Enter Name..."
                                    />
                                  </Col>
                                  <Col md="4">
                                    <div className="mt-4 mt-md-0">
                                      <Input
                                        type="number"
                                        placeholder="Enter Payment $"
                                        className="form-control"
                                        onChange={(event => addPayment(key, event.target.value))}
                                        defaultValue={field.payment}
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
                                    color="primary"
                                    className="w-md me-2"
                                    onClick={CreateTasks}
                                  >
                                    {/*<i className="fa fa-chevron-right" />*/}
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
