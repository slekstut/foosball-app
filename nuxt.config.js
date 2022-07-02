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

  plugins: ["~/plugins/firebase.js"],

  components: true,

  buildModules: [],

  modules: [
    '@nuxtjs/style-resources'
  ],

  build: {},

  styleResources: {
  scss: ['./assets/scss/main.scss']
},
};

// export default {
//   //...
//   css: [
//   '~assets/scss/colors.scss'
// ],
//   //...
//   modules: [
//   '@nuxtjs/style-resources'
// ],
// //You will have to add this new object if it doesn't exist already
// styleResources: {
//   scss: ['./assets/scss/*.scss']
// },
//   //...
// }
