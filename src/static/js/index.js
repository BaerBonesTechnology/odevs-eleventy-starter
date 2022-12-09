import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import { getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateEmail,
    sendEmailVerification,
    sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";


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
const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    user = auth.currentUser;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

const user = auth.currentUser;

module.exports = function (authManager){

function createUser(email, password){
  createUserWithEmailAndPassword(this.auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // handle error message
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // handle error message throw new Error(errorMessage);
    });
};

// signs in user
function signInUser(email, password) {
  signInWithEmailAndPassword(this.auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // handle error message
    })
    .catch((error) => {
      const code = error.code;
      const message = error.message;
      // handle error message throw new Error(errorMessage);
      throw new Error(code, message);
    });
};

//checks if user is signed in
function isUserSignedIn() {
        if(this.user){
            return true;
        }
        return false;
};

//signs out user
function signOutUser() {
        this.auth.signOut();
};

function getUserProfile() {
        return this.user;
};

function updateUserEmail(email) {
        updateEmail(this.user, email).then(() => {
            // send verification email
            sendEmailVerification(this.user).then(() => {
                //update screen to show verification email sent
            }).catch((error) => {
                // Throw error message
            });
        }).catch((error) => {
            // Throw error message
        });
};

function sendResetEmail(email) {
        sendPasswordResetEmail(this.auth, email).then(() => {
            // Email sent.
        }).catch((error) => {
            // Throw error message
            const errorCode = error.code;
            const errorMessage = error.message;
        });
};

function logInButtonPressed(email, password){
  if(email === "" || password === ""){
    console.log("Please enter an email and password")
    return
  }

  try {
    signInUser(email, password)
    window.location.href = "/"
  } catch (error) {
    console.log(error.message)
  }
};

document.getElementById("login-button").onclick(function(){
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  logInButtonPressed(email, password)
});

}