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
  './assets/scss/main.scss'
],

  plugins: [
    {src: "~/plugins/firebase.js"},
    { src: '~/plugins/vee-validate.js', ssr: true }, 
],

  components: true,

  buildModules:[],

  modules: [
    '@nuxtjs/style-resources'
  ],

  build: {
    transpile: ["vee-validate/dist/rules"]
  },

  styleResources: {
  scss: ['./assets/scss/main.scss']
},
};
