import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { User } from '../../models/users.model';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule,RouterLink,
    FormsModule,],
  templateUrl: './information.component.html',
  styleUrl: './information.component.css'
})
export class InformationComponent {
  users: User = {
    username: '',
    password: '',
    edad: '',
    email: ''
  }; // type modelo
  constructor(private router: Router,
    private postsService: PostsService){}

  ngOnInit(): void {
    const nameStorage = localStorage.getItem('username') || '';
    const emailStorage = localStorage.getItem('email') || '';
    const edadStorage = localStorage.getItem('edad') || '';
    this.users.email = emailStorage;
    this.users.edad = edadStorage;
    this.users.username = nameStorage;
  }
}
