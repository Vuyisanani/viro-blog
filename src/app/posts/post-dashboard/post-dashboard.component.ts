import { Component, OnInit } from '@angular/core';

import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
// import { Observable } from 'rxjs/Observable';

import { PostService } from './../post.service';
import { AuthService } from './../../core/auth.service';

import { map }  from 'rxjs/operators';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss']
})
export class PostDashboardComponent implements OnInit {
  title: string;
  image: string = null;
  content: string;

  buttonText: string = 'Create Post';

  uploadpercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(private auth: AuthService, private PostService: PostService, private storage: AngularFireStorage) { }

  ngOnInit() { }

  userCreatePost() {
    const data = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUserId,
      title: this.title,
      content: this.content,
      image: this.image,
      published: new Date
    }
    // Send to the post service
    this.PostService.createPost(data);
    // Empty the fields
    this.title = '';
    this.content = '';
    this.buttonText = 'Post Created!';
    setTimeout( () => this.buttonText = 'Create Post', 2000); 
  }

  uploadImage(event) {
    const file = event.target.file[0];
    const path = `posts/${file.name}`;
    if( file.type.split('/') !== 'image') {
      return alert('Image file type not allowed!!');
    }else {
      const task = this.storage.upload(path, file);
      // To Do:
      this.downloadURL = task.snapshotChanges().pipe(map(task => task.downloadURL));
      this.uploadpercent = task.percentageChanges();
      this.downloadURL.subscribe(url => this.image = url)
    }
  }

}
