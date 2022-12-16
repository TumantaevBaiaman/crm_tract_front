import {call, put, takeEvery} from "redux-saga/effects";
import {addNewMyAccount} from "../../helpers/backend_helper";
import {addAccountSuccess, addAccountFail} from "./actions";
import {ADD_NEW_ACCOUNT} from "./actionTypes";

function* onAddNewAccount({ payload: account }) {

  try {
    const response = yield call(addNewMyAccount, account)

    yield put(addAccountSuccess(response))
  } catch (error) {

    yield put(addAccountFail(error))
  }
}

function* company() {
  yield takeEvery(ADD_NEW_ACCOUNT, onAddNewAccount);
}

export default company;