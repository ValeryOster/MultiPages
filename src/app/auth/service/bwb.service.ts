import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export class Bewerbung {
  id: number;
  userId: number;
  firmName: string;
  firmAdress: string;
  ansprechPartner: string;
  telNummer: string;
  zustand: string;
  notizen: string;
  bewerbungsDatum: string;
  email: string;
}

@Injectable({providedIn: 'root'})
export class BwbService {
  private url = 'http://localhost:8080/bewerbungen/';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Bewerbung[]> {
    return this.http.get<Bewerbung[]>(this.url + 'getall');
  }

  getById(id: number): Observable<Bewerbung> {
    return this.http.get<Bewerbung>(this.url + id);
  }

  update(bewerbung: Bewerbung): Observable<Bewerbung> {
    return this.http.put<Bewerbung>(this.url + 'update/' + bewerbung.id, bewerbung);
  }
  create(bewerbung: Bewerbung): Observable<Bewerbung> {
    return this.http.post<Bewerbung>(this.url, bewerbung);
  }

  delete(id: number){
    return this.http.delete(this.url + id);
  }
}
