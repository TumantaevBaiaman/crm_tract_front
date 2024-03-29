import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

// //Import Scrollbar
import SimpleBar from "simplebar-react";
import "../../status_account.css"
// MetisMenu
import MetisMenu from "metismenujs";
import {useHistory, withRouter} from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from "../../store/profile/actions";
import {Card, CardBody, Col} from "reactstrap";
import dashboardLogo from "../../assets/images/MobileLogo/dashboardLogo.png"
import customer_logo from "../../assets/images/MobileLogo/customersLogo.png";
import my_day_logo from "../../assets/images/MobileLogo/mydayLogo.png";
import settings_logo from "../../assets/images/MobileLogo/settingsLogo.png";
import invoice_logo from "../../assets/images/MobileLogo/invoicesLogo.png";
import reports_logo from "../../assets/images/MobileLogo/reportLogo.png";

const SidebarContentMobile = props => {

  const dispatch = useDispatch();
  const history = useHistory();
  const ref = useRef();
  useEffect(() => {
    const pathName = props.location.pathname;

    const initMenu = () => {
      new MetisMenu("#side-menu");
      let matchingMenuItem = null;
      const ul = document.getElementById("side-menu");
      const items = ul.getElementsByTagName("a");
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    initMenu();
  }, [props.location.pathname]);

  useEffect(() => {
    ref.current.recalculate();
  });

  const state = useSelector(state => state.ProfileUser.profile);

  useEffect(() => {
    if (!state?.profile) {
      dispatch(getProfile());
    }
  }, [state?.profile]);

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }

  let isAdmin = false;

  if (localStorage.getItem("status_user")===null){
    if (state?.profile) {
      if (state?.profile?.status ===1){
        localStorage.setItem("status_user", 'admin')
      }
      else if (state?.profile?.status===2){
        localStorage.setItem("status_user", 'employee')
      }
    }
  }
  if (localStorage.getItem("status_user")){
    if(localStorage.getItem("status_user")==="admin"){
      isAdmin=true
    }
  }

  function tToggle() {
    var body = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle("sidebar-enable");
    } else {
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
    }
  }

  const onClickNext = (data) => {
      history.push(data)
      tToggle()
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100 bg-white" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled w-100" id="side-menu" style={{listStyle: "none", padding: "0", margin: "", marginLeft: "0", display: "inline-flex", flexWrap: "wrap"}}>
            <Col lg={6} style={{width: "50%"}}>
              <Card className="w-100" onClick={() => onClickNext("/my-day")}>
                  <CardBody style={{width: "100%"}}>
                    <li className="text-color-status text-center">
                      <img src={my_day_logo} alt="" className="rounded avatar-md" />
                      <a>
                        <strong><span className="text-color-status">{props.t("My Day")}</span></strong>
                      </a>
                    </li>
                  </CardBody>
              </Card>
            </Col>
            <Col lg={6} style={{width: "50%"}}>
              <Card className="w-100" onClick={() => onClickNext("/reports-submenu")}>
                <CardBody className="w-100">
                  <li className="text-color-status text-center">
                      <img src={reports_logo} alt="" className="rounded avatar-md" />
                      <a>
                        <strong><span className="text-color-status">{props.t("Reports")}</span></strong>
                      </a>
                  </li>
                </CardBody>
              </Card>
            </Col>
            <Col lg={6} style={{width: "50%"}}>
                <Card className="w-100" onClick={() => onClickNext("/customers")}>
                  <CardBody className="w-100">
                    <li className="text-color-status text-center">
                        <img src={customer_logo} alt="" className="rounded avatar-md" />
                        <a>
                          <strong><span className="text-color-status">{props.t("Customer")}</span></strong>
                        </a>
                    </li>
                  </CardBody>
                </Card>
            </Col>

            {/*<Col lg={6} style={{width: "50%"}}>*/}
            {/*    <Card className="w-100" onClick={() => onClickNext("/settings-submenu")}>*/}
            {/*      <CardBody className="w-100">*/}
            {/*        <li className="text-color-status text-center">*/}
            {/*            <img src={settings_logo} alt="" className="rounded avatar-md" />*/}
            {/*            <a>*/}
            {/*              <strong><span className="text-color-status">{props.t("Settings")}</span></strong>*/}
            {/*            </a>*/}
            {/*        </li>*/}
            {/*      </CardBody>*/}
            {/*    </Card>*/}
            {/*</Col>*/}
            {/*  <ul className="sub-menu">*/}
            {/*    {isAdmin ? <li>*/}
            {/*      <Link to="/register/account/">{props.t("Org settings")}</Link>*/}
            {/*    </li> : null}*/}
            {/*    {isAdmin ? <li>*/}
            {/*      <Link to="/employee">{props.t("Users")}</Link>*/}
            {/*    </li> : null}*/}
            {/*    <li>*/}
            {/*      <Link to="/profile">{props.t("Profile")}</Link>*/}
            {/*    </li>*/}
            {/*  </ul>*/}
            {/*</li>*/}
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContentMobile.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContentMobile));
