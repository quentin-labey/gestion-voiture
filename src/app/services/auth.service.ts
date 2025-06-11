import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { User } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser : User = {username: '', password: '', role: ''}
  public userId : any;
  public authenticated : boolean =false;
  private apiUrl = 'http://localhost:3000/users'; // json-server --watch vars.json --port 3000

  constructor(private http: HttpClient, private router: Router) {}

  public login(username: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          this.currentUser = user
          this.userId = user.id
          this.authenticated = true;
          return true;
        } else {
          this.authenticated = false;
          return false;
        }
      })
    );
  }

  logout() {
    this.authenticated=false;
    this.router.navigateByUrl("/login");
  }

  addUser(user :User): Observable<any> {
    
    return this.http.post(this.apiUrl, user);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${user.id}`, user);
  }

    getUserById(id: string): Observable<User> {
      return this.http.get<User>(`${this.apiUrl}/${id}`);
    }

  getCurrentUser() {
    return this.currentUser;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

