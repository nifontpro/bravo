/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  optimizeFonts: false,
  swcMinify: false, // Нужно по итогу поставить true (сейчас false из-за конфликта с chartJS)
  reactStrictMode: false,
  env: {
    APP_URL: process.env.REACT_APP_URL,
    APP_ENV: process.env.REACT_APP_ENV,
    APP_SERVER_URL: process.env.REACT_APP_SERVER_URL
  },
  images : {
    domains: ['medalist.storage.yandexcloud.net', 'medalistgallery.storage.yandexcloud.net']
  },
  webpack(config, options) {
    config.module.rules.push({
      loader: '@svgr/webpack',
      issuer: /\.[jt]sx?$/,
      options: {
        prettier: false,
        svgo: true,
        svgoConfig: {
          plugins: [{
            name: 'preset-default',
            params: {
              override: {
                removeViewBox: false
              }
            }
          }],
        },
        titleProp: true,
      },
      test: /\.svg$/,
    });

    return config;
  },

  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/auth',
  //       permanent: true,
  //     },
  //     {
  //       source: '/company',
  //       destination: '/auth',
  //       permanent: true,
  //     },
  //   ]
  // },
}

module.exports = nextConfig