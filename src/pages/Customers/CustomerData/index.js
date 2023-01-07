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
import {useHistory} from "react-router-dom";

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


//Profile Customer
import ProfileCustomer from "./ProfileCustomer";
import ListCars from "./ListCars";
import CreateCar from "./CreateCar";
import CreateTask from "./CreateTasks";

const CustomersList = props => {



  //meta title
  document.title = "Information Customers | Tract System";

  const dispatch = useDispatch();
  const history = useHistory();

  const { customers } = useSelector(state => ({
    customers: state.Customer.customers,
  }));

  const [modal, setModal] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [profile, setProfile] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({})
  const [step, setStep] = useState(0);

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

  const handleCustomerClick = arg => {
    const customer = arg;

    setCustomer({
      id: customer.id,
      fullname: customer.full_name,
      lastname: customer.last_name,
      email: customer.email,
      address: customer.address,
    });

    setIsEdit(true);
    toggle();
  };

  const updateCustomerData = arg => {
    const customerInfo = arg;

    setCustomer({
      id: customerInfo.id,
      full_name: customerInfo.full_name,
      last_name: customerInfo.last_name,
      email: customerInfo.email,
      address: customerInfo.address,
    });

    dispatch(onUpdateCustomer(customer));
    dispatch(onGetCustomers());

  };

  const nextStep = () => {
    dispatch(onGetCustomers());
    setStep(step + 1);
    // setIsEdit(false);
  };

  const prevStep = () => {
    dispatch(onGetCustomers());
    setStep(step - 1);
    // setIsEdit(false);
  };

  // Customber Column
  const columns = useMemo(
    () => [

      {
        Header: 'ID',
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
        accessor: 'full_name',
        filterable: true,
        Cell: (cellProps) => {
          return <FullName {...cellProps} />;
        }
      },
      {
        Header: 'Lastname',
        accessor: 'last_name',
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
                    onClickDetail(customerData)
                    // handleCustomerClick(customerData);
                  }
                  }
                >
                  <i className="mdi mdi-pencil font-size-16 text-success me-1" id="edittooltip"></i>
                  Profile
                  <UncontrolledTooltip placement="top" target="edittooltip">
                    Profile
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
    if (customers && !customers.length) {
      dispatch(onGetCustomers());
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

  switch (step) {
    case 0:
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
                                      Save
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
      )
    case 1:
      return (
          <ProfileCustomer
              DataCustomer={customerInfo}
              nextStep={nextStep}
              prevStep={ prevStep }
              updateCustomerData={updateCustomerData}
          />
      )
    case 2:
      return (
          <ListCars
              DataCustomer={customerInfo}
              nextStep={nextStep}
              prevStep={ prevStep }
          />
      )
    case 3:
      return (
          <CreateCar
              DataCustomer={customerInfo}
              nextStep={nextStep}
              prevStep={ prevStep }
          />
      )
    case 4:
      return (
          <CreateTask
              DataCustomer={customerInfo}
              nextStep={nextStep}
              prevStep={ prevStep }
          />
      )
  }
};

CustomersList.propTypes = {
  customers: PropTypes.array,
  onGetCustomers: PropTypes.func,
  onAddNewCustomer: PropTypes.func,
  onDeleteCustomer: PropTypes.func,
  onUpdateCustomer: PropTypes.func,
};

export default CustomersList;
