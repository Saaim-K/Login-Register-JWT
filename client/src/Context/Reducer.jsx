// Function used in Reducer Function
// State so you can have constat access to the current status
// Action tells that what we have to do with the state
// state.isLogin can be used to get the current value

export const reducerFunc = (state, action) => {
    switch (action.type) {
        case "LOGIN": {
            return { isLogin: true }
        }
        case "LOGOUT": {
            return { isLogin: false }
        }
        default: {
            return state
        }
    }
}