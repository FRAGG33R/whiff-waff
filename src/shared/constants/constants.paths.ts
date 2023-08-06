export const PROTOCOL = 'http://'
export const SEPARATOR = ':'
export const VALIDATION_EMAIL_ENDPOINT = '/api/v1/auth/verified/'
export const REDIRECTION_ENDPOINT_VALID_EMAIL = '/login?validation='
export const REDIRECTION_ENDPOINT = `${PROTOCOL}${process.env.HOST_CLIENT}${SEPARATOR}${process.env.CLIENT_PORT}/profile/example`