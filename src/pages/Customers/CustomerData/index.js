import React, { useEffect, useState, useMemo } from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import {isEmpty, map} from "lodash";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  UncontrolledTooltip,
  Input,
  FormFeedback,
  Label,
  Form,
  Dropdown,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, Button,
} from "reactstrap";
import {useHistory} from "react-router-dom";
import CardCustomer from "../Card/card-customer";
//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";
import AsyncSelect from "react-select/async";

import DeleteModal from "../../../components/Common/DeleteModal";
import {
  getCustomersData as onGetCustomers,
  addNewCustomerData as onAddNewCustomer,
  updateCustomersData as onUpdateCustomer,
  deleteCustomerData as onDeleteCustomer,
} from "store/customer/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
// import TableContainer from '../../../components/Common/TableContainer';
import TableCustomers from "../../../components/Common/TableCustomers";

// Column
import {
  LastName,
  PhoneEmail,
  FullName,
  Address,
  ID,
} from './CustomerTable';
import toastr from "toastr";
import {getProfile} from "../../../store/profile/actions";


const CustomersList = props => {

  //meta title
  document.title = "Information Customers | AutoPro";

  const dispatch = useDispatch();
  const history = useHistory();
  if (localStorage.getItem("invoiceId")){
    localStorage.removeItem("invoiceId");
  }

  const { customers } = useSelector(state => ({
    customers: state.Customer.customers,
  }));

  const [modal, setModal] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [filterAddress, setFilterAddress] = useState("")
  const [filterPhone, setFilterPhone] = useState("")
  const [filterName, setFilterName] = useState("")

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      fullname: (customer && customer.fullname) || '',
      lastname: (customer && customer.lastname) || '',
      email: (customer && customer.email) || '',
      address: (customer && customer.address) || '',
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Please Enter Your FuulName"),
      lastname: Yup.string().required("Please Enter Your LastName"),
      email: Yup.string().required("Please Enter Your Email"),
      address: Yup.string().required("Please Enter Your Address"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateCustomer = {
          id: customer ? customer.id : 0,
          last_name: values.lastname,
          full_name: values.fullname,
          email: values.email,
          address: values.address
        };
        // update customer
        dispatch(onUpdateCustomer(updateCustomer));
        validation.resetForm();
        dispatch(onGetCustomers());
      } else {
        const newCustomer = {
          full_name: values["fullname"],
          email: values["email"],
          last_name: values['lastname'],
          address: values['address'],
        };
        // save new customer
        dispatch(onAddNewCustomer(newCustomer));
        validation.resetForm();
        dispatch(onGetCustomers());
      }
      toggle();
    },
  });

  const { profile } = useSelector(state => ({
    profile: state.ProfileUser.profile,
  }));

  useEffect(() => {
      dispatch(getProfile());
  }, [dispatch]);

  const onClickCompany = () => {
    if (profile.profile){
      if (profile.profile.is_admin && !profile.account){
        history.push("/register/account")
      }
      else if (profile.account){
        history.push("/create-customer")
      }
      else {
        toastr.error("You currently do not have a company")
      }
    }
    else {
      toastr.error("Error Server")
    }
  }

  const toggle = () => {
    if (modal) {
      setModal(false);
      setCustomer(null);
    } else {
      setModal(true);
    }
  };

  //delete customer
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
    }
  };

  useEffect(() => {
    dispatch(onGetCustomers());
  }, [dispatch]);

  const filterData = customers.filter(customer => {
    return customer.country.toLowerCase().includes(filterAddress.toLowerCase()) && customer.full_name.toLowerCase().includes(filterName.toLowerCase())
  })

  useEffect(() => {
    dispatch(onGetCustomers());
  }, [dispatch]);

  return (
      <React.Fragment>
        <DeleteModal
            show={deleteModal}
            onDeleteClick={handleDeleteCustomer}
            onCloseClick={() => setDeleteModal(false)}
        />
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs title="Ecommerce" breadcrumbItem="Customers"/>
            <Row className="m-auto">
              <Card>
                <CardBody>
                  <div className="d-sm-flex flex-wrap">
                    <Col lg="8">
                      <div className="search-box text-start">
                        <Row>
                          <Col>
                            <label htmlFor="search-bar-0" className="search-label">
                              <Input
                                  type="text"
                                  className="form-control mb-3 mb-xxl-0 w-xl"
                                  autoComplete="off"
                                  placeholder="name"
                                  onChange={(event) => setFilterName(event.target.value)}
                              />
                            </label>
                          </Col>
                          <Col>
                            <label htmlFor="search-bar-0" className="search-label">
                              <Input
                                  type="text"
                                  className="form-control mb-3 mb-xxl-0 w-xl"
                                  autoComplete="off"
                                  placeholder="address"
                                  onChange={(event) => setFilterAddress(event.target.value)}
                              />
                            </label>
                          </Col>
                          <Col>
                            <label htmlFor="search-bar-0" className="search-label">
                              <Input
                                  type="text"
                                  className="form-control mb-3 mb-xxl-0 w-xl"
                                  autoComplete="off"
                                  placeholder="phone"
                                  onChange={(event) => setFilterPhone(event.target.value)}
                              />
                            </label>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    <Col lg="4">
                      <div className="text-lg-end">
                          <Button
                            type="button"
                            color="success"
                            className="btn-rounded text-lg-center"
                            onClick={onClickCompany}
                            // onClick={handleCustomerClick}
                          >
                            <i className="mdi mdi-plus me-1" />
                            New Customer
                          </Button>
                      </div>
                    </Col>
                  </div>
                </CardBody>
              </Card>
            </Row>
            <Row>
              {map(filterData, (customer, key) => (
                <CardCustomer data={customer} key={"_invoice_" + key} />
              ))}
            </Row>
          </Container>
        </div>
      </React.Fragment>
  )

};

CustomersList.propTypes = {
  customers: PropTypes.array,
  onGetCustomers: PropTypes.func,
  onAddNewCustomer: PropTypes.func,
  onDeleteCustomer: PropTypes.func,
  onUpdateCustomer: PropTypes.func,
};

export default CustomersList;