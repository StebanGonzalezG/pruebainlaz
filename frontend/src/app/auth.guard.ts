// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
    if (this.authService.isAuthenticated()) {
      // El token JWT está presente y válido
      return true;
    } else {
      // El token no está presente o no es válido, redirige al componente de inicio de sesión
      this.router.navigate(['/login']);
      return false;
    }
  }
}
