import {
    ADD_CUSTOMER_DATA_SUCCESS,
    ADD_CUSTOMER_DATA_FAIL,
    GET_CUSTOMER_DATA_SUCCESS,
    GET_CUSTOMER_DATA_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  customers: [],
  customerProfile: {},
  error: {},
}

const customer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_CUSTOMER_DATA_SUCCESS:
      return {
        ...state,
        demoData: action.payload,
      };

    case ADD_CUSTOMER_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_CUSTOMER_DATA_SUCCESS:
      return {
        ...state,
        customers: action.payload,
      }

    case GET_CUSTOMER_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state;
  }
};

export default customer;