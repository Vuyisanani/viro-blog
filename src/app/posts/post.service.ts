import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

import { Post } from './post';
import { Observable,fromEvent } from 'rxjs'
import { map } from 'rxjs/operators';


@Injectable()
export class PostService {
  postsCollection: AngularFirestoreCollection<Post>;
  //Post Doc not Callable ( To: Do)
  postDoc: AngularFirestoreDocument<Post>;
  // afs: Angular Fire store
  constructor(private afs: AngularFirestore) {
    // Linking the collection to the 'posts' collection created in Firebase db
    this.postsCollection = this.afs.collection('posts', ref =>
    ref.orderBy('published', 'desc'));
   }

   public getPosts(): Observable<Post[]> {
     //To Do: use diff map method
     const collectChanges = this.postsCollection.snapshotChanges();
     return collectChanges.pipe(map( actions => {
      return actions.map(res => {
             const data = res.payload.doc.data() as Post;
             const id = res.payload.doc.id;
             return { id, ...data };
           })
     }))
     
    //  .map(actions => {
    //    return actions.map(res => {
    //      const data = res.payload.doc.data() as Post;
    //      const id = res.payload.doc.id;
    //      return { id, ...data };
    //    })
    //  })
     }
   getPostData(id: string) {
    this.postDoc = this.afs.doc<Post>(`post:/${id}`);
    return this.postDoc.valueChanges();
   }

   // CRUD functions
   getPost(id: string) {
     return this.afs.doc<Post>(`posts/${id}`)
   }
   createPost(data: Post) {
     this.postsCollection.add(data);
   }

   deletePost(id: string) {
     return this.getPost(id).delete();
   }

   updatePost(id: string, dataUpdate) {
     return this.getPost(id).update(dataUpdate);
   }
}
