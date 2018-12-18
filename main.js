import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store/index'
// import DateFilter from './filters/date'
import Alertcmp from './components/shared/alert.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.component('app-alert', Alertcmp)

// Vue.filter('date', DateFilter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyA6NAs4dsZjdJtwePFdDFgPpBAmoahUcJw',
      authDomain: 'devmeetup-faf79.firebaseapp.com',
      databaseURL: 'https://devmeetup-faf79.firebaseio.com',
      projectId: 'devmeetup-faf79',
      storageBucket: 'devmeetup-faf79.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadMeetups')
  }
})
