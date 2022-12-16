import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
;
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js'
;
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js'
;
import {getFirestore} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js'
;
import {AuthenticationManager} from "/static/js/utility/authenticationmanager.ts";


const firebaseConfig = {
  apiKey: "AIzaSyBEZSW_I08PYeARkcwZ7cpUvzxd_--NHlw",
  authDomain: "orlando-devs-db434.firebaseapp.com",
  projectId: "orlando-devs-db434",
  storageBucket: "orlando-devs-db434.appspot.com",
  messagingSenderId: "998954219062",
  appId: "1:998954219062:web:decb592f8d4244a550ca97",
  measurementId: "G-WXP7XPFY3N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//initialize firebase analytics
const analytics = getAnalytics(app);

//initialize firebase auth
var auth = getAuth(app);

//initialize firestore
const db = getFirestore(app);

const authManager = new AuthenticationManager(auth, db);

const loginButton = document.getElementById("login-button")

if(loginButton){
  loginButton.addEventListener("click", () => {
    const email = document.getElementById("email")
    const password = document.getElementById("password")
    const errorText = document.getElementById("error-text")


    if (email === null || password === null) {
      console.log("Please enter an email and password")
      return
    } else if (email.value === "" || password.value === "") {
      console.log("Please enter an email and password")
      return

    };

    try {
      authManager.signInUser(email.value, password.value)
    } catch (error) {
      console.log(error.message)
      window.location.href = "/login"
      errorText.innerHTML = error.message;
    };
  });
}

const signOut = document.getElementById("sign-out");
if(signOut !== null){
  if(authManager.user !== null){
if(authManager.user){
    signOut.innerHTML = "Sign Out";
    signOut.addEventListener("click", authManager.signOutUser);
}else{
    signOut.innerHTML = "Sign In";
    signOut.addEventListener("click", () => {
        window.location.href = "/login";
    });
}
  };
};

if(authManager.user !== null){
console.log("User is signed in: " + authManager.user.uid);
const dailyGreeting = document.getElementById("daily-greeting");
if(dailyGreeting !== null){
    const date = new Date();
    const hour = date.getHours();
    if(hour < 12){
        dailyGreeting.innerHTML = "Good Morning" + " " + authManager.boardUser.name;
    }else if(hour < 18){
        dailyGreeting.innerHTML = "Good Afternoon" + " " + authManager.boardUser.name;;
    }else{
        dailyGreeting.innerHTML = "Good Evening" + " " + authManager.boardUser.name;;
    }
};
};