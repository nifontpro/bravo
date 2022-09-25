export const BASE_URL = `${process.env.APP_SERVER_URL}`
export const API_SERVER_URL = `${process.env.APP_SERVER_URL}/api`
// const socketUrl = `ws://85.237.34.95:8080/chat`
export const SOCKET_URL = `ws://localhost:8080/chat`
export const REFRESH_TOKEN_LIFE = 30 // Время жизни локальной куки в днях для RT.

export const getAuthUrl = (string: string) => `/auth${string}`
export const getCompanyUrl = (string: string = '') => `/company${string}`
export const getDepartmentUrl = (string: string = '') => `/department${string}`
export const getUserUrl = (string: string = '') => `/user${string}`
export const getMedalUrl = (string: string = '') => `/medal${string}`
export const getRewardUrl = (string: string = '') => `/reward${string}`