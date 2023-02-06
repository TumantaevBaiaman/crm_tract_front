import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

// //Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from "../../store/profile/actions";

const SidebarContent = props => {

  const dispatch = useDispatch();
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

  const { profile } = useSelector(state => ({
    profile: state.ProfileUser.profile,
  }));

  useEffect(() => {
    if (!profile) {
      dispatch(getProfile());
    }
  }, [profile]);

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

  if (profile.profile) {
    isAdmin = profile.profile.is_admin;
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>

            <li>
                <Link to="/dashboard" >
                  <i className="bx bx-home-circle"></i>
                  <span>{props.t("Dashboards")}</span>
                </Link>
            </li>
            <li>
              <Link to="/my-day" >
                <i className="bx bx-calendar-event"></i>
                <span>{props.t("My Day")}</span>
              </Link>
            </li>
            {
                isAdmin &&
                <li>
                  <Link to="/#" className="has-arrow ">
                    <i className="bx bx-trending-up"></i>
                    <span>{props.t("Reports")}</span>
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/report-overview">{props.t("Invoice Report Overview")}</Link>
                    </li>
                    <li>
                      <Link to="/report-crew">{props.t("Crew Revenue Report")}</Link>
                    </li>
                    <li>
                      <Link to="/report-customer">{props.t("Customer Revenue Report")}</Link>
                    </li>
                    <li>
                      <Link to="/report-tax">{props.t("Tax Report")}</Link>
                    </li>
                  </ul>
                </li>
            }
            <li>
              <Link to="/customers" >
                <i className="bx bx-group"></i>
                <span>{props.t("Customers")}</span>
              </Link>
            </li>
            <li>
              <Link to="/#"className="has-arrow ">
                <i className="bx bx-money"></i>
                <span>{props.t("Invoice")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/invoices-list">{props.t("Invoices")}</Link>
                </li>
                {/*<li>*/}
                {/*  <Link to="/car-all">{props.t("Services")}</Link>*/}
                {/*</li>*/}
                <li>
                  <Link to="/car-all">{props.t("New Invoice")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-wrench"></i>
                <span>{props.t("Settings")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/register/account/">{props.t("Org settings")}</Link>
                </li>
                <li>
                  <Link to="/employee">{props.t("Users")}</Link>
                </li>
                <li>
                  <Link to="/profile">{props.t("Profile")}</Link>
                </li>
              </ul>
            </li>

          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));
