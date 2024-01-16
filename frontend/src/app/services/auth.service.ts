import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated(): boolean {
    // Implementa la lógica para verificar la presencia y validez del token JWT aquí
    const token = localStorage.getItem('access_token'); // Suponiendo que el token JWT se almacena en el almacenamiento local

    // Ejemplo básico: verifica si el token está presente
    return !!token;
  }
}
