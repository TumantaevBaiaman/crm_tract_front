import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_TASKS,
  ADD_NEW_TASKS
} from "./actionTypes"
import {
  getTasksSuccess,
  getTasksFail,
  addTasksSuccess,
  addTasksFail
} from "./actions"

//Include Both Helper File with needed methods
import { getTasks, addTasks } from "helpers/backend_helper"

function* fetchTasks() {
  try {
    const response = yield call(getTasks)
    yield put(getTasksSuccess(response))
  } catch (error) {
    yield put(getTasksFail(error))
  }
}

function* addNewTasks({ payload: { tasks, history }}) {
  try {
    const response = yield call(addTasks, tasks);
    yield put(addTasksSuccess(response));
    history.push('/invoices-detail/'+response.invoice.id)
  } catch (error) {
    yield put(addTasksFail(error))
  }
}


function* tasksSaga() {
  yield takeEvery(GET_TASKS, fetchTasks)
  yield takeEvery(ADD_NEW_TASKS, addNewTasks)
}

export default tasksSaga
