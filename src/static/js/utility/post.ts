export class PostItem{
    title: string;
    author: string;
    date: string;
    content: string;
    tags: string[];
    description: string;
    comments: boolean;
    id: string;

    constructor(title, author, date, content, tags, description, comments, id) {
        this.title = title;
        this.author = author;
        this.date = date;
        this.content = content;
        this.tags = tags;
        this.description = description;
        this.comments = comments;
        this.id = id
    }

    addToDraftList(post: PostItem, postList: PostItem[]){
        var i;
        const date = new Date();
        for (i = 0; i < postList.length; i++) {
            if (post.id === postList[i].id) {
                post.date = date.toUTCString();
                postList[i] = post;
                return true;
            } else {
                postList.push(post);
                return true;
            }
        }
    }

    postConverter = {
        toFirestore: (post) => {
            return {
                title: post.title,
                author: post.author,
                date: post.date,
                content: post.content,
                tags: post.tags,
                description: post.description,
                comments: post.comments
            };
        },
        fromFirestore: (snapshot, options) => {
            const data = snapshot.data(options);
            return new PostItem(data.title, data.author, data.date, data.content, data.tags, data.description, data.comments, data.id);
        }
    };
    
    //async function addDraftPost(update, merge = true){
//  const ref = doc(db, "users-board", boardUser.uid).withConverter(boardUserConverter);
//  const docSnap = await getDoc(ref);
//  if(docSnap.exists()){
//    const user = boardUserConverter.fromFirestore(docSnap.data());
//    addToDraftList(update, user.drafts);
//    if(merge = true){
//      await setDoc(ref, user, {merge: true});
//    }else{
//      await setDoc(ref, user);
//    }
//  }
//};
}