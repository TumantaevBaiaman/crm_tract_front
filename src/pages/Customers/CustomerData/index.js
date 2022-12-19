import React, { useEffect, useState, useMemo } from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
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
  DropdownItem,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";
import AsyncSelect from "react-select/async";

import DeleteModal from "../../../components/Common/DeleteModal";
import {
  getCustomers as onGetCustomers,
  addNewCustomer as onAddNewCustomer,
  getStatus as onGetStatus,
  updateCustomer as onUpdateCustomer,
  deleteCustomer as onDeleteCustomer,
} from "store/e-commerce/actions";

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
  Rating,
  ID,
  JoiningDate,
} from './CustomerTable';
import {use} from "i18next";
import Select from "react-select";
import {addNewCustomerData, getCustomersData} from "../../../store/customer/actions";

const CustomersList = props => {

  //meta title
  document.title = "Tract system";

  const dispatch = useDispatch();

  const { customers } = useSelector(state => ({
    customers: state.Customer.customers,
  }));

  const [modal, setModal] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [customer, setCustomer] = useState(null);

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
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
          lastname: values.lastname,
          fullname: values.fullname,
          email: values.email,
          address: values.address
        };
        // update customer
        dispatch(onUpdateCustomer(updateCustomer));
        validation.resetForm();
      } else {
        const newCustomer = {
          fullname: values["fullname"],
          email: values["email"],
          lastname: values['lastname'],
          address: values['address'],
        };
        // save new customer
        dispatch(addNewCustomerData(newCustomer));
        validation.resetForm();
      }
      toggle();
    },
  });

  const handleCustomerClick = arg => {
    const customer = arg;

    setCustomer({
      id: customer.id,
      fullname: customer.username,
      lastname: customer.lastname,
      email: customer.email,
      address: customer.address,
    });

    setIsEdit(true);
    toggle();
  };

  // Customber Column
  const columns = useMemo(
    () => [

      {
        Header: '№',
        accessor: 'id',
        filterable: true,
        Cell: (cellProps) => {
          return <ID {...cellProps} />;
        }
        // Cell: () => {
        //   return <input type="checkbox" className="form-check-input" />;
        // }
      },
      {
        Header: 'Email',
        accessor: 'email',
        filterable: true,
        Cell: (cellProps) => {
          return <PhoneEmail {...cellProps} />;
        }
      },
      {
        Header: 'Fullname',
        accessor: 'fullname',
        filterable: true,
        Cell: (cellProps) => {
          return <FullName {...cellProps} />;
        }
      },
      {
        Header: 'Lastname',
        accessor: 'lastname',
        filterable: true,
        Cell: (cellProps) => {
          return <LastName {...cellProps} />;
        }
      },
      {
        Header: 'Address',
        accessor: 'address',
        filterable: true,
        Cell: (cellProps) => {
          return <Address {...cellProps} />;
        }
      },
      {
        Header: 'Action',
        Cell: (cellProps) => {
          return (
            <UncontrolledDropdown>
              <DropdownToggle tag="a" className="card-drop">
                <i className="mdi mdi-dots-horizontal font-size-18"></i>
              </DropdownToggle>

              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem
                  onClick={() => {
                    const customerData = cellProps.row.original;
                    handleCustomerClick(customerData);
                  }
                  }
                >
                  <i className="mdi mdi-pencil font-size-16 text-success me-1" id="edittooltip"></i>
                  Edit
                  <UncontrolledTooltip placement="top" target="edittooltip">
                    Edit
                  </UncontrolledTooltip>
                </DropdownItem>

                <DropdownItem
                  onClick={() => {
                    const customerData = cellProps.row.original;
                    onClickDelete(customerData);
                  }}>
                  <i className="mdi mdi-trash-can font-size-16 text-danger me-1" id="deletetooltip"></i>
                  Delete
                  <UncontrolledTooltip placement="top" target="deletetooltip">
                    Delete
                  </UncontrolledTooltip>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          );
        }
      },
    ],
    []
  );

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

  const handleDeleteCustomer = () => {
    if (customer.id) {
      dispatch(onDeleteCustomer(customer));
      setDeleteModal(false);
    }
  };

  useEffect(() => {
    if (customers && !customers.length) {
      dispatch(getCustomersData());
    }
  }, [dispatch, customers]);

  useEffect(() => {
    setCustomerList(customers);
  }, [customers]);

  useEffect(() => {
    if (!isEmpty(customers)) {
      setCustomerList(customers);
    }
  }, [customers]);

  const handleCustomerClicks = () => {
    setCustomerList("");
    setIsEdit(false);
    toggle();
  };
  console.log(status)

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteCustomer}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Customers" />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <TableCustomers
                    columns={columns}
                    data={customers}
                    isGlobalFilter={true}
                    isAddCustList={true}
                    handleCustomerClick={handleCustomerClicks}
                    customPageSize={10}
                    className="custom-header-css"
                  />

                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag="h4">
                      {!!isEdit
                        ? "Edit Customer"
                        : "Add Customer"}
                    </ModalHeader>
                    <ModalBody>
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                      >
                        <Row>
                          <Col className="col-12">

                            <div className="mb-3">
                              <Label className="form-label">Email</Label>
                              <Input
                                name="email"
                                type="email"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.email || ""}
                                invalid={
                                  validation.touched.email && validation.errors.email ? true : false
                                }
                              />
                              {validation.touched.email && validation.errors.email ? (
                                <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                              ) : null}
                            </div>

                            <div className="mb-3">
                              <Label className="form-label">FullName</Label>
                              <Input
                                name="fullname"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.fullname || ""}
                                invalid={
                                  validation.touched.fullname && validation.errors.fullname ? true : false
                                }
                              />
                              {validation.touched.fullname && validation.errors.fullname ? (
                                <FormFeedback type="invalid">{validation.errors.fullname}</FormFeedback>
                              ) : null}
                            </div>

                            <div className="mb-3">
                              <Label className="form-label">LastName</Label>
                              <Input
                                name="lastname"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.lastname || ""}
                                invalid={
                                  validation.touched.lastname && validation.errors.lastname ? true : false
                                }
                              />
                              {validation.touched.username && validation.errors.lastname ? (
                                <FormFeedback type="invalid">{validation.errors.lastname}</FormFeedback>
                              ) : null}
                            </div>

                            <div className="mb-3">
                              <Label className="form-label">Address</Label>
                              <Input
                                name="address"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.address || ""}
                                invalid={
                                  validation.touched.address && validation.errors.address ? true : false
                                }
                              />
                              {validation.touched.address && validation.errors.address ? (
                                <FormFeedback type="invalid">{validation.errors.address}</FormFeedback>
                              ) : null}
                            </div>


                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="text-end">
                              <button
                                type="submit"
                                className="btn btn-success save-customer"
                              >
                                Create
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>

                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

CustomersList.propTypes = {
  customers: PropTypes.array,
  onGetCustomers: PropTypes.func,
  onAddNewCustomer: PropTypes.func,
  onDeleteCustomer: PropTypes.func,
  onUpdateCustomer: PropTypes.func,
};

export default CustomersList;
