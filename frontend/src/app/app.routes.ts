import { MainComponent } from './components/main/main.component';
import { Component, NgModule } from '@angular/core';
import { Routes,RouterModule  } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [

    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'main', component: MainComponent,canActivate: [AuthGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' },

];
 