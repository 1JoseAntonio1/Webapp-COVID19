import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoCovid19Service {

  private url = "https://pomber.github.io/covid19/timeseries.json";

  constructor(private http:HttpClient) {}

  getInfoPaises(): Observable<any>{     
    return this.http.get(this.url);
    //return this.http.get('assets/data/data-infoCodvidReserva.json');
  }
}

