import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';

import {MatFormFieldModule} from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from '../../models/users.model';
import { FormsModule } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatToolbarModule, 
    MatButtonModule,
    MatIconModule, 
    MatCardModule,
    MatFormFieldModule , 
    RouterLink,
    MatInputModule,
    HttpClientModule,
    FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: User = { username: '', password: '' }; // type modelo
 
  constructor(private http: HttpClient, private router: Router) {}

  login() {
    //validacion
    if (!this.user.username) {
      alert('Por favor, completa tanto el nombre de usuario como la contraseña.');
      return;
    }
    // Realiza la solicitud al back nest
    console.log("entrologin")
    console.log(this.user)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'  
    });
    
    this.http.post<{ access_token: string, username: string }>('http://localhost:3000/auth/login', this.user, { headers, observe: 'response' }).subscribe(
    (response) => {
    if (response.body) {
      console.log('Token de acceso:', response.body.access_token);
      localStorage.setItem('access_token', response.body.access_token);
      localStorage.setItem('username', response.body.username)
      if(!response.body.access_token){
        console.error('Error de credenciales');
      }else {
        this.router.navigate(['/main']);
      }
    } else {
      console.error('La respuesta no tiene un cuerpo.');
    }
  },
  (error) => {
    console.error('Error al iniciar sesión:', error);
  }
);

    
  } 
}
