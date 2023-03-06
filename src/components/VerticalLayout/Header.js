import PropTypes from 'prop-types';
import React, { useState, useEffect } from "react";

import {connect, useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";


//i18n
import { withTranslation } from "react-i18next";

// Redux Store
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType, getProfile,
} from "../../store/actions";
import {useMediaQuery} from "react-responsive";

const Header = props => {

  const dispatch = useDispatch();
  const history = useHistory();

  const { profile } = useSelector(state => ({
        profile: state.ProfileUser.profile,
    }));

  function tToggle() {
    var body = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle("sidebar-enable");
    } else {
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
    }
  }

  useEffect(() => {
    if (!profile) {
      dispatch(getProfile());
    }
  }, [profile]);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header bg-status-account">
          <div className="d-flex">

            {isMobile ?
                null:(
                   <div className="navbar-brand-box d-lg-none d-md-block">
                      <Link to="/" className="logo logo-dark">
                        <span className="logo-sm">
                          {/*<img src={logo} alt="" height="22" />*/}
                        </span>
                      </Link>

                      <Link to="/" className="logo logo-light">
                        <span className="logo-sm">
                          {/*<img src={logoLightSvg} alt="" height="22" />*/}
                        </span>
                      </Link>
                    </div>
                )
            }

            <button
              type="button"
              onClick={() => {
                tToggle();
              }}
              className="btn btn-sm px-3 font-size-16 header-item "
              id="vertical-menu-btn"
            >
              {isMobile ?
                  (<i className="fa fa-fw fa-home text-white font-size-24" />) : (<i className="fa fa-fw fa-bars text-white" />)
              }
            </button>

            </div>
          <div className="d-flex">

            <ProfileMenu />

          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

Header.propTypes = {
  changeSidebarType: PropTypes.func,
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func
};

const mapStatetoProps = state => {
  const {
    layoutType,
    showRightSidebar,
    leftMenu,
    leftSideBarType,
  } = state.Layout;
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(withTranslation()(Header));
