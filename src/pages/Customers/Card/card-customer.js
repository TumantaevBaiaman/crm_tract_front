import React, {useState} from "react";
import {
    Badge,
    Card,
    CardBody,
    Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Row, UncontrolledDropdown,
    UncontrolledTooltip
} from "reactstrap";
import {Link, useHistory} from "react-router-dom";
import PropTypes from "prop-types";
import customer_logo from "assets/images/default_customer.png"
import {deleteCustomerData as onDeleteCustomer} from "../../../store/customer/actions";
import {useDispatch} from "react-redux";
import DeleteModal from "../../../components/Common/DeleteModal";


const CardCustomer = ({ data }) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const [modal, setModal] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (customer) => {
    setCustomer(customer);
    setDeleteModal(true);
  };

  const onClickDetail = (customer) => {
    history.push('/customer-detail/'+customer.id)
  };

  const handleDeleteCustomer = () => {
    if (customer.id) {
      dispatch(onDeleteCustomer(customer));
      setDeleteModal(false);
      location.reload()
    }
  };

  const onClickNext = () =>{
      history.push("/customer-detail/"+data.id)
  }

  return (
    <React.Fragment>
        <DeleteModal
            show={deleteModal}
            onDeleteClick={handleDeleteCustomer}
            onCloseClick={() => setDeleteModal(false)}
        />
      <Col xl="6" sm="6">
        <Card onClick={onClickNext}>
          <CardBody>

            <Row>
                <Col xs="3" lg={2}>
                    <div className="text-center">
                        <img src={customer_logo} alt="" width="40" className="rounded" />
                    </div>
                </Col>
                <Col xs="9" lg={10}>
                    <div className="">
                        <h6 className="mb-1 font-size-15">{data?.full_name}</h6>
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item me-3">
                            <h5 className="font-size-14" id="duedateTooltip">
                              <i className="bx bx-map me-1 text-primary"/>{" "}
                              {data?.country}
                            </h5>
                          </li>
                          <li className="list-inline-item me-3">
                            <h5 className="font-size-14" id="duedateTooltip">
                              <i className="bx bx-mail-send me-1 text-primary"/>{" "}
                              {data?.email}
                            </h5>
                          </li>
                        </ul>
                        <ul className="list-inline mb-0">
                        <li className="list-inline-item me-3">
                            <h5 className="font-size-12" id="duedateTooltip">
                              <i className="bx bx-phone me-1 text-primary"/>{" 1 phone: "}
                                {data?.phone}
                            </h5>
                          </li>
                          <li className="list-inline-item me-1">
                            <h5 className="font-size-12" id="duedateTooltip">
                              <i className="bx bx-phone me-1 text-primary"/>{" 2 phone: "}
                                {data?.phone2 || "None"}
                            </h5>
                          </li>
                        </ul>
                    </div>
                </Col>
            </Row>
              <Row className="m-auto" onClick={e => e.stopPropagation()}>
                  <Col xs="10">
                      <div className="text-start">
                            <h6 className=" font-size-14">
                                <span className="font-size-11 me-2">Postal Code:</span> {data?.postal_code}
                            </h6>
                        </div>
                  </Col>
                  <Col xs="2">
                      <div className="text-end">
                            <UncontrolledDropdown>
                              <DropdownToggle tag="a" className="card-drop">
                                <i className="bx bx-list-ul font-size-18"></i>
                              </DropdownToggle>

                              <DropdownMenu className="dropdown-menu-end">
                                <DropdownItem
                                      onClick={() => {
                                        onClickDetail(data)
                                      }
                                      }
                                    >
                                      <i className="mdi mdi-pencil font-size-16 text-success me-1" id="edittooltip"></i>
                                      Profile
                                      <UncontrolledTooltip placement="top" target="edittooltip">
                                        Profile
                                      </UncontrolledTooltip>
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                        </div>
                  </Col>
                </Row>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

CardCustomer.propTypes = {
  data: PropTypes.any,
}

export default CardCustomer