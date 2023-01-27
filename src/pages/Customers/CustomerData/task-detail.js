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
  addNewTasks as onAddTasks,
  updateTasks as onUpdateTasks,
  getTasks as onGetTasks
} from "../../../store/tasks/actions";
import {Breadcrumbs} from "@material-ui/core";
import {Link, useHistory} from "react-router-dom";
import {getCarDetail as onGetCarDetail, updateCar as onUpdateCar} from "../../../store/car/actions";
import {useFormik} from "formik";
import * as Yup from "yup";

const DetailTask = props => {

  //meta title
  document.title="Detail Task | Tract System";

  const dispatch = useDispatch();
  const history = useHistory();

  const [val, setVal] = useState(true)
  const { carDetail } = useSelector(state => ({
       carDetail: state.Cars.carDetail,
   }));

  const {
    match: { params },
  } = props;

  const [inputFields, setinputFields] = useState([])
  const [formData, setFormData] = useState({
    invoice_id: JSON.parse(localStorage.getItem("invoiceId")),
    car_id: params.id,
    update_tasks: [],
    new_tasks: [],
    del_tasks: []
  })

  const { tasks } = useSelector(state => ({
       tasks: state.tasks.tasks,
   }));

  const addWork = (idx, work) => {
    inputFields[idx]["work"] = work;
    setinputFields([...inputFields])
  }

  const addPayment = (idx, payment) => {
    inputFields[idx]["payment"] = payment;
    setinputFields([...inputFields])
  }

  function handleAddFields() {
    const item1 = { id: null, work: "", payment: 0 }
    setinputFields([...inputFields, item1])
  }

  function handleRemoveFields(idx, filed) {
    if (filed.id!==null){
      formData["del_tasks"].push(filed.id)
    }
    inputFields.splice(idx, 1)
    var new_data = [...inputFields];
    setinputFields(new_data);
  }

  const CreateTasks = () => {
    formData["car_id"] = params.id
    formData["invoice_id"] = JSON.parse(localStorage.getItem("invoiceId"))
    for (var i = 0; i<inputFields.length; i++){
      if (inputFields[i].id===null){
        formData["new_tasks"].push(inputFields[i])
      }else{
        formData["update_tasks"].push(inputFields[i])
      }
    }
    dispatch(onUpdateTasks(formData, history))
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

  useEffect(() => {
        if (JSON.parse(localStorage.getItem("invoiceId"))) {
          dispatch(onGetTasks(JSON.parse(localStorage.getItem("invoiceId"))));
        } else {
          dispatch(onGetTasks(1)); //remove this after full integration
        }
      }, [params, onGetTasks]);

   const car = carDetail;

   if (tasks.tasks && val){
     for(var i=0; i<tasks.tasks.length; i++){
       inputFields.push(tasks.tasks[i])
     }
     setVal(false)
   }

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Information" breadcrumbItem="Car" />
              <Col lg="12">
                <Card>
                  <CardBody>
                    <div className="d-flex">
                      {/*<div className="ms-3">*/}
                      {/*  <img*/}
                      {/*    src={'https://www.ford.com/is/image/content/dam/vdm_ford/live/en_us/ford/nameplate/mustang/2022/collections/dm/21_FRD_MST_wdmp_200510_02313a.tif?croppathe=1_3x2&wid=900'}*/}
                      {/*    alt=""*/}
                      {/*    className="w-25 rounded-circle  me-4"*/}
                      {/*  />*/}
                      {/*</div>*/}
                      <div className="flex-grow-1 align-self-center">
                        <div className="text-muted">
                            <h5 className="flex-row">
                              {(car && car.model) || ''}
                            </h5>
                            <p className="mb-1">Make: {(car && car.make) || ''}</p>
                            <p className="mb-1">Vin: {(car && car.vin) || ''}</p>
                            <p className="mb-1">Create: {(car && car.create_at) || ''}</p>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
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
                                    <Input
                                      type="text"
                                      className="inner form-control"
                                      value={field.work}
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
                                        value={field.payment || ''}
                                      />
                                    </div>
                                  </Col>
                                  <Col md="2">
                                    <div className="mt-2 mt-md-0 d-grid">
                                      <Button
                                        color="danger"
                                        className="inner"
                                        onClick={() => {
                                          handleRemoveFields(key, field)
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
                                  Add
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

export default DetailTask
