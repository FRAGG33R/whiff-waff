import * as os from 'os'

export const PROTOCOL = 'http://'
export const SEPARATOR = ':'
export const VALIDATION_EMAIL_ENDPOINT = '/api/v1/auth/verified/'
export const REDIRECTION_ENDPOINT_VALID_EMAIL = '/login?validation='
// export const API42_CALLBACKURL = `${PROTOCOL}${os.hostname}${SEPARATOR}${process.env.PORT}/api/v1/auth/signin/42`
export const API42_CALLBACKURL = `http://e3r10p12.1337.ma:3000/intra_callback`
export const GOOGLE_CLOUD_BASE_URL = 'https://storage.googleapis.com/'
export const DEFAULT_USER_AVATAR = "https://images.unsplash.com/photo-1672478503001-d6c68cda3d8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=5360&q=80"