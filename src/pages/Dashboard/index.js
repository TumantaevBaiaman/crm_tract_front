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
import {
  getDiagram as onGetDiogram,
} from "../../store/actions";
import SalesAnalytics from "./Analitic";

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
import MyDayDashboard from "./dashboard-list";

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

  const dataNum = [chartsData?.draft_invoices, chartsData?.final_invoices, chartsData?.cancel_invoices]
  const dataName = ["draft", "final", "cancel"]

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

  const [periodDay, setPeriodDay] = useState([]);
  useEffect(() => {
    let newDashArr = [];
    let newGrowArr = [];
    let newGrowDay = [];
    let currDashArr = chartsData?.statistics || []
    if (currDashArr?.length) {
      currDashArr.forEach((item) => {
        newGrowDay.push(item.date)
        newDashArr.push(Math.round(item.sum || 0));
        newGrowArr.push(Math.round(item.gross || 0));
      });
    }
    setPeriodDay(newGrowDay)
    setPeriodData([
      {
        name: "net total",
        data: newDashArr
      },
      {
        name: "gross total",
        data: newGrowArr
      }
    ])
  }, [chartsData])

  const [invoiceDate, setInvoiceDate] = useState('')
  const [generatedDate, setGereratedDate] = useState('')

  const onClickRun = () => {
      if (generatedDate!=="")get_data.to_date=generatedDate;
      if (invoiceDate!=="")get_data.from_date=invoiceDate;
      dispatch(onGetDiogram(get_data))
  }

  useEffect(() => {
    dispatch(onGetDiogram(get_data));
  }, [dispatch]);

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
            <Col xl="3">
              <div className="text-muted">
                <div>
                  <h4>
                    This month information
                  </h4>
                  <br/>
                </div>
                  <div className="mb-4">
                    <h3 className="text-success">${chartsData?.gross_revenue}</h3>
                    <div className="font-size-16">
                      <strong>gross revenue</strong>
                    </div>
                  </div>
                  <br/>
                  <div className="mb-4">
                    <h3 className="text-success">${chartsData?.net_revenue}</h3>
                    <div className="font-size-16">
                      <strong>net revenue</strong>
                    </div>
                  </div>
                </div>
              {/*<MonthlyEarning />*/}
            </Col>
            <Col xl="5">
              <Row>
                <Col>
                  <div className="d-sm-flex flex-wrap">
                    <div className="ms-auto">
                      <Col>
                      <div className="position-relative">
                          <div className="search-box me-xxl-2 my-3 my-xxl-0 d-inline-block">
                            <div className="position-relative">
                              <Row>
                                <Col>
                                  <label htmlFor="search-bar-0" className="search-label">
                                      <Input
                                          type="date"
                                          className="form-control"
                                          autoComplete="off"
                                          onChange={(event) => setInvoiceDate(event.target.value)}
                                      />
                                      </label>
                                    </Col>
                                    <Col>
                                  <label htmlFor="search-bar-0" className="search-label">
                                      <Input
                                          type="date"
                                          className="form-control"
                                          autoComplete="off"
                                          onChange={(event) => setGereratedDate(event.target.value)}
                                      />
                                      </label>
                                    </Col>
                                    <Col>
                                      <button className="btn btn-success" onClick={onClickRun}>Run</button>
                                    </Col>
                                  </Row>
                                </div>
                            </div>
                        </div>
                      </Col>
                    </div>
                  </div>
                  {/* <div className="clearfix"></div> */}
                  <StackedColumnChart periodData={periodData} day={periodDay} dataColors='["--bs-primary", "--bs-warning", "--bs-success"]' />
                </Col>
              </Row>
            </Col>
            <Col xl="4">
              <SalesAnalytics dataColors='["--bs-primary", "--bs-success", "--bs-danger"]' dataCount={dataNum} dataName={dataName}/>
            </Col>
          </Row>
          <Row>
            {/*<MyDay/>*/}
            {/*<EcommerceCustomers />*/}
            <MyDayDashboard />
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
