import React, { useState } from "react"
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
  Button,
} from "reactstrap"

// Import Editor
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

//Import Date Picker
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
  addNewTasks as onAddTasks
} from "../../../store/tasks/actions";

const CreateTask = ({ prevStep, nextStep, DataCustomer }) => {

  //meta title
  document.title="Step2 | Create Task";
  // console.log(values.image.name)
  const dispatch = useDispatch();

  const inpRow = [{ id: null, work: "", payment: 0 }]
  const [startDate, setstartDate] = useState(new Date())
  const [endDate, setendDate] = useState(new Date())
  const [inputFields, setinputFields] = useState(inpRow)

  const startDateChange = date => {
    setstartDate(date)
  }

  const endDateChange = date => {
    setendDate(date)
  }

  const { car } = useSelector(state => ({
    car: state.Cars.car,
  }));

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

  // Function for Remove Input Fields
  function handleRemoveFields(idx) {
    // if (idx !== 1) {
    //   var modifiedRows = [...inputFields];
    //   modifiedRows = modifiedRows.filter(x => x["id"] !== idx);
    //   setinputFields(modifiedRows);
    // }
    // delete inputFields[idx];
    inputFields.splice(idx, 1)
    console.log(inputFields)
    document.getElementById("nested" + idx).style.display = "none"
  }

  const [formData, setFormData] = useState({
    car_id: 0,
    tasks: []
  })

  const CreateTasks = () => {
    formData["car_id"] = car["car"]
    formData["tasks"] = inputFields
    dispatch(onAddTasks(formData))
  }


  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          {/*<Breadcrumbs title="Tasks" breadcrumbItem="Create Task" />*/}

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
                          <Row className="justify-content-end">
                            <Col lg="10">
                              <Button
                                color="success"
                                className="inner"
                                onClick={() => {
                                  handleAddFields()
                                }}
                              >
                                Add Task
                              </Button>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </div>
                  </form>
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
                            onClick={CreateTasks}
                          >
                            Finish
                          </button>
                        </Col>
                      </Row>
                    </Col>
                  </FormGroup>
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
