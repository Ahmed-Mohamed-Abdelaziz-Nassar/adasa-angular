import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: Post[] = [];


  featuredPosts: Post[] = [];


  latestPosts: Post[] = [];


  categoriesList: { name: string; count: number; icon: string }[] = [];

 
  stats: { icon: string; value: string; label: string }[] = [];


  newsletterEmail = '';

  constructor(
    private postsService: PostsService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.postsService.getPosts().subscribe(data => {
      this.posts = data;

      this.featuredPosts = data.filter(p => p.featured).slice(0, 3);

      this.latestPosts = data
        .slice() 
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3);

      const authors = new Set(data.map(p => p.author.name));
      const authorsCount = authors.size;

      const categoryCounts: Record<string, number> = {};
      data.forEach(post => {
        categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1;
      });

      const allCategories = [
        { name: 'إضاءة', icon: 'fa-sun' },
        { name: 'بورتريه', icon: 'fa-user' },
        { name: 'مناظر طبيعية', icon: 'fa-mountain' },
        { name: 'تقنيات', icon: 'fa-sliders-h' },
        { name: 'معدات', icon: 'fa-camera' },
      ];
      this.categoriesList = allCategories.map(cat => ({
        name: cat.name,
        icon: cat.icon,
        count: categoryCounts[cat.name] || 0,
      }));

      const postsCount = data.length;
      this.stats = [
        { icon: 'fa-newspaper', value: `${postsCount}+`, label: 'مقالة' },
        { icon: 'fa-users', value: '+10 ألف', label: 'قارئ' },
        { icon: 'fa-folder-open', value: `${this.categoriesList.length}`, label: 'تصنيفات' },
        { icon: 'fa-pen-nib', value: `${authorsCount}`, label: 'كاتب' },
      ];
      this.cd.markForCheck();
    });
  }
}