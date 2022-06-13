const SET_RECORD = 'SET_RECORD'

let initialState = {
  records: [],
}

const recordReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RECORD:
      return {...state, records: action.rec}
    default:
      return state
  }
}

export const setRecordAC = (rec) => ({type: SET_RECORD, rec})

export default recordReducer