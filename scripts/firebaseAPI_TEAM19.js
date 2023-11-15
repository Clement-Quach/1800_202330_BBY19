//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------

var firebaseConfig = {
  apiKey: "AIzaSyBBRxD13drIdaGLi0Qd0HKfB4WR9K4Gm2E",
  authDomain: "comp1800-bby19.firebaseapp.com",
  projectId: "comp1800-bby19",
  storageBucket: "comp1800-bby19.appspot.com",
  messagingSenderId: "836877814838",
  appId: "1:836877814838:web:e4a64c0bbce2fed23ddc97"
};
//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();