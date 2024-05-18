import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly server: string = environment.API_BASE_URL;

  constructor(private http:HttpClient) {

  }

  findUserByName(userFullname: string): Observable<User> {
      return this.http.get<User>(`${this.server}/api/v1/xmasf/user/name/${userFullname}/getUser`);
  }

 findAllUsers(): Observable<User[]> {
      return this.http.get<User[]>(`${this.server}/api/v1/xmasf/getAllUsers`);
  }

  createOrUpdateUser(user: User): Observable<User> {
      return this.http.post<User>(`${this.server}/api/v2/xmasf/user/createOrUpdateUser`, user);
  }

  saveSecretsSanta(changes: User): Observable<User> {
      return this.http.post<User>(`${this.server}/api/v1/xmasf/user/secrets`, changes);
  }

  deleteUser(nomUser?: string): Observable<User> {
      return this.http.delete<User>(`${this.server}/api/v1/xmasf/user/name/${nomUser}/deleteUser`);
  }

  sendMailConfirmEnreg(changes: User): Observable<String> {
    return this.http.post<String>(`${this.server}/api/v1/xmasf/confirmEnreg`, changes);
  }

  sendResults(changes: User[]): Observable<String[]> {
    return this.http.post<String[]>(`${this.server}/api/v1/xmasf/sendResults`, changes);
  }
  
}
