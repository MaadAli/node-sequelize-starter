const STATUS_CODES = {
    SUCCESS: 200,
    FAILURE: 400,
    UNIQUE: 409,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
}

export const RESPONSES = {
    GET_DATA_SUCCESS: (res, message, details = null) => {return makeResponse(res, {status: STATUS_CODES.SUCCESS, body: {status: 'SUCCESS', message, details }})},
    UPDATE_DATA_SUCCESS: (res, message, details = null) => {return makeResponse(res, {status: STATUS_CODES.SUCCESS, body: {status: 'SUCCESS', message, details }})},
    SAVE_DATA_SUCCESS: (res, message, details = null) => {return makeResponse(res, {status: STATUS_CODES.SUCCESS, body: {status: 'SUCCESS',message, details }})},
}

export const ERRORS = {
    GET_DATA_FAILURE: (message, details = null) => {return {status: STATUS_CODES.FAILURE, body: {status: 'ERROR',message, details }}},
    UPDATE_DATA_FAILURE: (message, details = null) => {return {status: STATUS_CODES.FAILURE, body: {status: 'ERROR',message, details }}},
    SAVE_DATA_FAILURE: (message, details = null) => {return {status: STATUS_CODES.FAILURE, body: {status: 'ERROR',message, details }}},
    UNIQUE_DATA: (message, details = null) => {return {status: STATUS_CODES.UNIQUE, body: {status: 'ERROR',message, details }}},
    NOT_FOUND: (message, details = null) => {return {status: STATUS_CODES.NOT_FOUND, body: {status: 'ERROR',message, details }}},
    UNAUTHORIZED: (message, details = null) => {return {status: STATUS_CODES.UNAUTHORIZED, body: {status: 'ERROR',message, details }}},
    FORBIDDEN: (message, details = null) => {return {status: STATUS_CODES.FORBIDDEN, body: {status: 'ERROR',message, details }}}

}

const makeResponse = (res, RESP) => {
    return res.status(RESP.status).json(RESP.body);
}