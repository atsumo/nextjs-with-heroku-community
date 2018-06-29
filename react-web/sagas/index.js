import { delay } from 'redux-saga'
import { all, fork, call, put, takeLatest } from 'redux-saga/effects'
import es6promise from 'es6-promise'
import 'isomorphic-unfetch' /* global fetch */

import { Example, IFrame, SiteTalkRoom } from 'constants/ActionTypes'
import { failure, loadDataSuccess } from 'actions/example'
import { addTalkContents } from 'actions/site'

import { Posts } from 'stub/site'

es6promise.polyfill()

// function* runClockSaga() {
//   yield take(actionTypes.START_CLOCK)
//   while (true) {
//     yield put(tickClock(false))
//     yield call(delay, 1000)
//   }
// }

function* fetchTalkInitial({ payload }) {
  // const { query, params } = payload

  // TODO: fetch category, subBanner, then put them into store

  // TODO: fetch box contents from server
  // then, dispatch action to sync store
  const talkBoxContents = Posts
  yield put(addTalkContents(talkBoxContents))
}

function* loadDataSaga() {
  try {
    const res = yield fetch('https://jsonplaceholder.typicode.com/users')
    const data = yield res.json()
    yield put(loadDataSuccess(data))
  } catch (err) {
    yield put(failure(err))
  }
}

function* postIFrameMessageSaga(action) {
  try {
    const { iWindow, type, payload } = action.payload
    iWindow.postMessage({ type, payload }, '*')
  } catch (err) {
    yield put(failure(err))
  }
}

/** ****************************************************************************/
/** ***************************** WATCHERS *************************************/
/** ****************************************************************************/

function* watchSite() {
  return yield all([
    takeLatest(SiteTalkRoom.FETCH_INITIAL_REQUEST, fetchTalkInitial)
  ])
}

function* rootSaga() {
  yield all([
    fork(watchSite),

    takeLatest(Example.LOAD_DATA, loadDataSaga),
    takeLatest(IFrame.POST_MESSAGE, postIFrameMessageSaga)
  ])
}

export default rootSaga
