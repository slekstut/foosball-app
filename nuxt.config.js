export default {
  target: "static",
  head: {
    title: "firebase-beta-9-nuxt",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

    css: [
  // '~assets/scss/main.scss'
  './assets/scss/main.scss',
  '~/plugins/toastr.min.css',
  '~/node_modules/vue-select/dist/vue-select.css',

],

  plugins: [
    {src: "~/plugins/firebase.js"},
    { src: '~/plugins/vee-validate.js', ssr: true }, 
    { src: '~/plugins/toastr.min.js' }, 
    { src: '~/node_modules/vue-select/dist/vue-select.js' },
],

  components: true,

  buildModules:[],

  modules: [
    '@nuxtjs/style-resources',
   // https://go.nuxtjs.dev/axios
   '@nuxtjs/axios',
   [
     '@nuxtjs/firebase',
     {
       config: {
         apiKey: 'AIzaSyAO12kI9YFHbb-a6ExrDvLQg_PD554wkNM',
         authDomain: 'foosball-tracker-67dd0.firebaseapp.com',
         projectId: 'foosball-tracker-67dd0',
         storageBucket: 'foosball-tracker-67dd0.appspot.com',
         messagingSenderId: '207563155987',
         appId: '1:207563155987:web:a8d0a79215aafe24d2ede6',
         measurementId: 'G-9YQTP7SZ9Y'
       },
       services: {
         auth: true // Just as example. Can be any other service.
       }
     }
   ]
  ],

  build: {
    transpile: ["vee-validate/dist/rules"],
    loaders: {
      scss: {
        sourceMap: false,
      },
    }
  },

  styleResources: {
  scss: ['./assets/scss/main.scss']
},
loading: '~/components/LoadingBar.vue',
loadingIndicator: {
  name: 'cube-grid',
  color: 'red',
  background: 'back'
},

auth: {
  persistence: 'local', // default
  initialize: {
    onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
    onAuthStateChangedAction: 'onAuthStateChangedAction',
    subscribeManually: false
  },
  ssr: false, // default
  emulatorPort: 3000,
  emulatorHost: 'http://localhost',
}
};
