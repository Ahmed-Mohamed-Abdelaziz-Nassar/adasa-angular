import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { Post } from '../models/post';

@Injectable({ providedIn: 'root' })
export class PostsService {

  getPosts(): Observable<Post[]> {
    return from(fetch('assets/posts.json').then(res => res.json())).pipe(
      map((data: { posts: Post[] }) => data.posts)
    );
  }

  getPostBySlug(slug: string): Observable<Post | undefined> {
    return this.getPosts().pipe(
      map(posts => posts.find(p => p.slug === slug))
    );
  }
}