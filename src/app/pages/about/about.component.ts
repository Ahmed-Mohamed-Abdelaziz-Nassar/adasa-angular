import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  posts: Post[] = [];
  authors: { name: string; avatar: string; role: string }[] = [];
  stats: { icon: string; value: string; label: string }[] = [];

  constructor(
    private postsService: PostsService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.postsService.getPosts().subscribe((posts: Post[]) => {
      this.posts = posts;

      const authorMap = new Map<string, { name: string; avatar: string; role: string }>();
      posts.forEach(post => {
        const author = post.author;
        if (!authorMap.has(author.name)) {
          authorMap.set(author.name, {
            name: author.name,
            avatar: author.avatar,
            role: author.role,
          });
        }
      });
      this.authors = Array.from(authorMap.values());

      const postsCount = posts.length;
      const authorsCount = this.authors.length;
      const categoriesCount = new Set(posts.map(p => p.category)).size;

      this.stats = [
        { icon: 'fa-users', value: '+2مليون', label: 'قارئ شهرياً' },
        { icon: 'fa-newspaper', value: `+${postsCount}`, label: 'مقالة منشورة' },
        { icon: 'fa-pen-nib', value: `+${authorsCount}`, label: 'كاتب خبير' },
        { icon: 'fa-book-open', value: `+${categoriesCount}`, label: 'تصنيف' },
      ];

      this.cd.markForCheck();
    });
  }
}
