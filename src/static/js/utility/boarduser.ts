import {Firestore, addDoc, collection, doc, getDoc} from "firebase/firestore";
import {PostItem} from "./post";

export class BoardUser{
    email: string = "";
    name: string = "";
    profilePhoto: string = "";
    bio: string = "";
    role: string = "";
    uid: string = "";
    drafts: PostItem[] = [];
    constructor(email: string="", name: string="", profilePhoto: string="", bio: string="", role: string="", uid: string="", drafts: PostItem[]=[]){
        this.email = email;
        this.name = name;
        this.profilePhoto = profilePhoto;
        this.bio = bio;
        this.role = role;
        this.uid = uid;
        this.drafts = drafts;
    }

    private boardUserConverter = {
        toFirestore: (boardUser) => {
            return {
                email: boardUser.email,
                name: boardUser.name,
                profilePhoto: boardUser.profilePhoto,
                bio: boardUser.bio,
                role: boardUser.role,
                uid: boardUser.uid
            };
        },
        fromFirestore: (snapshot, options) => {
            const data = snapshot.data(options);
            return new BoardUser(data.email, data.name, data.profile_photo, data.bio, data.role, data.uid, data.drafts);
        }
    };

    //will need when adding new user through account creation page
    async addBoardUser(email: string, name: string, profile_photo: string, bio: string, role: string, uid: string, db: Firestore){
        try {
            const docRef = await addDoc(collection(db, "users-board", this.uid), {
                email: this.email,
                name: this.name,
                profile_photo: this.profilePhoto,
                bio: this.bio,
                role: this.role
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    async get(db: Firestore, uid: string): Promise<BoardUser | null>{
        const ref = doc(db, "users-board", uid).withConverter(this.boardUserConverter);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
            const user = JSON.parse(JSON.stringify(docSnap.data()));
            return new BoardUser(user.email, user.name, user.profile_photo, user.bio, user.role, user.uid, user.drafts);
        } else {
            console.log("No such user exists in firestore!");
            return null;
        }
    }
}