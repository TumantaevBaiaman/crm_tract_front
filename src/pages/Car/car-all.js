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
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {useDispatch, useSelector} from "react-redux";
import {
    deleteCar as onDeleteCar,
    getCars as onGetCars,
    getAllCars as onGetAllCars,
} from "store/car/actions";
import {useHistory} from "react-router-dom";
import DeleteModal from "../../components/Common/DeleteModal";


const ListAllCars = ()  => {

    document.title="List Cars | Tract System";

    const dispatch = useDispatch();
    const history = useHistory();

    const [searchValue, setSearchValue] = useState('')
    const [deleteModal, setDeleteModal] = useState(false);
    const [delCarId, setDelCarId] = useState(0)
    const { cars } = useSelector(state => ({
        cars: state.Cars.carsAll,
      }));

    useEffect(() => {
        if (cars && !cars.length) {
          dispatch(onGetAllCars());
        }
      }, [dispatch, cars]);

    console.log(cars)

    const onClickCreateCar = () => {
        history.push('/customers')
      };

    // search

    const filterVinCar = cars.filter(car => {
        return car.vin.toLowerCase().includes(searchValue.toLowerCase())
    })

    const onClickDeleteCar = () => {
       const deleteCar = {
           "id": delCarId
       }
       console.log(deleteCar)
       dispatch(onDeleteCar(deleteCar))
       history.push("/car-list/"+params.id)
       setDeleteModal(false);
       // location.reload()
   };

   const onClickDelete = (car_id) => {
       setDelCarId(car_id)
       setDeleteModal(true);
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
                                    <th scope="col">Description</th>
                                    <th scope="col" style={{ width: "150px" }}>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {filterVinCar.map((item, key) => (
                                    <tr key={key}>
                                      <td><img src={'https://www.ford.com/is/image/content/dam/vdm_ford/live/en_us/ford/nameplate/mustang/2022/collections/dm/21_FRD_MST_wdmp_200510_02313a.tif?croppathe=1_3x2&wid=900'} alt="" className="avatar-sm" /></td>
                                      <td>
                                        {/*<h5 className="text-truncate font-size-14"><Link to="" className="text-dark">{item.name}</Link></h5>*/}
                                        <h5 className="text-truncate font-size-14">{item.vin}</h5>
                                      </td>
                                      <td>{item.model}</td>
                                      <td>{String(item.description).substr(0,25)}...</td>
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
                </Container>
            </div>
        </React.Fragment>
      </>
    );
}

export default ListAllCars;