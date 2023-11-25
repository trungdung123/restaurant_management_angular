import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROOT_API } from '../commons/constants/api';
import { AccountLogin, AccountRegister, AccountReq, AccountRes, JwtResponse } from '../commons/dto/account';
import { AuthService } from './auth.service';
import { BaseResponse } from '../commons/dto/response';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseURL = ROOT_API + "/auth";
  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  authentication(accountLogin: AccountLogin): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`${this.baseURL}/signin`, accountLogin);
  }

  register(accountRegister: AccountRegister): Observable<BaseResponse> {
    return this.httpClient.post<BaseResponse>(`${this.baseURL}/create-account`, accountRegister);
  }

  updateAccount(accountRegister: AccountReq, accountId: number): Observable<BaseResponse> {
    return this.httpClient.put<BaseResponse>(`${this.baseURL}/update-account/${accountId}`, accountRegister);
  }

  getAccount(accountId: number): Observable<AccountRes> {
    return this.httpClient.get<AccountRes>(`${this.baseURL}/${accountId}`);
  }

}
