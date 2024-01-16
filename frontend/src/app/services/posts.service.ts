import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/posts.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrl = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) { }

  savePost(message: string, username: string): void {
    console.log('ingreso');
    const postData = {
      name: username,
      message: message
    };
  
    this.http.post(this.apiUrl, postData).subscribe(
      () => {
        console.log('Post exitoso');  // O cualquier lógica que quieras ejecutar después del éxito
      },
      (error) => {
        console.error('Error al realizar el post', error);  // O cualquier manejo de error que desees
      }
    );
  }
  

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }
}
