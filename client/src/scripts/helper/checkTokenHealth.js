import {decodeJwt} from "./decodeJwt.js";

export const checkTokenHealth = (token) => {
    const { payload } = decodeJwt(token)
    const expirationDate = payload.exp * 1000
    const currentTime = new Date().getTime()

    const diff = expirationDate - currentTime
    return diff > 0 ? true : false
}