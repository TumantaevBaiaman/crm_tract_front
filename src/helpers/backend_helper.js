import axios, {AxiosError} from "axios";
import { del, get, post, put, postFile } from "./api_helper";
import * as url from "./url_helper";
import API_URL from './api_helper'
import accessToken from "./jwt-token-access/accessToken";
import {ADD_NEW_CUSTOMER_DATA} from "./url_helper";
import {useHistory} from "react-router-dom";

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

const token = accessToken
const config = {
    headers: {
        'content-type': 'multipart/form-data',
        'Authorization': 'JWT '+token,
      }
};

// Login Method
const postFakeLogin = data => post(
    url.POST_FAKE_LOGIN, data
);

// postForgetPwd
const postFakeForgetPwd = data => post(url.POST_FAKE_PASSWORD_FORGET, data);

// Edit profile
const postJwtProfile = data => post(url.POST_EDIT_JWT_PROFILE, data);

const postFakeProfile = data => post(url.POST_EDIT_PROFILE, data);

const statusUpdate = data => post(url.UPDATE_STATUS, data)

// reports
const myDay = data => post(`${url.MY_DAY}`, data);
const crewRevenue = data => post(`${url.CREW_REVENUE}`, data);
const customerRevenue = data => post(`${url.CUSTOMER_REVENUE}`, data);
const diagramReports = data => post(`${url.REPORTS_DIAGRAM}`, data);

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
            console.log(date)
            const filename = 'AutoPro_' + current_date
            const url = URL.createObjectURL(new Blob([result.data]))
            console.log(url)
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', `${filename}.pdf`)
            document.body.appendChild(link)
            link.click()
        })
        .catch(err => console.log(err))
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
            console.log(date)
            const filename = 'AutoPro_' + current_date
            const url = URL.createObjectURL(new Blob([result.data]))
            console.log(url)
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', `${filename}.pdf`)
            document.body.appendChild(link)
            link.click()
        })
        .catch(err => console.log(err))
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
            console.log(date)
            const filename = 'AutoPro_' + current_date
            const url = URL.createObjectURL(new Blob([result.data]))
            console.log(url)
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', `${filename}.csv`)
            document.body.appendChild(link)
            link.click()
        })
        .catch(err => console.log(err))
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
        .catch(err => console.log(err))
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
        .catch(err => console.log(err))
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

// get Products
export const getProducts = () => get(url.GET_PRODUCTS);

// get Product detail
export const getProductDetail = id =>
  get(`${url.GET_PRODUCTS_DETAIL}/${id}`, { params: { id } });

// get Events
export const getEvents = () => get(url.GET_EVENTS);

// add Events
export const addNewEvent = event => post(url.ADD_NEW_EVENT, event);

// update Event
export const updateEvent = event => put(url.UPDATE_EVENT, event);

// delete Event
export const deleteEvent = event =>
  del(url.DELETE_EVENT, { headers: { event } });

// get Categories
export const getCategories = () => get(url.GET_CATEGORIES);

// get chats
export const getChats = () => get(url.GET_CHATS);

// get groups
export const getGroups = () => get(url.GET_GROUPS);

// get Contacts
export const getContacts = () => get(url.GET_CONTACTS);

// get messages
export const getMessages = (roomId = "") =>
  get(`${url.GET_MESSAGES}/${roomId}`, { params: { roomId } });

// post messages
export const addMessage = message => post(url.ADD_MESSAGE, message);

// get orders
export const getOrders = () => get(url.GET_ORDERS);

// add order
export const addNewOrder = order => post(url.ADD_NEW_ORDER, order);

// update order
export const updateOrder = order => put(url.UPDATE_ORDER, order);

// delete order
export const deleteOrder = order =>
  del(url.DELETE_ORDER, { headers: { order } });

// get cart data
export const getCartData = () => get(url.GET_CART_DATA);

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

// get shops
export const getShops = () => get(url.GET_SHOPS);

// get wallet
export const getWallet = () => get(url.GET_WALLET);

// get crypto order
export const getCryptoOrder = () => get(url.GET_CRYPTO_ORDERS);

// get invoices
export const getInvoices = () => get(url.GET_INVOICES);
const getInvoicesCustomer = id =>
    post(`${url.GET_INVOICES_CUSTOMER}`, {"id": id});

// get invoice details
export const getInvoiceDetail = id =>
  post(`${url.GET_INVOICE_DETAIL}`, {"id": id});

// get jobs
export const getJobList = () => get(url.GET_JOB_LIST);

// get Apply Jobs
export const getApplyJob = () => get(url.GET_APPLY_JOB);

// get project
export const getProjects = () => get(url.GET_PROJECTS);

// get project details
export const getProjectsDetails = id =>
  get(`${url.GET_PROJECT_DETAIL}/${id}`, { params: { id } });

// tasks
export const getTasks = id =>
    post(url.GET_TASKS, {"id_invoice": id});
export const addTasks = tasks => post(url.ADD_TASKS, tasks);
export const updateTasks = tasks => post(url.UPDATE_TASKS, tasks);

// get contacts
export const getUsers = () => get(url.GET_USERS);

// add user
export const addNewUser = user => post(url.ADD_NEW_USER, user);

// update user
export const updateUser = user => put(url.UPDATE_USER, user);

// delete user
export const deleteUser = user => del(url.DELETE_USER, { headers: { user } });

// add jobs
export const addNewJobList = job => post(url.ADD_NEW_JOB_LIST, job);

// update jobs
export const updateJobList = job => put(url.UPDATE_JOB_LIST, job);

// delete jobs
export const deleteJobList = job => del(url.DELETE_JOB_LIST, { headers: { job } });

// Delete Apply Jobs
export const deleteApplyJob = data => del(url.DELETE_APPLY_JOB, { headers: { data } });

/** PROJECT */
// add user
export const addNewProject = project => post(url.ADD_NEW_PROJECT, project);

// update user
export const updateProject = project => put(url.UPDATE_PROJECT, project);

// delete user
export const deleteProject = project =>
  del(url.DELETE_PROJECT, { headers: { project } });

export const getUserProfile = () => get(url.GET_USER_PROFILE);

// get inboxmail
export const getInboxMails = () => get(url.GET_INBOX_MAILS);

// add inboxmail
export const addNewInboxMail = inboxmail =>
  post(url.ADD_NEW_INBOX_MAIL, inboxmail);

// delete inboxmail
export const deleteInboxMail = inboxmail =>
  del(url.DELETE_INBOX_MAIL, { headers: { inboxmail } });

// get starredmail
export const getStarredMails = () => get(url.GET_STARRED_MAILS);

// get importantmail
export const getImportantMails = () => get(url.GET_IMPORTANT_MAILS);

// get sent mail
export const getSentMails = () => get(url.GET_SENT_MAILS);

// get trash mail
export const getTrashMails = () => get(url.GET_TRASH_MAILS);

// get starredmail
export const getDraftMails = () => get(url.GET_DRAFT_MAILS);

// get dashboard charts data
export const getWeeklyData = () => get(url.GET_WEEKLY_DATA);
export const getYearlyData = () => get(url.GET_YEARLY_DATA);
export const getMonthlyData = () => get(url.GET_MONTHLY_DATA);

export const topSellingData = month =>
  get(`${url.TOP_SELLING_DATA}/${month}`, { params: { month } });

export const getEarningChartsData = month =>
  get(`${url.GET_EARNING_DATA}/${month}`, { params: { month } });

const getProductComents = () => get(url.GET_PRODUCT_COMMENTS);

const onLikeComment = (commentId, productId) => {
  return post(`${url.ON_LIKNE_COMMENT}/${productId}/${commentId}`, {
    params: { commentId, productId },
  });
};
const onLikeReply = (commentId, productId, replyId) => {
  return post(`${url.ON_LIKNE_COMMENT}/${productId}/${commentId}/${replyId}`, {
    params: { commentId, productId, replyId },
  });
};

const onAddReply = (commentId, productId, replyText) => {
  return post(`${url.ON_ADD_REPLY}/${productId}/${commentId}`, {
    params: { commentId, productId, replyText },
  });
};

const onAddComment = (productId, commentText) => {
  return post(`${url.ON_ADD_COMMENT}/${productId}`, {
    params: { productId, commentText },
  });
};

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
        .catch(err => console.log(err))
}

// Get Profile
const getProfile = () => get(url.GET_PROFILE)

// Update Profile
const updateProfile = profile => put(url.UPDATE_PROFILE, profile);

export {
    getLoggedInUser,
    isUserAuthenticated,
    postFakeLogin,
    postFakeProfile,
    postFakeForgetPwd,
    postJwtRegister,
    postJwtRegisterStep2,
    postJwtLogin,
    postJwtForgetPwd,
    postJwtProfile,
    getProductComents,
    onLikeComment,
    onLikeReply,
    onAddReply,
    onAddComment,
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
    diagramReports
};
