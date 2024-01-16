import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/users.model';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatCardModule, 
            MatFormFieldModule,
            RouterLink,
            FormsModule,
            MatInputModule,
            HttpClientModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private http: HttpClient, private router: Router) {}
  user: User = {
    username: '', password: '',
    edad: '',
    email: ''
  }; // type modelo

  register() { 
    // Realiza la solicitud al back nest
     const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'  
    });
    
    this.http.post<{ access_token: string }>('http://localhost:3000/auth/register', this.user, { headers, observe: 'response' }).subscribe(
    (response) => {
    if (response.body) {
      console.log('Token de acceso:', response.body.access_token);
      localStorage.setItem('access_token', response.body.access_token);
      if(!response.body.access_token){
        console.error('Error de credenciales');
      }else {
        this.router.navigate(['/login']);
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
  
