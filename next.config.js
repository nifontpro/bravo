/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  optimizeFonts: false,
  swcMinify: true,
  reactStrictMode: false,
  env: {
    APP_URL: process.env.REACT_APP_URL,
    APP_ENV: process.env.REACT_APP_ENV,
    APP_SERVER_URL: process.env.REACT_APP_SERVER_URL
  },
  images : {
    domains: ['https://medalist.storage.yandexcloud.net/']
  }
}

module.exports = nextConfig