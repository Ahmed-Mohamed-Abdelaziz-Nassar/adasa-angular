import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/post';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  post?: Post;


  sections: { id: string; title: string }[] = [];


  contentBlocks: { type: 'heading' | 'paragraph'; text: string; id?: string }[] = [];


  recommended: Post[] = [];


  private subs: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private router: Router,
 
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
  
    const sub = this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.loadPost(slug);
      }
    });
    this.subs.push(sub);
  }


  private loadPost(slug: string): void {
    const sub = this.postsService.getPostBySlug(slug).subscribe(post => {
      if (!post) {
        
        this.router.navigate(['/المدونة']);
        return;
      }
      this.post = post;
      this.parseContent(post.content || '');
      this.loadRecommended(post);
      
      this.cd.markForCheck();
    });
    this.subs.push(sub);
  }


  private parseContent(content: string): void {
    this.contentBlocks = [];
    this.sections = [];
    const lines = content.split(/\n+/);
    let headingIndex = 0;
    for (const line of lines) {
      if (line.trim().startsWith('## ')) {
        const title = line.replace(/^##\s*/, '').trim();
        const id = `section-${headingIndex}`;
        this.sections.push({ id, title });
        this.contentBlocks.push({ type: 'heading', text: title, id });
        headingIndex++;
      } else if (line.trim().length > 0) {
        this.contentBlocks.push({ type: 'paragraph', text: line.trim() });
      }
    }
  }


  private loadRecommended(current: Post): void {
    const sub = this.postsService.getPosts().subscribe(posts => {
      this.recommended = posts
        .filter(p => p.category === current.category && p.slug !== current.slug)
        .slice(0, 3);
      
      this.cd.markForCheck();
    });
    this.subs.push(sub);
  }

  ngOnDestroy(): void {
    
    this.subs.forEach(s => s.unsubscribe());
  }
}