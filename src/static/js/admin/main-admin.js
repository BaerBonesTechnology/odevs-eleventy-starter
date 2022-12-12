import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {AuthenticationManager} from "../utility/authenticationmanager";


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

var isSignedIn = false;
var boardUser;

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
      authManager.signInUser(email, password)
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
        dailyGreeting.innerHTML = "Good Morning" + " " + boardUser.name;
    }else if(hour < 18){
        dailyGreeting.innerHTML = "Good Afternoon" + " " + boardUser.name;;
    }else{
        dailyGreeting.innerHTML = "Good Evening" + " " + boardUser.name;;
    }
};
};