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
import TableContainer from '../../../components/Common/TableContainer';


// Column
import {
  UserName,
  PhoneEmail,
  Address,
  Rating,
  WalletBalances,
  JoiningDate,
} from './EcommerceCustCol';
import {use} from "i18next";
import Select from "react-select";

const EcommerceCustomers = props => {

  //meta title
  document.title = "Tract system";

  const dispatch = useDispatch();

  const { customers } = useSelector(state => ({
    customers: state.ecommerce.customers,
  }));
  const { status } = useSelector(state=>({
    status: state.ecommerce.status,
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
      username: (customer && customer.username) || '',
      lastname: (customer && customer.lastname) || '',
      status: (customer && customer.status) || '',
      phone: (customer && customer.phone) || '',
      email: (customer && customer.email) || '',
      // address: (customer && customer.address) || '',
      // rating: (customer && customer.rating) || '',
      // walletBalance: (customer && customer.walletBalance) || '',
      joiningDate: (customer && customer.joiningDate) || '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Your Name"),
      lastname: Yup.string().required("Please Enter Your LastName"),
      status: Yup.string().required("Please Enter Your Status"),
      phone: Yup.string().required("Please Enter Your Phone"),
      email: Yup.string().required("Please Enter Your Email"),
      // address: Yup.string().required("Please Enter Your Address"),
      // rating: Yup.string().required("Please Enter Your Rating"),
      // walletBalance: Yup.string().required("Please Enter Your Wallet Balance"),
      joiningDate: Yup.string().required("Please Enter Your Joining Date"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateCustomer = {
          id: customer ? customer.id : 0,
          lastname: values.lastname,
          username: values.username,
          status: values.status,
          phone: values.phone,
          email: values.email,
          // rating: values.rating,
          // walletBalance: values.walletBalance,
          date_of_birth: values.joiningDate,
        };
        // update customer
        dispatch(onUpdateCustomer(updateCustomer));
        validation.resetForm();
      } else {
        const newCustomer = {
          step: 2,
          // id: Math.floor(Math.random() * (30 - 20)) + 20,
          username: values["username"],
          phone: values["phone"],
          status: values["status"],
          email: values["email"],
          lastname: values['lastname'],
          // rating: values["rating"],
          // walletBalance: values["walletBalance"],
          date_of_birth: values["joiningDate"],
        };
        // save new customer
        dispatch(onAddNewCustomer(newCustomer));
        validation.resetForm();
      }
      toggle();
    },
  });

  const handleCustomerClick = arg => {
    const customer = arg;

    setCustomer({
      id: customer.id,
      username: customer.username,
      lastname: customer.lastname,
      status: customer.status,
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
      date_of_birth: customer.joiningDate,
    });

    setIsEdit(true);
    toggle();
  };

  console.log(customers)

  // Customber Column
  const columns = useMemo(
    () => [

      {
        Header: '№',
        accessor: 'id',
        filterable: true,
        Cell: (cellProps) => {
          return <WalletBalances {...cellProps} />;
        }
        // Cell: () => {
        //   return <input type="checkbox" className="form-check-input" />;
        // }
      },
      {
        Header: 'Username',
        accessor: 'username',
        filterable: true,
        Cell: (cellProps) => {
          return <UserName {...cellProps} />;
        }
      },
      {
        Header: 'LastName',
        accessor: 'lastname',
        filterable: true,
        Cell: (cellProps) => {
          return <UserName {...cellProps} />;
        }
      },
      {
        Header: 'Email',
        accessor: 'email',
        filterable: true,
        Cell: (cellProps) => {
          return <PhoneEmail {...cellProps} />;
          ;
        }
      },
      {
        Header: 'Phone',
        accessor: 'phone',
        filterable: true,
        Cell: (cellProps) => {
          return <PhoneEmail {...cellProps} />;
        }
      },
      {
        Header: 'Status',
        accessor: 'status',
        filterable: true,
        Cell: (cellProps) => {
          return <WalletBalances {...cellProps} />;
        }
      },
      {
        Header: 'Date of birth',
        accessor: 'date_of_birth',
        Cell: (cellProps) => {
          return <JoiningDate {...cellProps} />;
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
      dispatch(onGetCustomers());
      dispatch(onGetStatus());
    }
  }, [dispatch, customers]);

  useEffect(() => {
    setCustomerList(customers);
    setStatusList(status);
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

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteCustomer}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="List" breadcrumbItem="Employee" />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <TableContainer
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
                        ? "Edit Employee"
                        : "Add Employee"}
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
                              <Label className="form-label">UserName</Label>
                              <Input
                                name="username"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.username || ""}
                                invalid={
                                  validation.touched.username && validation.errors.username ? true : false
                                }
                              />
                              {validation.touched.rating && validation.errors.rating ? (
                                <FormFeedback type="invalid">{validation.errors.rating}</FormFeedback>
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
                              <Label className="form-label">Phone Number</Label>
                              <Input
                                name="phone"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.phone || ""}
                                invalid={
                                  validation.touched.phone && validation.errors.phone ? true : false
                                }
                              />
                              {validation.touched.phone && validation.errors.phone ? (
                                <FormFeedback type="invalid">{validation.errors.phone}</FormFeedback>
                              ) : null}
                            </div>

                            <div className="mb-3">
                              <Label className="form-label">Status</Label>
                              <select
                                  name="status"
                                  type="select"
                                  className="form-select"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  invalid={
                                    validation.touched.status && validation.errors.status ? true : false
                                  }
                              >
                                <option value=""></option>
                                {status.map(option => (
                                    <option key={option.id} value={option.name}>
                                      {option.name}
                                    </option>
                                  ))}
                                {validation.touched.status && validation.errors.status ? (
                                <FormFeedback type="invalid">{validation.errors.status}</FormFeedback>
                              ) : null}
                              </select>
                            </div>

                            <div className="mb-3">
                              <Label className="form-label">Date of birth</Label>
                              <Input
                                name="joiningDate"
                                type="date"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.joiningDate || ""}
                                invalid={
                                  validation.touched.joiningDate && validation.errors.joiningDate ? true : false
                                }
                              />
                              {validation.touched.joiningDate && validation.errors.joiningDate ? (
                                <FormFeedback type="invalid">{validation.errors.joiningDate}</FormFeedback>
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

EcommerceCustomers.propTypes = {
  customers: PropTypes.array,
  onGetCustomers: PropTypes.func,
  onAddNewCustomer: PropTypes.func,
  onDeleteCustomer: PropTypes.func,
  onUpdateCustomer: PropTypes.func,
};

export default EcommerceCustomers;
