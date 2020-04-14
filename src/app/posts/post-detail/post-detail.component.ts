import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { PostService } from './../post.service';
import { AuthService } from './../../core/auth.service';

import { Post } from '../post';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  post: Post;
  edditing: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService,
    private postService: PostService
  ) { }

  ngOnInit() { 
    this.getPost();
    console.log(this);
   }

  getPost() {
    const id = this.route.snapshot.paramMap.get('id');
    return this.postService.getPostData(id).subscribe(data => this.post = data)
  }

  updatePost() {
     const formData = {
      title: this.post.title,
      content: this.post.content
    };
    const id = this.route.snapshot.paramMap.get('id');
    this.postService.updatePost(id, formData);
    this.edditing = false;
  }

  deletePost() {
    const id =  this.route.snapshot.paramMap.get('id');
    this.postService.deletePost(id);
    this.router.navigate(["/blog"]);
  }
}
