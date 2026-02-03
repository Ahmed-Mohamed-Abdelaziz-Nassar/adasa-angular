import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { BlogComponent } from './pages/blog/blog.component';
import { PostComponent } from './pages/post/post.component';
import { AboutComponent } from './pages/about/about.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { TermsComponent } from './pages/terms/terms.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';


export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/الرئيسية' },
  { path: 'الرئيسية', component: HomeComponent },

  { path: 'المدونة/:slug', component: PostComponent },
  { path: 'المدونة', component: BlogComponent },
  { path: 'من-نحن', component: AboutComponent },
  { path: 'سياسة-الخصوصية', component: PrivacyComponent },
  { path: 'شروط-الخدمة', component: TermsComponent },
  { path: '**', component: NotFoundComponent },
];