import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoCovid19Service {

  private url = "https://pomber.github.io/covid19/timeseries.json";

  constructor(private http:HttpClient) {}

  getInfoPaises(): Observable<any>{
    return this.http.get(this.url);
  }

  // getTodo(){
  //   console.log("hola");
  //   this.getQuery()
  //              .pipe( map( data => {
  //               console.log("hola");
  //               console.log(data)
  //               console.log(data['Afghanistan']);
  //               console.log("fin");
  //              }));
  // }

  // async getCountries(): Promise<string[]> {
  //   const response = await fetch("https://pomber.github.io/covid19/timeseries.json").then((res) =>
  //     res.json()
  //   );

  //   console.log(response);
  //   return response;
  // }
}

