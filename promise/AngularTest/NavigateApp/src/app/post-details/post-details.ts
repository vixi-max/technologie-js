import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-post-details',
  imports: [],
    standalone: true,
  templateUrl: './post-details.html',
  styleUrl: './post-details.css',
})
export class PostDetails {
 postId!: number;

  constructor(private route: ActivatedRoute) {
    this.postId = Number(this.route.snapshot.paramMap.get('id'));
  }
}
