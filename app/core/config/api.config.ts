export const BASE_URL = `${process.env.APP_SERVER_URL}`
export const API_SERVER_URL = `${process.env.APP_SERVER_URL}/api`
export const REFRESH_TOKEN_LIFE = 30 // Время жизни локальной куки в днях для RT.

export const getAuthUrl = (string: string) => `/auth${string}`
export const getCompanyUrl = (string: string = '') => `/company${string}`
export const getDepartmentUrl = (string: string = '') => `/department${string}`