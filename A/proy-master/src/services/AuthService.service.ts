import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:9900/api';
  private readonly userKey = 'currentUser'; // Clave para almacenar el usuario autenticado en el almacenamiento local
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    const userString = localStorage.getItem(this.userKey);
    this.currentUserSubject = new BehaviorSubject<any>(userString ? JSON.parse(userString) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }
  login(email: string, password: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Usuarios/${email}`).pipe(
      switchMap(user => {
        if (user && user.contrasena === password) {
          localStorage.setItem(this.userKey, JSON.stringify(user));
          this.currentUserSubject.next(user);
          return of(user);
        } else {
          return throwError('Usuario o contraseña incorrectos');
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.userKey);
  }

  logout(): void {
    localStorage.removeItem(this.userKey); // Elimina la información de autenticación del almacenamiento local
    this.currentUserSubject.next(null); // Notifica a los suscriptores sobre el cambio en el usuario autenticado (null indica que no hay usuario autenticado)
    // Aquí puedes redirigir al usuario a la página de inicio de sesión o a cualquier otra página relevante.
    // Por ejemplo: this.router.navigate(['/login']);
  }
}
