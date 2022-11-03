// export const API_SERVER_URL = `${process.env.APP_SERVER_URL}:8080/api`
// export const SOCKET_URL = `ws://${process.env.APP_SERVER_URL}:8080/chat`
export const API_SERVER_URL = `http://nmedalist.ru:8080/api`
// export const SOCKET_URL = `ws://http://nmedalist.ru:8080/api/chat`
export const REFRESH_TOKEN_LIFE = 30 // Время жизни локальной куки в днях для RT.

export const getAuthUrl = (string: string) => `/auth${string}`
export const getCompanyUrl = (string: string = '') => `/company${string}`
export const getDepartmentUrl = (string: string = '') => `/department${string}`
export const getUserUrl = (string: string = '') => `/user${string}`
export const getMedalUrl = (string: string = '') => `/medal${string}`
export const getRewardUrl = (string: string = '') => `/reward${string}`