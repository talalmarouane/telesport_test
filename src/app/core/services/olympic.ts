import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { OlympicCountry } from '../models/olympic';
 

@Injectable({ providedIn: 'root' })
export class OlympicService {
  private readonly jsonUrl = 'assets/mock/olympic.json';

  constructor(private http: HttpClient) {}

  getOlympics(): Observable<OlympicCountry[]> {
    return this.http.get<OlympicCountry[]>(this.jsonUrl);
  }

  getOlympicsAndLog(): Observable<OlympicCountry[]> {
    return this.getOlympics().pipe(
      tap(data => console.log('📊 Données JSON reçues :', data))
    );
  }
}
