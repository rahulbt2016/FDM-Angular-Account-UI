import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAccount } from '../models/account.model';
import { IFilter } from '../models/filter.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl: string = 'http://localhost:8080/api/v1/account';
  constructor(private http: HttpClient) {}

  getAccounts(): Observable<IAccount[]> {
    return this.http.get<IAccount[]>(this.baseUrl);
  }

  getAccount(id: number): Observable<IAccount> {
    return this.http.get<IAccount>(`${this.baseUrl}/${id}`);
  }

  addAccount(account: IAccount): Observable<IAccount> {
    return this.http.post<IAccount>(this.baseUrl, account);
  }

  updateAccount(account: IAccount): Observable<IAccount> {
    return this.http.put<IAccount>(
      `${this.baseUrl}/${account.accountId}`,
      account
    );
  }

  deleteAccount(id: number): Observable<IAccount> {
    return this.http.delete<IAccount>(`${this.baseUrl}/${id}`);
  }

  filterAccounts(filter: IFilter): Observable<IAccount[]> {
    let params = new HttpParams();
    if (filter.accountId) {
      params = params.append('accountId', filter.accountId.toString());
    }
    if (filter.accountType) {
      params = params.append('accountType', filter.accountType);
    }
    if (filter.accountHolder) {
      params = params.append('accountHolder', filter.accountHolder);
    }
    if (filter.minAccountBalance) {
      params = params.append(
        'minAccountBalance',
        filter.minAccountBalance.toString()
      );
    }
    return this.http.get<IAccount[]>(`${this.baseUrl}/filterAccounts`, {
      params,
    });
  }
}
