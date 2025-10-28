import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { OlympicCountry } from '../models/olympic';
 

@Injectable({ providedIn: 'root' })
export class OlympicService {
  private readonly jsonUrl = 'assets/mock/olympic.json';

  constructor(private http: HttpClient) {}
  /*
  Fait un appel HTTP GET vers le fichier olympic.json (via HttpClient).

  Renvoie un Observable contenant un tableau d’objets OlympicCountry[].
  */
  getOlympics(): Observable<OlympicCountry[]> {
    return this.http.get<OlympicCountry[]>(this.jsonUrl);
  }

  /*
  Appelle la méthode précédente getOlympics() pour récupérer les données.
  Utilise l’opérateur tap() de RxJS pour afficher les données dans la console sans les modifier.
  */
  getOlympicsAndLog(): Observable<OlympicCountry[]> {
    return this.getOlympics().pipe(
      tap(data => console.log('📊 Données JSON reçues :', data))
    );
  }
}
