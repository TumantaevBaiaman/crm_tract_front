import {ADD_NEW_ACCOUNT, ADD_ACCOUNT_SUCCESS, ADD_ACCOUNT_FAIL} from "./actionTypes";

const initialState = {
  registrationError: null,
  message: null,
  loading: false,
  account: null,
}

const company = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_ACCOUNT:
      return {
        ...state,
        loading: true,
        registrationError: null,
      }

    case ADD_ACCOUNT_SUCCESS:

      return {
        ...state,
        loading: false,
        user: action.payload,
        registrationError: null,
      }

    case ADD_ACCOUNT_FAIL:
      return {
        ...state,
        user: null,
        loading: false,
        registrationError: action.payload,
      }

    default:
      state = { ...state }
      break
  }
  return state
}

export default company