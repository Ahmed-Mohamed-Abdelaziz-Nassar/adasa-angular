import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render router outlet and layout components', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    // Ensure navbar exists
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
    // Ensure router outlet placeholder exists
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
    // Ensure footer exists
    expect(compiled.querySelector('app-footer')).toBeTruthy();
  });
});
