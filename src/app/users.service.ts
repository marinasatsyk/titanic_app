import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private apiUsersUrs = 'http://localhost:8000/users';

  constructor(
    private  http: HttpClient
  ) {   }
  getUsers()
  {
    return this.http.get( this.apiUsersUrs, httpOptions );
  }

  getUser( id: number | string )
  {
    return this.http.get( `${this.apiUsersUrs}/find/${id}`, httpOptions );
  }

  addUser( user: any )
  {
    return this.http.post( `${this.apiUsersUrs}/add`, {...httpOptions, body: user} )
  }

  deleteUser( user: any )
  {
    return this.http.delete( `${this.apiUsersUrs}/delete`, {...httpOptions, body: user} )
  }

  getUserByemail( credentials: any )
  {
    // d'interroger l'api pour obtenir l'utilisateur selon son email et retourner l'utilisateur
    return this.http.post( `${this.apiUsersUrs}/login`, {...httpOptions, body: credentials} );
  }

  checkAuth( data: any )
  {
    return this.http.post(`${this.apiUsersUrs}/checkAuth`, {...httpOptions, body: data });
  }

}
