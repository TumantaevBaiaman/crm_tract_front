import {
    ADD_CUSTOMER_DATA,
    ADD_CUSTOMER_DATA_SUCCESS,
    ADD_CUSTOMER_DATA_FAIL,
    GET_CUSTOMER_DATA,
    GET_CUSTOMER_DATA_SUCCESS,
    GET_CUSTOMER_DATA_FAIL,
} from "./actionTypes";
import {GET_USERS, GET_USERS_SUCCESS} from "../contacts/actionTypes";

export const addNewCustomerData = customer => ({
  type: ADD_CUSTOMER_DATA,
  payload: customer,
})

export const addCustomerDataSuccess = customer => ({
  type: ADD_CUSTOMER_DATA_SUCCESS,
  payload: customer,
})

export const addCustomerDataFail = error => ({
  type: ADD_CUSTOMER_DATA_FAIL,
  payload: error,
})

export const getCustomersData = () => ({
  type: GET_CUSTOMER_DATA,
})

export const getCustomersDataSuccess = customer => ({
  type: GET_CUSTOMER_DATA_SUCCESS,
  payload: customer,
})

export const getCustomerDataFail = error => ({
  type: GET_CUSTOMER_DATA_FAIL,
  payload: error,
})

