import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  currentYear = new Date().getFullYear();


  categories: { name: string; count: number }[] = [];


  email = '';
  subscribed = false;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService.getPosts().subscribe((posts: Post[]) => {
      const counts: Record<string, number> = {};
      posts.forEach(p => {
        counts[p.category] = (counts[p.category] || 0) + 1;
      });
      const allCategories = ['إضاءة', 'بورتريه', 'مناظر طبيعية', 'تقنيات', 'معدات'];
      this.categories = allCategories.map(name => ({ name, count: counts[name] || 0 }));
    });
  }

  subscribe(): void {
    this.subscribed = true;
    setTimeout(() => (this.subscribed = false), 2000);
    this.email = '';
  }
}
