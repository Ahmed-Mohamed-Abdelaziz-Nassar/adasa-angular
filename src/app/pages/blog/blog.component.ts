import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PaginationComponent],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  posts: Post[] = [];

  filteredPosts: Post[] = [];

  selectedCategory: string = 'جميع المقالات';

  searchTerm: string = '';

  viewMode: 'grid' | 'list' = 'grid';

  currentPage: number = 1;

  postsPerPage: number = 6;

  categories: string[] = [];

  constructor(
    private postsService: PostsService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.postsService.getPosts().subscribe(data => {
      this.posts = data;
      const uniqueCategories = Array.from(new Set(this.posts.map(p => p.category)));
      this.categories = ['جميع المقالات', ...uniqueCategories];
      this.applyFilters();
      this.cd.markForCheck();
    });
  }

  applyFilters(): void {
    let list = this.posts;
    if (this.selectedCategory && this.selectedCategory !== 'جميع المقالات') {
      list = list.filter(p => p.category === this.selectedCategory);
    }
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      const term = this.searchTerm.trim().toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(term) || p.excerpt.toLowerCase().includes(term)
      );
    }
    this.filteredPosts = list;
    const totalPages = Math.ceil(this.filteredPosts.length / this.postsPerPage);
    if (this.currentPage > totalPages) {
      this.currentPage = 1;
    }
  }


  selectCategory(cat: string): void {
    this.selectedCategory = cat;
    this.applyFilters();
  }


  onSearchChange(): void {
    this.applyFilters();
  }


  toggleView(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
  }


  changePage(page: number): void {
    this.currentPage = page;
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }


  get displayedPosts(): Post[] {
    const start = (this.currentPage - 1) * this.postsPerPage;
    return this.filteredPosts.slice(start, start + this.postsPerPage);
  }


  get totalPages(): number {
    return Math.ceil(this.filteredPosts.length / this.postsPerPage) || 1;
  }
}