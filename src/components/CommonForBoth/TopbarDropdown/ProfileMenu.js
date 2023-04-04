import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, Button,
} from "reactstrap";

//i18n
import { withTranslation } from "react-i18next";
// Redux
import {connect, useDispatch, useSelector} from "react-redux";
import {withRouter, Link, useHistory} from "react-router-dom";

// users
import user1 from "assets/images/companies/img-5.png";
import {getProfile} from "../../../store/profile/actions";

const ProfileMenu = props => {

  const [menu, setMenu] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const { profile } = useSelector(state => ({
        profile: state.ProfileUser.profile,
    }));

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);


  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        const obj = JSON.parse(localStorage.getItem("authUser"));
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        const obj = JSON.parse(localStorage.getItem("authUser"));
      }
    }
  }, [props.success]);

  const onClickLogout = () =>{
    localStorage.clear();
    history.push("/logout")
  }

  const onClickAccountStatus = (data) => {
    localStorage.setItem("account_status", data)
    history.push("/my-day")
    location.reload()
  }

  return (
    <React.Fragment>
      <div className="position-relative">
      </div>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          {/*<img*/}
          {/*  className="rounded-circle header-profile-user"*/}
          {/*  src={user1}*/}
          {/*  alt="Header Avatar"*/}
          {/*/>*/}
          <span className="d-xl-inline-block ms-2 me-1"><i className="bx bx-cog text-white" style={{fontSize: "22px"}} /></span>
          {/*<i className="mdi mdi-chevron-down d-none d-xl-inline-block text-white" />*/}
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <div className="dropdown-divider" />
          <Button className="dropdown-item" onClick={onClickLogout}>
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>{props.t("Logout")}</span>
          </Button>
          {localStorage.getItem("account_status")==="1" ? (
              <Button className="dropdown-item" onClick={() => {
                onClickAccountStatus(0)
              }}>
                <i className="bx bx-right-arrow-circle font-size-16 align-middle me-1 text-dark" />
                <span>{props.t("Black Account")}</span>
              </Button>
          ): (
              <Button className="dropdown-item" onClick={() => {
                onClickAccountStatus(1)
              }}>
                <i className="bx bx-right-arrow-circle font-size-16 align-middle me-1 text-dark" />
                <span>{props.t("White Account")}</span>
              </Button>
          )}
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any
};

const mapStatetoProps = state => {
  const { error, success } = state.Profile;
  return { error, success };
};

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
);
