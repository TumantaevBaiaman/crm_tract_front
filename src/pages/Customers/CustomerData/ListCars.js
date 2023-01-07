import React, {useState, useEffect} from "react";
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
import {useDispatch, useSelector} from "react-redux";
import {getCars as onGetCars} from "../../../store/car/actions";


const ListCars = ({ DataCustomer, nextStep, prevStep }) => {

    document.title="List Cars";
    const [car, setCar] = useState(null);
    const activeBtn = (ele) => {
        if(ele.closest("button").classList.contains("active")) {
            ele.closest("button").classList.remove("active");
        } else {
            ele.closest("button").classList.add("active");
        }
    }
    const dispatch = useDispatch();
    const { cars } = useSelector(state => ({
        cars: state.Cars.cars,
      }));

    useEffect(() => {
        dispatch(onGetCars(DataCustomer));
    }, [dispatch]);

    return (
      <>
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Cars" breadcrumbItem="Car List" />

                    <Row>
                        <Col lg={12}>
                            <Card className="job-filter">
                                <CardBody>
                                    <form action="#">
                                        <Row className="g-3">
                                            <Col xxl={4} lg={4}>
                                                <div className="position-relative">
                                                    <Input type="text" className="form-control" id="searchJob" autoComplete="off" placeholder="Search your candidate" />
                                                </div>
                                            </Col>
                                        </Row>
                                    </form>
                                </CardBody>
                            </Card>
                        </Col>

                    </Row>
                    <Row>
                        {(cars || []).map((item , key) => (
                        <Col xl={3} key={key}>
                            <Card>
                                <CardBody>
                                    <div className="d-flex align-start mb-3">
                                    </div>
                                    <div className="text-center mb-3">
                                        <img src={item.image} alt="" className="avatar-sm rounded-circle" />
                                        <h6 className="font-size-15 mt-3 mb-1">{item.model} / {item.vin}</h6>
                                        <p className="mb-0 text-muted">{item.description}</p>
                                    </div>
                                    <div className="hstack gap-2 justify-content-center">
                                        {(item.skills || []).map((subItem , key) => (
                                        <span key={key} className="badge badge-soft-secondary">{subItem}</span>
                                        ))}
                                    </div>

                                    <div className="mt-4 pt-1">
                                        <Link to="/candidate-overview" className="btn btn-soft-primary d-block">View Profile</Link>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        ))}
                    </Row>
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
                                onClick={nextStep}
                              >
                                Create
                              </button>
                            </Col>
                          </Row>
                        </Col>
                      </FormGroup>
                </Container>
            </div>
        </React.Fragment>
      </>
    );
}

export default ListCars;