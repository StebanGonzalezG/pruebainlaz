import { Post } from '../../models/posts.model';
import { PostsService } from '../../services/posts.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatListModule} from '@angular/material/list';
import { Router } from '@angular/router';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-post',
  standalone: true,
  imports: [MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
     MatIconModule, 
     MatSidenavModule,
     MatListModule,
     MatProgressBarModule,
     MatFormFieldModule,
     MatInputModule,
     MatCardModule,
     HttpClientModule,
     CommonModule,
     FormsModule],
     providers: [PostsService],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit,OnDestroy {
  showFiller = false;
  searchTerm: string = '';

  gridColumns = 3;
  mobileQuery: MediaQueryList;
  posts: Post[] = [];
  post: Post = {
    name: '', message: '',
    _id: '',
    date: '',
    like: ''
  }; // type modelo
  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
 
  
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router,
    private postsService: PostsService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
   this.postData();
  }

  postData(){
    this.postsService.getPosts().subscribe(
      (data) => {
        console.log('Datos recibidos:', data);
        this.posts = data;
      },
      (error) => {
        console.error('Error al recibir datos:', error);
      }
    );
  }

  nameStorage: string = ''; // Declarada como propiedad

  savePost(){
    console.log("ingreso"+this.post.message)
    const nameStorage = localStorage.getItem('username') || '';
    if (this.post.message !== '') {
      this.postsService.savePost(this.post.message, nameStorage);
      this.post.message = '';
      this.postData();
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout() {
     localStorage.removeItem('access_token');
     localStorage.removeItem('username');
     this.router.navigate(['/login']);
  }

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

  searchPosts() {
    // Llama al servicio de publicaciones con el término de búsqueda
    this.postsService.searchPosts(this.searchTerm).subscribe(
      (data) => {
        console.log('Publicaciones filtradas:', data);
        this.posts = data;
      },
      (error) => {
        console.error('Error al buscar publicaciones:', error);
      }
    );
  }
}
