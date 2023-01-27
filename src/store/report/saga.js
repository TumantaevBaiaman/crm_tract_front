import { call, put, takeEvery } from "redux-saga/effects"

import {
    GET_DIAGRAM,
    GET_REPORT_CUSTOMER,
    GET_REPORT_CREW,
} from "./actionTypes";

import {
    getDiagramSuccess,
    getDiagramFail,
    getReportsCustomerSuccess,
    getReportsCustomerFail,
    getReportsCrewSuccess,
    getReportsCrewFail
} from "./actions";

import {
    customerRevenue,
    crewRevenue,
    diagramReports
} from "../../helpers/backend_helper";

function* fetchDiagram({ data }){
    try {
        const response = yield call(diagramReports, data)
        yield put(getDiagramSuccess(response))
    } catch (error){
        yield put(getDiagramFail(error))
    }
}

function* fetchCrew({ data }){
    try {
        const response = yield call(crewRevenue, data)
        yield put(getReportsCrewSuccess(response))
    } catch (error){
        yield put(getReportsCrewFail(error))
    }
}

function* fetchCustomer({ data }){
    try {
        const response = yield call(customerRevenue, data)
        yield put(getReportsCustomerSuccess(response))
    } catch (error){
        yield put(getReportsCustomerFail(error))
    }
}

function* reportSaga() {
    yield takeEvery(GET_DIAGRAM, fetchDiagram)
    yield takeEvery(GET_REPORT_CUSTOMER, fetchCustomer)
    yield takeEvery(GET_REPORT_CREW, fetchCrew)
}

export default reportSaga()