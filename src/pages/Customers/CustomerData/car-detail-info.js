import React, { useState, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    Button,
    Table,
} from "reactstrap";


//redux
import { useSelector, useDispatch } from "react-redux";

import {withRouter} from "react-router-dom";

import Breadcrumbs from "../../../components/Common/Breadcrumb";
import {
    getCarDetail as onGetCarDetail,
} from "../../../store/car/actions";

import {useHistory} from "react-router-dom";
import API_URL from "../../../helpers/api_helper";
import {useMediaQuery} from "react-responsive";

const CarDetailInfo = props => {

   document.title="Car Detail Info | AutoPro";

   const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
   const dispatch = useDispatch();
   const history = useHistory();

   let invoice_status = false;
   let invoice_id = 0;
   if (localStorage.getItem("invoiceId")){
       invoice_status = true;
       invoice_id = parseInt(localStorage.getItem("invoiceId"))
  }

   const [image, setImage] = useState('')
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


  useEffect(() => {
    dispatch(onGetCarDetail(params.id));
  }, [dispatch]);

  const onClickNext = () => {
      history.push("/work-order/"+carDetail?.customer+"?car_id="+params?.id)
  }

  const onClickNextUpdate = () => {
      history.push("/car-update/"+params?.id)
  }
  const onClickPrev = () => {
      history.goBack();
  }

  return (
    <React.Fragment>
        <div className="page-content">
          <Container fluid>
              {isMobile ? null: (
                  <Breadcrumbs title="Car" breadcrumbItem="Information car" />
              )}
              <Col lg="12">
                <Card>
                    <Row className="font-size-14">
                        <Col md={6}>
                          <div className="d-flex">
                            <div className="flex-grow-1 align-self-center">
                              <div className="text-muted">
                                  <div className="table-responsive">
                                    <Table className="table-nowrap mb-0">
                                      <tbody>
                                        <tr>
                                          <th scope="row">Make :</th>
                                          <td>{carDetail?.make}</td>
                                        </tr>
                                        <tr>
                                          <th scope="row">model :</th>
                                          <td>{carDetail?.model}</td>
                                        </tr>
                                        <tr>
                                          <th scope="row">stock :</th>
                                          <td>{carDetail?.stock}</td>
                                        </tr>
                                      </tbody>
                                    </Table>
                                  </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="d-flex">
                            <div className="flex-grow-1 align-self-center">
                              <div className="text-muted">
                                  <div className="table-responsive">
                                    <Table className="table-nowrap mb-0">
                                      <tbody>
                                        <tr>
                                          <th scope="row">vin :</th>
                                          <td>{carDetail?.vin}</td>
                                        </tr>
                                        {isMobile ? null: (
                                            <tr>
                                              <th scope="row">image :</th>
                                              <td><img src={API_URL+carDetail?.image} width="100" className="rounded" alt=""/></td>
                                            </tr>
                                        )}
                                      </tbody>
                                    </Table>
                                    <br/>
                                    {isMobile ? (
                                        <div>
                                            <div className="text-center">
                                                <strong className="font-size-16">Image car</strong>
                                            </div>
                                            <br/>
                                            <img src={API_URL+carDetail?.image}  className="rounded w-100" alt=""/>
                                      </div>
                                    ) : null}
                                    <br/>
                                  </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col lg={12}>
                            {isMobile ?
                                (
                                    <div className="mt-4">
                                        <Card className="font-size-16" onClick={() => onClickNext()}>
                                            <CardBody style={{height: "35px", padding: "5px"}}>
                                                <div className="d-flex w-100 overflow-hidden">
                                                    <div style={{width: "95%", float: "left"}}>
                                                        <span className="w-90 text-dark" style={{fontWeight: "500"}}>
                                                            Work Orders
                                                        </span>
                                                    </div>
                                                    <div style={{width: "5%", float: "right"}}>
                                                        <i className="bx bx-right-arrow-circle text-success font-size-18 align-middle me-2"/>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                        <Card className="font-size-16" onClick={() => onClickNextUpdate()}>
                                            <CardBody style={{height: "35px", padding: "5px"}}>
                                                <div className="d-flex w-100 overflow-hidden">
                                                    <div style={{width: "95%", float: "left"}}>
                                                        <span className="w-90 text-dark" style={{fontWeight: "500"}}>
                                                            Update Car
                                                        </span>
                                                    </div>
                                                    <div style={{width: "5%", float: "right"}}>
                                                        <i className="bx bx-right-arrow-circle text-success font-size-18 align-middle me-2"/>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </div>
                                ):
                                (
                                    <div>
                                        <Row>
                                            <div className="text-end">
                                                <Button
                                                    onClick={() => {
                                                            onClickPrev()
                                                        }}
                                                    className="btn btn-info me-2 "
                                                    >
                                                    <i className="fa fa-arrow-left me-2" />Prev
                                                </Button>
                                                <Button
                                                    onClick={() => {
                                                            onClickNextUpdate()
                                                        }}
                                                    className="btn btn-warning me-2 "
                                                    >
                                                    <i className="fa fa-car me-2" />Update Car
                                                </Button>
                                                <Button
                                                    onClick={() => {
                                                            onClickNext()
                                                        }}
                                                    className="btn btn-success me-2 "
                                                    >
                                                    <i className="fa fa-tasks me-2" />Work Orders
                                                </Button>
                                            </div>
                                        </Row>
                                    </div>
                                )
                            }
                        </Col>
                    </Row>
                </Card>
            </Col>
          </Container>
          <div className="d-print-none">
              <div className="float-end block-top">
                  <div onClick={onClickPrev}>
                      <i className="bx bx-left-arrow-circle font-size-18 btn btn-primary"> Prev</i>
                  </div>
              </div>
          </div>
        </div>
    </React.Fragment>
  );
};

export default withRouter(CarDetailInfo);
