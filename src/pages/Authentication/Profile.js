import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {
    BreadcrumbItem, Button,
    Card,
    CardBody, CardTitle,
    Col,
    Container,
    Form,
    FormFeedback,
    Input,
    Label,
    Row, Table,
} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {
    getProfile as onGetProfile,
    updateProfile as onUpdateProfile
} from "../../store/profile/actions";
import Breadcrumb from "../../components/Common/Breadcrumb";
import {useFormik} from "formik";
import * as Yup from "yup";
import {editProfile} from "../../store/auth/profile/actions";


const Profile = () => {

    document.title="Profile | Tract System";

    const dispatch = useDispatch();
    if (localStorage.getItem("invoiceId")){
        localStorage.removeItem("invoiceId");
      }

    const [updateBtn, setUpdateBtn] = useState(false)
    let username = ''
    let lastname = ''
    let email = ''
    let phone = ''
    let date = ''

    const { profile } = useSelector(state => ({
        profile: state.ProfileUser.profile,
    }));

    useEffect(() => {
        dispatch(onGetProfile());
    }, [dispatch]);

    if (profile.profile){
        username = profile.profile.username
        lastname = profile.profile.lastname
        email = profile.profile.email
        phone = profile.profile.phone
        date = profile.profile.date_of_birth
    }

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
          username: username || '',
          lastname: lastname || '',
          email: email || '',
          phone: phone || '',
          joiningDate: date || '',
        },
        validationSchema: Yup.object({
          username: Yup.string().required("Please Enter Your UserName"),
          lastname: Yup.string().required("Please Enter Your LastName"),
          email: Yup.string().required("Please Enter Your Email"),
          phone: Yup.string().required("Please Enter Your Phone"),
          joiningDate: Yup.string().required("Please Enter Your Joining Date"),
        }),
        onSubmit: (values) => {
            const updateData = {
                username: values["username"],
                phone: values["phone"],
                email: values["email"],
                lastname: values['lastname'],
                date_of_birth: values["joiningDate"],
          };
          dispatch(onUpdateProfile(updateData));
          location.reload()
        }
      });

    const clickUpdateBtn = () => {
       if (updateBtn ){
           setUpdateBtn(false)
       }
       else {
           setUpdateBtn(true)
       }
   }

    return (
      <>
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                  <Row>
                      <Col className="col-12">
                        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                          <h4 className="mb-sm-0 font-size-18">Profile</h4>
                          <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                              <BreadcrumbItem>
                                  <span>Profile</span>
                              </BreadcrumbItem>
                              <BreadcrumbItem active>
                                <Link to="#">{email}</Link>
                              </BreadcrumbItem>
                            </ol>
                          </div>
                        </div>
                      </Col>
                    </Row>

                  <Row>
                    <Col lg="12">
                        <Card>
                            <CardBody>
                            <Row>
                                <Col md={6}>
                                  <div className="d-flex">
                                    <div className="flex-grow-1 align-self-center">
                                      <div className="text-muted">
                                          <div className="table-responsive">
                                            <Table className="table-nowrap mb-0">
                                              <tbody>
                                                <tr>
                                                  <th scope="row">E-mail :</th>
                                                  <td>{email}</td>
                                                </tr>
                                                <tr>
                                                  <th scope="row">User Name :</th>
                                                  <td>{username}</td>
                                                </tr>
                                                <tr>
                                                  <th scope="row">Last Name :</th>
                                                  <td>{lastname}</td>
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
                                                  <th scope="row">Mobile Phone :</th>
                                                  <td>{phone}</td>
                                                </tr>
                                                <tr>
                                                  <th scope="row">Date of birth :</th>
                                                  <td>{date}</td>
                                                </tr>
                                              </tbody>
                                            </Table>
                                          </div>
                                      </div>
                                    </div>
                                  </div>
                                </Col>
                            </Row>
                            </CardBody>
                        </Card>
                    </Col>
                      <Col lg={12}>
                          <Card>
                            <CardBody>
                              <div className="text-end">
                                  <Button
                                    color="warning"
                                    onClick={clickUpdateBtn}
                                    className="w-md"
                                  >
                                      <i className="mdi mdi-border-color" id="edittooltip" /> Edit
                                  </Button>
                              </div>
                            </CardBody>
                          </Card>
                      </Col>
                  </Row>
                    {
                        updateBtn &&
                        <>
                        <h4 className="card-title mb-4">Your Profile</h4>

                          <Card>
                            <CardBody>
                              <Form
                                className="form-horizontal"
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  validation.handleSubmit();
                                  return false;
                                }}
                              >
                                <div data-repeater-list="outer-group" className="outer">
                                    <div className="form-group">
                                      <Label className="form-label">Email</Label>
                                      <Input
                                        name="email"
                                        // value={name}
                                        className="form-control"
                                        placeholder="Enter Email"
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
                                    <div className="form-group">
                                      <Label className="form-label">UserName</Label>
                                      <Input
                                        name="username"
                                        // value={name}
                                        className="form-control"
                                        placeholder="Enter UserName"
                                        type="text"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.username || ""}
                                        invalid={
                                          validation.touched.username && validation.errors.username ? true : false
                                        }
                                      />
                                      {validation.touched.username && validation.errors.username ? (
                                        <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                                      ) : null}
                                    </div>
                                    <div className="form-group">
                                      <Label className="form-label">LastName</Label>
                                      <Input
                                        name="lastname"
                                        // value={name}
                                        className="form-control"
                                        placeholder="Enter LastName"
                                        type="text"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.lastname || ""}
                                        invalid={
                                          validation.touched.lastname && validation.errors.lastname ? true : false
                                        }
                                      />
                                      {validation.touched.lastname && validation.errors.lastname ? (
                                        <FormFeedback type="invalid">{validation.errors.lastname}</FormFeedback>
                                      ) : null}
                                    </div>
                                    <div className="form-group">
                                        <Label className="form-label">Phone</Label>
                                        <Input
                                          name="phone"
                                          type="text"
                                          className="form-control"
                                          placeholder="Enter phone"
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
                                  <div className="form-group">
                                    <Label className="form-label">Date</Label>
                                    <Input
                                        name="joiningDate"
                                        type="date"
                                        className="form-control"
                                        placeholder="Enter date"
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
                                  <div className="d-print-none" style={{ marginTop: 25}}>
                                      <div className="float-end">
                                          <button
                                              className="btn btn-success w-auto me-2"
                                            >
                                              <i className="fa fa-cloud-upload-alt" /> Update
                                          </button>
                                      </div>
                                    </div>
                                </div>
                              </Form>
                            </CardBody>
                          </Card>
                        </>
                    }
                </Container>
              </div>
        </React.Fragment>
      </>
    );
}

export default Profile;