import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {
    Card,
    CardBody,
    Col,
    Container,
    Input,
    Row,
    Table,
    UncontrolledTooltip,
    Button
} from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import {useDispatch, useSelector} from "react-redux";
import {deleteCar as onDeleteCar, getCars as onGetCars} from "../../../store/car/actions";
import {useHistory} from "react-router-dom";
import DeleteModal from "../../../components/Common/DeleteModal";
import API_URL from "../../../helpers/api_helper";

const ListCars = props  => {

    document.title="List Cars | Tract System";

    const dispatch = useDispatch();
    const history = useHistory();
    if (localStorage.getItem("invoiceId")){
        localStorage.removeItem("invoiceId");
      }

    const [searchValue, setSearchValue] = useState('')
    const [deleteModal, setDeleteModal] = useState(false);
    const [delCarId, setDelCarId] = useState(0)
    const { cars } = useSelector(state => ({
        cars: state.Cars.cars,
      }));

    const {
        match: { params },
      } = props;

    useEffect(() => {
        if (params && params.id) {
          dispatch(onGetCars(params.id));
        } else {
          dispatch(onGetCars(1));
        }
      }, [params, onGetCars]);

    const onClickCreateCar = () => {
        history.push('/car-create/'+params.id)
      };

    const filterVinCar = cars.filter(car => {
        return car.vin.toLowerCase().includes(searchValue.toLowerCase())
    })

    const onClickDeleteCar = () => {
       const deleteCar = {
           "id": delCarId
       }
       dispatch(onDeleteCar(deleteCar))
       history.push("/car-list/"+params.id)
       setDeleteModal(false);
   };

   const onClickDelete = (car_id) => {
       setDelCarId(car_id)
       setDeleteModal(true);
   };

   const onClickPrev = () => {
       history.push('/customer-detail/'+params.id)
   };

    return (
      <>
        <React.Fragment>
            <DeleteModal
                show={deleteModal}
                onDeleteClick={onClickDeleteCar}
                onCloseClick={() => setDeleteModal(false)}
            />
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
                                            <Col xxl={4} lg={12}>
                                                <div className="position-relative">
                                                    <div className="search-box me-xxl-2 my-3 my-xxl-0 d-inline-block">
                                                      <div className="position-relative">
                                                        <label htmlFor="search-bar-0" className="search-label">
                                                            <Input
                                                                type="text"
                                                                className="form-control"
                                                                autoComplete="off"
                                                                placeholder="Search VIN Number"
                                                                onChange={(event) => setSearchValue(event.target.value)}
                                                            />
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className="text-sm-end">
                                                  <Button
                                                    type="button"
                                                    color="primary"
                                                    className="btn-rounded mb-2 me-2"
                                                    onClick={() => {
                                                        onClickPrev()
                                                    }}
                                                  >
                                                    <i className="mdi mdi-arrow-left-bold-outline me-1" />
                                                    Back
                                                  </Button>
                                                  <Button
                                                    type="button"
                                                    color="success"
                                                    className="btn-rounded mb-2 me-2"
                                                    onClick={() => {
                                                        onClickCreateCar()
                                                    }}
                                                  >
                                                    <i className="mdi mdi-plus me-1" />
                                                    New Car
                                                  </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </form>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="12">
                          <div className="">
                            <div className="table-responsive">
                              <Table className="project-list-table table-nowrap align-middle table-borderless">
                                <thead>
                                  <tr>
                                    <th scope="col" style={{ width: "100px" }}>
                                      Image
                                    </th>
                                    <th scope="col" >Vin</th>
                                    <th scope="col">Model</th>
                                    <th scope="col">Make</th>
                                    <th scope="col" style={{ width: "150px" }}>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {filterVinCar.map((item, key) => (
                                    <tr key={key}>
                                      <td><img src={API_URL+item.image} alt="" className="w-75" /></td>
                                      <td>
                                        <h5 className="text-truncate font-size-14">{item.vin}</h5>
                                      </td>
                                      <td>{item.model}</td>
                                      <td>{item.make}</td>
                                      <td>
                                          <ul className="list-unstyled hstack gap-1 mb-0">
                                            <li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
                                                <Link
                                                    to={"/car-detail/"+item.id}
                                                    className="btn btn-sm btn-soft-primary"
                                                >
                                                    <i className="mdi mdi-eye-outline" id="viewtooltip"></i>
                                                </Link>
                                            </li>

                                            <li>
                                                <Link
                                                    to="#"
                                                    className="btn btn-sm btn-soft-danger"
                                                    onClick={() => {
                                                        const id = item.id;
                                                        onClickDelete(id);
                                                    }}
                                                >
                                                    <i className="mdi mdi-delete-outline" id="deletetooltip" />
                                                    <UncontrolledTooltip placement="top" target="deletetooltip">
                                                        Delete
                                                    </UncontrolledTooltip>
                                                </Link>
                                            </li>
                                              {/*btn-sm*/}
                                            <li>
                                                <Link
                                                    to={'/tasks-create/'+item.id}
                                                    className="btn btn-sm btn-soft-info"
                                                >
                                                    <i className="mdi mdi-arrow-right-circle-outline" id="edittooltip" />
                                                    <UncontrolledTooltip placement="top" target="edittooltip">
                                                        Next
                                                    </UncontrolledTooltip>
                                                </Link>
                                            </li>

                                        </ul>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    {/*<Row>*/}
                    {/*    <Col lg={12}>*/}
                    {/*        <Card className="job-filter">*/}
                    {/*            <CardBody>*/}
                    {/*                <form action="#">*/}
                    {/*                    <Row className="g-3">*/}
                    {/*                        <Col xxl={4} lg={4}>*/}
                    {/*                            <div className="position-relative">*/}
                    {/*                                <Input*/}
                    {/*                                    type="text"*/}
                    {/*                                    className="form-control"*/}
                    {/*                                    id="searchJob"*/}
                    {/*                                    autoComplete="off"*/}
                    {/*                                    placeholder="Search your candidate"*/}
                    {/*                                    onChange={(event) => setSearchValue(event.target.value)}*/}
                    {/*                                />*/}
                    {/*                            </div>*/}
                    {/*                        </Col>*/}
                    {/*                    </Row>*/}
                    {/*                </form>*/}
                    {/*            </CardBody>*/}
                    {/*        </Card>*/}
                    {/*    </Col>*/}

                    {/*</Row>*/}
                    {/*<Row>*/}
                    {/*    {(filterVinCar || []).map((item , key) => (*/}
                    {/*    <Col xl={3} key={key}>*/}
                    {/*        <Card>*/}
                    {/*            <CardBody>*/}
                    {/*                <div className="d-flex align-start mb-3">*/}
                    {/*                </div>*/}
                    {/*                <div className="text-center mb-3">*/}
                    {/*                    <img src={item.image} alt="" className="avatar-sm rounded-circle" />*/}
                    {/*                    <h6 className="font-size-15 mt-3 mb-1">{item.model} / {item.vin}</h6>*/}
                    {/*                    <p className="mb-0 text-muted">{item.description}</p>*/}
                    {/*                </div>*/}
                    {/*                <div className="hstack gap-2 justify-content-center">*/}
                    {/*                    {(item.skills || []).map((subItem , key) => (*/}
                    {/*                    <span key={key} className="badge badge-soft-secondary">{subItem}</span>*/}
                    {/*                    ))}*/}
                    {/*                </div>*/}

                    {/*                <div className="mt-4 pt-1">*/}
                    {/*                    <Link to={"/car-detail/"+item.id} className="btn btn-soft-primary d-block">View Detail Car</Link>*/}
                    {/*                </div>*/}
                    {/*            </CardBody>*/}
                    {/*        </Card>*/}
                    {/*    </Col>*/}
                    {/*    ))}*/}
                    {/*</Row>*/}
                    {/*<FormGroup className="mb-4" row>*/}
                    {/*    <Col lg="12">*/}
                    {/*      <Row>*/}
                    {/*        <Col md="6" className="pr-0">*/}
                    {/*          <button*/}
                    {/*            className="btn btn-primary btn-block inner form-control"*/}
                    {/*            type="submit"*/}
                    {/*            // onClick={prevStep}*/}
                    {/*          >*/}
                    {/*            Prev*/}
                    {/*          </button>*/}
                    {/*        </Col>*/}
                    {/*        <Col md="6" className="pl-0">*/}
                    {/*          <button*/}
                    {/*            className="btn btn-primary btn-block inner form-control"*/}
                    {/*            type="submit"*/}
                    {/*            onClick={() => {*/}
                    {/*                onClickCreateCar()*/}
                    {/*            }}*/}
                    {/*          >*/}
                    {/*            Create*/}
                    {/*          </button>*/}
                    {/*        </Col>*/}
                    {/*      </Row>*/}
                    {/*    </Col>*/}
                    {/*  </FormGroup>*/}
                </Container>
            </div>
        </React.Fragment>
      </>
    );
}

export default ListCars;