const TOKEN = 'token'
const REFRESH_TOKEN = 'refreshToken'

const _getToken = (key = TOKEN) => {
    return sessionStorage.getItem(key)
}

const _setToken = (key = TOKEN, value) => {
    sessionStorage.setItem(key, value)
}

const _removeToken = (key = TOKEN) => {
    sessionStorage.removeItem(key)
}

export {
    _getToken,
    _setToken,
    _removeToken
}