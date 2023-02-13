import React, {useEffect} from "react"

import { Row, Col, Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"

import avatar1 from "assets/images/companies/img-5.png";
import profileImg from "../../assets/images/profile-img.png"
import {useDispatch, useSelector} from "react-redux";
import {getProfile as onGetProfile} from "../../store/profile/actions";

const WelcomeComp = () => {

  const dispatch = useDispatch();

  const { profile } = useSelector(state => ({
        profile: state.ProfileUser.profile,
    }));

    useEffect(() => {
      if (!profile) {
        dispatch(onGetProfile());
      }
    }, [profile]);

  let status_user  = ''
  let username = ''
  let lastname = ''
  let email = ''
  let phone = ''
  let account = ''
  if(profile?.profile){
    username = profile?.profile.username
    lastname = profile?.profile.lastname
    email = profile?.profile.email
    phone = profile?.profile.phone
    if(profile?.profile.status===1){
      status_user = "admin"
    }
    else{
      status_user = "employee"
    }
  }
  if (profile.account){
    account = profile.account.name
  }
  return (
    <React.Fragment>
      <Card className="overflow-hidden">
        <div className="bg-primary bg-soft">
          <Row>
            <Col xs="7">
              <div className="text-primary p-3">
                {/*<h5 className="text-primary">{account}</h5>*/}
                <h5 className="font-size-15 text-truncate">{lastname + ' ' + username}</h5>
                <p>Welcome to AutoPro</p>
              </div>
            </Col>
            <Col xs="5" className="align-self-end">
              <img src={profileImg} alt="" className="img-fluid" />
            </Col>
          </Row>
        </div>
        <CardBody className="pt-0">
          <Row>
            <Col sm="4">
              <div className="avatar-md profile-user-wid mb-4">
                <img
                  src={avatar1}
                  alt=""
                  className="img-thumbnail rounded-circle"
                />
                {/*<h5 className="font-size-15 text-truncate">{lastname + ' ' + username}</h5>*/}
                {/*<p className="text-muted mb-0 text-truncate">status: {status_user}</p>*/}
              </div>
            </Col>

            <Col sm="8">
              <div className="pt-4">
                <Row>
                  <Col xs="6">
                    <h5 className="font-size-14">email</h5>
                    <p className="text-muted mb-0">{email}</p>
                  </Col>
                  <Col xs="6">
                    <h5 className="font-size-14">phone</h5>
                    <p className="text-muted mb-0">{phone}</p>
                  </Col>
                </Row>
                <div className="mt-4 text-end">
                  <Link
                    to="/profile"
                    className="btn btn-primary  btn-sm"
                  >
                    View Profile <i className="mdi mdi-arrow-right ms-1"></i>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}
export default WelcomeComp
