import {call, put, takeEvery} from "redux-saga/effects";
import {addNewMyAccount} from "../../helpers/backend_helper";
import {addAccountSuccess, addAccountFail} from "./actions";
import {ADD_NEW_ACCOUNT} from "./actionTypes";
import toastr from "toastr";

function* onAddNewAccount({ payload: {account, history} }) {

  try {
    const response = yield call(addNewMyAccount, account)
    console.log(response)
    yield put(addAccountSuccess(response))
    history.push("/dashboard");
    toastr.success("Success Create Account")
    // location.reload();
  } catch (error) {
    yield put(addAccountFail(error))
    toastr.error("Error Create Account")
  }
}

function* company() {
  yield takeEvery(ADD_NEW_ACCOUNT, onAddNewAccount);
}

export default company;