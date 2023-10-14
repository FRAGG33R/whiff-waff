import * as os from 'os'

export const PROTOCOL = 'http://'
export const SEPARATOR = ':'
export const VALIDATION_EMAIL_ENDPOINT = '/api/v1/auth/verified/'
export const REDIRECTION_ENDPOINT_VALID_EMAIL = '/login?validation='
// export const API42_CALLBACKURL = `${PROTOCOL}${os.hostname}${SEPARATOR}${process.env.PORT}/api/v1/auth/signin/42`
export const API42_CALLBACKURL = `http://e3r10p12.1337.ma:3000/intra_callback`
export const GOOGLE_CLOUD_BASE_URL = 'https://storage.googleapis.com/'
export const DEFAULT_USER_AVATAR = "https://storage.googleapis.com/whiff-waff/default.png"