import axios, {AxiosError} from "axios";
import { del, get, post, put, postFile } from "./api_helper";
import * as url from "./url_helper";
import API_URL from './api_helper'
import accessToken from "./jwt-token-access/accessToken";

// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

//is user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

const token = localStorage.getItem("access_token")
const config = {
    headers: {
        'content-type': 'multipart/form-data',
        'Authorization': `JWT ${token}`,
      }
};

// Login Method
const postFakeLogin = data => post(
    url.POST_FAKE_LOGIN, data
);

// postForgetPwd
const postFakeForgetPwd = data => post(url.POST_FAKE_PASSWORD_FORGET, data);

const statusUpdate = data => post(url.UPDATE_STATUS, data)

// reports
const myDay = data => post(`${url.MY_DAY}`, data);
const crewRevenue = data => post(`${url.CREW_REVENUE}`, data);
const customerRevenue = data => post(`${url.CUSTOMER_REVENUE}`, data);
const diagramReports = data => post(`${url.REPORTS_DIAGRAM}`, data);
const getTax = data => post(url.GET_TAX, data)

// send
export const sendInvoiceOne = data => {
    return axios.post(API_URL + url.SEND_INVOICE, data, {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': 'JWT '+token
      },
      responseType: 'arraybuffer',
    })
        .then(response => {
            if (response.status >= 200 || response.status <= 299){
                toastr.success("OK")
            }
        })
        .catch(err => console.info(err))
}


export const sendInvoiceList = data => {
    return axios.post(API_URL + url.SEND_INVOICE_LIST, data, {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': 'JWT '+token
      },
      responseType: 'arraybuffer',
    })
        .then(response => {
            if (response.status >= 200 || response.status <= 299){
                toastr.success("OK")
            }
        })
        .catch(err => console.info(err))
}

// export
// export const exportInvoice = data => post(url.EXPORT_INVOICE, data);
export const exportInvoice = data => {
    return axios.post(API_URL + url.EXPORT_INVOICE, data, {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': 'JWT '+token
      },
      responseType: 'arraybuffer',
    })
        .then(result => {
            let date = new Date()
            let current_date = date.getFullYear() + "_" + (date.getMonth()+1) + "_" + date.getDate() + "_" + date.getHours() + "-" + date.getMinutes()
            const filename = 'AutoPro_' + current_date
            const url = URL.createObjectURL(new Blob([result.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', `${filename}.pdf`)
            document.body.appendChild(link)
            link.click()
        })
        .catch(err => console.info(err))
}


export const exportInvoiceList = data => {
    return axios.post(API_URL + url.EXPORT_INVOICE_LIST, data, {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': 'JWT '+token
      },
      responseType: 'arraybuffer',
    })
        .then(result => {
            let date = new Date()
            let current_date = date.getFullYear() + "_" + (date.getMonth()+1) + "_" + date.getDate() + "_" + date.getHours() + "-" + date.getMinutes()
            const filename = 'AutoPro_' + current_date
            const url = URL.createObjectURL(new Blob([result.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', `${filename}.pdf`)
            document.body.appendChild(link)
            link.click()
        })
        .catch(err => console.info(err))
}

export const exportCsv = data => {
    return axios.post(API_URL + url.EXPORT_CSV, data, {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': 'JWT '+token
      },
      responseType: 'arraybuffer',
    })
        .then(result => {
            let date = new Date()
            let current_date = date.getFullYear() + "_" + (date.getMonth()+1) + "_" + date.getDate() + "_" + date.getHours() + "-" + date.getMinutes()
            const filename = 'AutoPro_' + current_date
            const url = URL.createObjectURL(new Blob([result.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', `${filename}.csv`)
            document.body.appendChild(link)
            link.click()
        })
        .catch(err => console.info(err))
}

// add new account
// export const addNewMyAccount = account => post(url.ADD_NEW_ACCOUNT, account);
export const addNewMyAccount = account => {
    return axios.post(API_URL + url.ADD_NEW_ACCOUNT, account, {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': 'JWT '+token
      }
    })
        .then(response => {
            if (response.status >= 200 || response.status <= 299) return response.data;
            throw response.data;
        })
        .catch(err => console.info(err))
}

export const updateAccount = account => {
    return axios.post(API_URL + url.UPDATE_ACCOUNT, account, {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': 'JWT '+token
      }
    })
        .then(response => {
            if (response.status >= 200 || response.status <= 299) return response.data;
            throw response.data;
        })
        .catch(err => console.info(err))
}

// Add Car
const addNewCar = car => {
    return axios.post(API_URL + url.ADD_NEW_CAR, car, {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': 'JWT '+token
      }
    })
        .then(response => {
            if (response.status >= 200 || response.status <= 299) return response.data;
            throw response.data;
        })
        .catch(err => console.info(err))
}

// Register Method
const postJwtRegister = data => {
    return axios
        .post(API_URL + url.POST_REGISTER, data)
        .then(response => {
            if (response.status >= 200 || response.status <= 299) return response.data;
            throw response.data;
        })
        .catch(err => {
            var message;
            if (err.response && err.response.status) {
                switch (err.response.status) {
                    case 404:
                        message = "Sorry! the page you are looking for could not be found";
                        break;
                    case 500:
                        message =
                            "Sorry! something went wrong, please contact our support team";
                        break;
                    case 401:
                        message = "Invalid credentials";
                        break;
                    case 400:
                        message = "Invalid credentials";
                        break;
                    default:
                        message = err[1];
                        break;
                }
            }
            throw message;
        });
};

const postJwtRegisterStep2 = data => {
    return axios
        .post(API_URL + url.POST_REGISTER, data, config)
        .then(response => {
            if (response.status >= 200 || response.status <= 299) return response.data;
            throw response.data;
        })
        .catch(err => {
            var message;
            if (err.response && err.response.status) {
                switch (err.response.status) {
                    case 404:
                        message = "Sorry! the page you are looking for could not be found";
                        break;
                    case 500:
                        message =
                            "Sorry! something went wrong, please contact our support team";
                        break;
                    case 401:
                        message = "Invalid credentials";
                        break;
                    default:
                        message = err[1];
                        break;
                }
            }
            throw message;
        });
};

// Login Method
const postJwtLogin = data => post(url.POST_JWT_LOGIN, data).then().catch(function (err) {
    var message;
    if (err.response && err.response.status) {
      message = "Username and password are invalid. Please enter correct username and password";
    }
    throw message;
});

// postForgetPwd
const postJwtForgetPwd = data => post(url.POST_FAKE_JWT_PASSWORD_FORGET, data);

// postSocialLogin
export const postSocialLogin = data => post(url.SOCIAL_LOGIN, data);

// get customers
export const getCustomers = () => get(url.GET_CUSTOMERS);

// get status
export const getStatus = () => get(url.GET_STATUS);

// add CUSTOMER
export const addNewCustomer = customer => post(url.ADD_NEW_CUSTOMER, customer, config);

// update CUSTOMER
export const updateCustomer = customer => put(url.UPDATE_CUSTOMER, customer);

// delete CUSTOMER
export const deleteCustomer = customer =>
  del(url.DELETE_CUSTOMER, { headers: { customer } });

// get invoices
export const getInvoices = () => get(url.GET_INVOICES);
const getInvoicesCustomer = id =>
    post(`${url.GET_INVOICES_CUSTOMER}`, {"id": id});
const getMyDay = data => post(url.GET_MY_DAY, data)

// get invoice details
export const getInvoiceDetail = id =>
  post(`${url.GET_INVOICE_DETAIL}`, {"id": id});


// tasks
export const getTasks = id =>
    post(url.GET_TASKS, {"id_invoice": id});
export const addTasks = tasks => post(url.ADD_TASKS, tasks);
export const updateTasks = tasks => post(url.UPDATE_TASKS, tasks);

// get dashboard charts data
export const getWeeklyData = () => get(url.GET_WEEKLY_DATA);
export const getYearlyData = () => get(url.GET_YEARLY_DATA);
export const getMonthlyData = () => get(url.GET_MONTHLY_DATA);

// Add Customer
const onAddNewCustomer = user => post(url.ADD_NEW_CUSTOMER_DATA, user);

// Get Customers
const onGetCustomers = () => get(url.GET_CUSTOMER_DATA);
export const getCustomerDetail = id =>
  post(`${url.GET_CUSTOMER_DETAIL}`, {"id": id});

// Update Customers
const onUpdateCustomerData = customer => put(url.UPDATE_CUSTOMER_DATA, customer);

// Delete Customer
export const deleteCustomerData = customer =>
  post(url.DELETE_CUSTOMER_DATA, customer );

// Car
const getCars = id =>
    post(`${url.GET_CARS}`, {"id": id});

const getAllCars = data =>
    post(`${url.GET_ALL_CARS}`, data);

const getCarDetail = id =>
    post(`${url.GET_CAR_DETAIL}`, {"id": id});

export const deleteCar = car =>
    post(url.DELETE_CAR, car)

// export const updateCar = car =>
//     put(url.UPDATE_CAR, car)

export const updateCar = car => {
    return axios.put(API_URL + url.UPDATE_CAR, car, {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': 'JWT '+token
      }
    })
        .then(response => {
            if (response.status >= 200 || response.status <= 299) return response.data;
            throw response.data;
        })
        .catch(err => console.info(err))
}

// Get Profile
const getProfile = () => get(url.GET_PROFILE)

// Update Profile
const updateProfile = profile => put(url.UPDATE_PROFILE, profile);

export {
    getLoggedInUser,
    isUserAuthenticated,
    postFakeLogin,
    postFakeForgetPwd,
    postJwtRegister,
    postJwtRegisterStep2,
    postJwtLogin,
    postJwtForgetPwd,
    onAddNewCustomer,
    onGetCustomers,
    addNewCar,
    getCars,
    getProfile,
    updateProfile,
    onUpdateCustomerData,
    getCarDetail,
    getAllCars,
    getInvoicesCustomer,
    statusUpdate,
    myDay,
    crewRevenue,
    customerRevenue,
    diagramReports,
    getTax,
    getMyDay
};
