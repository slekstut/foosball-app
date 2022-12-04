import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // apiKey: "AIzaSyDa-YwgWTp2GDyVYEfv-XLb62100_HoEvU",
  // authDomain: "nuxt-fire-demo.firebaseapp.com",
  // projectId: "nuxt-fire-demo",
  // storageBucket: "nuxt-fire-demo.appspot.com",
  // messagingSenderId: "807370470428",
  // appId: "1:807370470428:web:26da98c86c3fd352",
  // measurementId: "G-XT6PVC1D4X",
  apiKey: "AIzaSyAO12kI9YFHbb-a6ExrDvLQg_PD554wkNM",
  authDomain: "foosball-tracker-67dd0.firebaseapp.com",
  projectId: "foosball-tracker-67dd0",
  storageBucket: "foosball-tracker-67dd0.appspot.com",
  messagingSenderId: "207563155987",
  appId: "1:207563155987:web:a8d0a79215aafe24d2ede6",
  measurementId: "G-9YQTP7SZ9Y"
};


let firebaseApp;

const apps = getApps();
if (!apps.length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = apps[0];
}

const db = getFirestore(firebaseApp, {});
const auth = getAuth(firebaseApp);

export { db, auth };
