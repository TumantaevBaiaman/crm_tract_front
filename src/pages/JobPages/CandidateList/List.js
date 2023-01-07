import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, Row } from 'reactstrap';  

//import common data
import {jobListCandidate} from "../../../common/data";
import {
    getCars as onGetCars
} from "../../../store/car/actions";
import {useDispatch, useSelector} from "react-redux";

const List = () => {
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
        dispatch(onGetCars({id: 1}));
    }, [dispatch]);
    useEffect(() => {
        setCar(cars);
      }, [cars]);

    return (
        <React.Fragment>
            <Row>
                {(cars || []).map((item , key) => (
                <Col xl={3} key={key}>
                    <Card>
                        <CardBody>
                            <div className="d-flex align-start mb-3">
                                <div className="flex-grow-1">
                                    <span className={item.vin === "Full Time" ? "badge badge-soft-success" : item.type === "Freelance" ? "badge badge-soft-info" : item.type === "Part Time" ? "badge badge-soft-danger" : "badge badge-soft-warning"}>
                                        {item.vin}
                                    </span>
                                </div>
                            </div>
                            <div className="text-center mb-3">
                                <img src={item.image} alt="" className="avatar-sm rounded-circle" />
                                <h6 className="font-size-15 mt-3 mb-1">{item.model}</h6>
                                <p className="mb-0 text-muted">{item.description}</p>
                            </div>
                            <div className="d-flex mb-3 justify-content-center gap-2 text-muted">
                                <div>
                                    <i className='bx bx-map align-middle text-primary'></i> {item.location}
                                </div>
                                <p className="mb-0 text-center"><i className='bx bx-money align-middle text-primary'></i> ${item.experience} / hrs</p>
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
        </React.Fragment>
    );
}

export default List;