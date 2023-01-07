import { takeEvery, put, call,all,fork  } from "redux-saga/effects";

import {ADD_CUSTOMER_DATA, GET_CUSTOMER_DATA, GET_CUSTOMER_DETAIL, UPDATE_CUSTOMER_DATA, DELETE_CUSTOMER_DATA} from "./actionTypes";
import {
    addCustomerDataSuccess,
    addCustomerDataFail,
    getCustomersDataSuccess,
    getCustomerDataFail,
    getCustomerDetailSuccess,
    getCustomerDetailFail,
    updateCustomersDataSuccess,
    updateCustomerDataFail,
    deleteCustomerDataSuccess,
    deleteCustomerDataFail
} from "./actions";

import {deleteCustomerData, onAddNewCustomer, onGetCustomers, getCustomerDetail, onUpdateCustomerData} from "../../helpers/backend_helper";

function* onAddCustomerData({ payload: user }) {

  try {
    const response = yield call(onAddNewCustomer, user)

    yield put(addCustomerDataSuccess(response))
  } catch (error) {

    yield put(addCustomerDataFail(error))
  }
}

function* fetchCustomers() {
  try {
    const response = yield call(onGetCustomers)
    yield put(getCustomersDataSuccess(response["customers"]))
  } catch (error) {
    yield put(getCustomerDataFail(error))
  }
}

function* onUpdateCustomer({ payload: customer }) {
  try {
    const response = yield call(onUpdateCustomerData, customer);
    yield put(updateCustomersDataSuccess(response));
  } catch (error) {
    yield put(updateCustomerDataFail(error));
  }
}

function* onDeleteCustomer({ payload: customer }) {
  try {
    const response = yield call(deleteCustomerData, customer);
    yield put(deleteCustomerDataSuccess(response));
  } catch (error) {
    yield put(deleteCustomerDataFail(error));
  }
}

function* fetchCustomerDetail({customerId}) {
    try{
        const response = yield call(getCustomerDetail, customerId)
        yield put(getCustomerDetailSuccess(response['customer']))
    } catch (error) {
        yield put(getCustomerDetailFail(error))
    }
}

function* customersSaga() {
    yield takeEvery(ADD_CUSTOMER_DATA, onAddCustomerData)
    yield takeEvery(GET_CUSTOMER_DATA, fetchCustomers)
    yield takeEvery(UPDATE_CUSTOMER_DATA, onUpdateCustomer)
    yield takeEvery(DELETE_CUSTOMER_DATA, onDeleteCustomer)
    yield takeEvery(GET_CUSTOMER_DETAIL, fetchCustomerDetail)
}

export default customersSaga;