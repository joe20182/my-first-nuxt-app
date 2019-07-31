
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Merriweather&display=swap' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#ff4c4c',
    height: '4px',
    duration: 5000
  },
  /*
  ** loadingIndicator是在spa模式用的，universal無效
  */
  loadingIndicator: {
    name: 'circle',
    color: '#ff4c4c'
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/styles/main.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/coreComponents.js',
    '~plugins/dateFilter.js',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios'
  ],
  /*
  ** 因為我們安裝了@nuxtjs/axios的module，所以可以使用額外的設定
  */
  axios: {
    baseURL: process.env.BASE_URL || 'https://my-nuxt-blog-f4685.firebaseio.com',
    credentials: false
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
  env: {
    baseUrl: process.env.BASE_URL || 'https://my-nuxt-blog-f4685.firebaseio.com',
    fbApiKey: 'AIzaSyBOMOiEksZZVk_ipperC7xnXGQZGc0NN18'
  },
  // rootDir: '/',
  // router: {
  //   linkActiveClass: 'active'
  // },
  // transition: {
  //   name: 'fade',
  //   mode: 'out-in'
  // }
}
