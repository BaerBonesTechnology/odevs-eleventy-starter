import { Auth, User, signInWithEmailAndPassword, updateEmail, sendPasswordResetEmail, createUserWithEmailAndPassword } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import {BoardUser} from "./boarduser";


export class AuthenticationManager{
    auth: Auth;
    user: User | null ;
    boardUser: void | BoardUser | null;
    isSignedIn: boolean = false;
    db: Firestore;
    constructor(auth: Auth, db: Firestore){
        this.auth = auth;
        this.db = db;
    }

    onAuthStateChanged = (u: User | null) => {
        if(u){
            console.log(u.uid)
            this.isSignedIn = true;
            this.user = u;
            console.log("User is definitely signed in")
        } else{
            console.log("User is not signed in")
        }
    };

    async signInUser(email, password) {
        await signInWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
            this.user = userCredential.user;
            this.isSignedIn = true;
            new BoardUser().get(this.db, this.user.uid).catch((error) => {
                console.log(error)
                }).then((boardUser) => {
                    this.boardUser = boardUser;
                });
            console.log("User is signed in")
        }).catch((error) => {});
    }

    async signOutUser() {
        await this.auth.signOut();
    }

    getUserProfile() {
        return this.user;
    }

    async updateUserEmail(email) {
        if(this.user !== null){
        await updateEmail(this.user, email).then(() => {
        }).catch((error) => {});
    }
    else{
        throw new Error("User is not signed in")
    }
    }

    async sendResetEmail(email) {
        await sendPasswordResetEmail(this.auth, email).then(() => {
            //email sent
        }).catch((error) => {
            // Throw error message
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    async createUser(email, password){
        await createUserWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
            // Signed inconst user = userCredential.user;
            // handle error message
        })
        .catch((error) => {
            const errorMessage = error.message;
            // handle error message throw new Error(errorMessage);
            window.location.href = "/login";
            throw new Error(errorMessage);
        });
    }
}