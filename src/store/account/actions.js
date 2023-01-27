import {ADD_NEW_ACCOUNT, ADD_ACCOUNT_SUCCESS, ADD_ACCOUNT_FAIL} from "./actionTypes";

export const addNewAccount = (account, history) => ({
  type: ADD_NEW_ACCOUNT,
  payload: {account, history},
})

export const addAccountSuccess = user => ({
  type: ADD_ACCOUNT_SUCCESS,
  payload: user,
})

export const addAccountFail = error => ({
  type: ADD_ACCOUNT_FAIL,
  payload: error,
})