import { takeEvery, put, call,all,fork  } from "redux-saga/effects";

import {ADD_CUSTOMER_DATA, GET_CUSTOMER_DATA} from "./actionTypes";
import {
    addCustomerDataSuccess,
    addCustomerDataFail,
    getCustomersDataSuccess,
    getCustomerDataFail,
} from "./actions";

import {onAddNewCustomer, onGetCustomers} from "../../helpers/backend_helper";
import {getUsersFail, getUsersSuccess} from "../contacts/actions";

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
    yield put(getCustomersDataSuccess(response))
  } catch (error) {
    yield put(getCustomerDataFail(error))
  }
}

function* customersSaga() {
    yield takeEvery(ADD_CUSTOMER_DATA, onAddCustomerData)
    yield takeEvery(GET_CUSTOMER_DATA, fetchCustomers)
}

export default customersSaga;