import firebase from "firebase/app"
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyBXiYlPJNIU0Gge9uy6ursp7uQKPS90vQo",
    authDomain: "gifted-chat-a5d6d.firebaseapp.com",
    projectId: "gifted-chat-a5d6d",
    storageBucket: "gifted-chat-a5d6d.appspot.com",
    messagingSenderId: "1076931133196",
    appId: "1:1076931133196:web:6198f6a1875e3236f71329",
    measurementId: "G-L63YE5HFT6"
};

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };