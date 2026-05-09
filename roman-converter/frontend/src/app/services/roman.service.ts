import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ToRomanResponse {
  roman: string;
}

export interface ToIntegerResponse {
  integer: number;
}

@Injectable({
  providedIn: 'root'
})
export class RomanService {
  private readonly apiUrl = 'http://localhost:5000/api/roman';

  constructor(private http: HttpClient) {}

  toRoman(number: number): Observable<ToRomanResponse> {
    const params = new HttpParams().set('number', number.toString());
    return this.http.get<ToRomanResponse>(`${this.apiUrl}/to-roman`, { params });
  }

  toInteger(roman: string): Observable<ToIntegerResponse> {
    const params = new HttpParams().set('roman', roman);
    return this.http.get<ToIntegerResponse>(`${this.apiUrl}/to-integer`, { params });
  }
}
