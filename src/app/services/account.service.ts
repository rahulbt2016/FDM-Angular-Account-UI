import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAccount } from '../models/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl: string = 'http://localhost:8080/api/v1/account';
  constructor(private http: HttpClient) {}

  getAccounts(): Observable<IAccount[]> {
    return this.http.get<IAccount[]>(this.baseUrl);
  }

  addAccount(account: IAccount): Observable<IAccount> {
    return this.http.post<IAccount>(this.baseUrl, account);
  }
}
