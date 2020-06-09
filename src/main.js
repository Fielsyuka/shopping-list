import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';

Vue.config.productionTip = false

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOLKRZf3sTd_W9X4yvDYakHnwstKNAW8o",
  authDomain: "shoppping-list-5d11a.firebaseapp.com",
  databaseURL: "https://shoppping-list-5d11a.firebaseio.com",
  projectId: "shoppping-list-5d11a",
  storageBucket: "shoppping-list-5d11a.appspot.com",
  messagingSenderId: "477221354118",
  appId: "1:477221354118:web:9795f354a8f4ff312c2f07",
  measurementId: "G-K5P2RET70Z"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
