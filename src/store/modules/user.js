import {createSlice} from "@reduxjs/toolkit";
import {_getToken, _setToken} from "@/utils/token";
import request from "@/utils/request";

const TOKEN = 'token'
const REFRESH_TOKEN = 'refreshToken'
const USER_INFO = 'userInfo'
const initialState = () => ({
    token: _getToken() ?? '',
    refreshToken: _getToken(REFRESH_TOKEN) ?? '',
    userInfo: JSON.parse(_getToken(USER_INFO)) ?? {}
})
const userStore = createSlice({
    name: 'user',
    initialState: initialState(),
    reducers: {
        setToken: (state, action) => {
            const {token, refresh_token} = action.payload
            _setToken(TOKEN, token)
            state.token = token
            _setToken(REFRESH_TOKEN, refresh_token)
            state.refreshToken = refresh_token
        },
        setUserInfo: (state, action) => {
            _setToken(USER_INFO, JSON.stringify(action.payload))
            state.userInfo = action.payload
        },
        resetState: (state, action) => {
            sessionStorage.clear()
            state = initialState()
        }
    }
})


export const {setToken, setUserInfo, resetState} = userStore.actions

export const getToken = (saveData) => {
    return async (dispatch) => {
        const result = await request.post('/authorizations', saveData)
        console.log('result', result)
        return dispatch(setToken(result.data))
    }
}

export const getUserInfo = () => {
    return async (dispatch) => {
        try {
            const result = await request.get('/user/profile')
            return dispatch(setUserInfo(result.data))
        } catch (e) {
            console.log(e);
        }
    }
}

const userStoreReducer = userStore.reducer
export default userStoreReducer