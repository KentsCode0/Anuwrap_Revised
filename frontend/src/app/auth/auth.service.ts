import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
<<<<<<< HEAD
  private apiUrl ='http://localhost/anuwrap/backend/public/api';
  
=======
  private apiUrl = 'http://localhost/anuwrap/backend/public/api';

>>>>>>> 0d953316352f4decd89dfb634aa9ad9efd7dd2fd
  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    // Set headers for the request
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    // Send a POST request to your backend API to register the user
<<<<<<< HEAD
    return this.http.post<any>(`${this.apiUrl}/user`, user, { headers });
=======
    return this.http.post<any>(`${this.apiUrl}/user`, user);
>>>>>>> 0d953316352f4decd89dfb634aa9ad9efd7dd2fd
  }
  
  login(credentials: { email: string, password: string }): Observable<any> {
    
    // Send a POST request to your backend API to authenticate the user
<<<<<<< HEAD
    return this.http.post<any>(`${this.apiUrl}/token`, credentials, { observe: 'response', responseType: 'json' });
=======
    return this.http.post<any>(`${this.apiUrl}/token`, credentials);
>>>>>>> 0d953316352f4decd89dfb634aa9ad9efd7dd2fd
  }
}
