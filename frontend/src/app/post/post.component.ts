import { animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit{
  http = inject(HttpClient)
  posts: any =[];

  ngOnInit(): void {
      this.fetchPosts();
  }
  fetchPosts() {
    this.http.get('anuwrap/backend/public/api')
    .subscribe((any) => {
      console.log(this.posts)
    })
  }
}
