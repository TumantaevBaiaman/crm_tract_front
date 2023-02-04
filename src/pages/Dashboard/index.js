import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";
import { Link } from "react-router-dom";

import classNames from "classnames";
import EcommerceCustomers from "../Ecommerce/EcommerceCustomers";

//import Charts
import StackedColumnChart from "./StackedColumnChart";

//import action
import {getChartsData as onGetChartsData, getProfile, getReportsCrew as onGetReportCrew, getDiagram as onGetDiogram} from "../../store/actions";


// Pages Components
import WelcomeComp from "./WelcomeComp";
import MonthlyEarning from "./MonthlyEarning";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";

//redux
import { useSelector, useDispatch } from "react-redux";
import MyDay from "../Invoices/my-day";

const Dashboard = props => {

  document.title = "AutoPro";

  const [modal, setmodal] = useState(false);
  const [subscribemodal, setSubscribemodal] = useState(false);

  let newDate = new Date()
  let date_raw = newDate.getDate();
  let month_raw = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let date = ''
  let month = ''

  if (date_raw<10)  {  date ="0"+date_raw.toString()} else {  date =date_raw.toString()}
  if (month_raw<10)  {  month ="0"+month_raw.toString()} else {  month =month_raw.toString()}

  let get_data = {
    from_date: year+"-"+month+"-"+"01",
    to_date: year+"-"+month+"-"+date,
  }

  const { chartsData } = useSelector(state => ({
    chartsData: state.Report.diagramData
  }));

  const reports = [
    { title: "Groos Revenue", iconClass: "bx-money", description: "$ 17, 235" },
    { title: "Net Revenue", iconClass: "bx-money", description: "$35, 723" },
  ];

  useEffect(() => {
    setTimeout(() => {
      setSubscribemodal(true);
    }, 2000);
  }, []);

  const [periodData, setPeriodData] = useState([]);
  const [periodType, setPeriodType] = useState("yearly");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onGetDiogram(get_data));
  }, [dispatch]);

  useEffect(() => {
    let newDashArr = [];
    let newGrowArr = [];
    let currDashArr = chartsData?.statistics || []
    if (currDashArr?.length) {
      currDashArr.forEach((item) => {
        newDashArr.push(Math.round(item.sum || 0));
        newGrowArr.push(Math.round(item.gross || 0));
      });
    }
    setPeriodData([
      {
        name: "sum",
        data: newDashArr
      },
      {
        name: "gross",
        data: newGrowArr
      }
    ])
  }, [chartsData])

  console.log(chartsData)

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Dashboards")}
            breadcrumbItem={props.t("Dashboard")}
          />

          <Row>
            <Col xl="4">
              <WelcomeComp />
              <MonthlyEarning />
            </Col>
            <Col xl="8">
              <Row>
                {reports.map((report, key) => (
                  <Col md="6" key={"_col_" + key}>
                    <Card className="mini-stats-wid">
                      <CardBody>
                        <div className="d-flex">
                          <div className="flex-grow-1">
                            <p className="text-muted fw-medium">
                              {report.title}
                            </p>
                            <h4 className="mb-0">{report.description}</h4>
                          </div>
                          <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-primary">
                              <i
                                className={
                                  "bx " + report.iconClass + " font-size-24"
                                }
                              ></i>
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>

              <Card>
                <CardBody>
                  <div className="d-sm-flex flex-wrap">
                    <h4 className="card-title mb-4">Email Sent</h4>
                    <div className="ms-auto">
                      <ul className="nav nav-pills">
                        <li className="nav-item">
                          <Link
                            to="#"
                            className={classNames(
                              { active: periodType === "weekly" },
                              "nav-link"
                            )}
                            // onClick={() => {
                            //   onChangeChartPeriod("weekly");
                            // }}
                            id="one_month"
                          >
                            Week
                          </Link>{" "}
                        </li>
                        <li className="nav-item">
                          <Link
                            to="#"
                            className={classNames(
                              { active: periodType === "monthly" },
                              "nav-link"
                            )}
                            // onClick={() => {
                            //   onChangeChartPeriod("monthly");
                            // }}
                            id="one_month"
                          >
                            Month
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="#"
                            className={classNames(
                              { active: periodType === "yearly" },
                              "nav-link"
                            )}
                            // onClick={() => {
                            //   onChangeChartPeriod("yearly");
                            // }}
                            id="one_month"
                          >
                            Year
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* <div className="clearfix"></div> */}
                  <StackedColumnChart periodData={periodData} dataColors='["--bs-primary", "--bs-warning", "--bs-success"]' />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            {/*<MyDay/>*/}
            <EcommerceCustomers />
          </Row>

        </Container>
      </div>

    </React.Fragment>
  );
};

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Dashboard);
