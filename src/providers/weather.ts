import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Geolocation} from 'ionic-native'; 
import {Observable} from 'rxjs/Observable';


/*
  Generated class for the Weather provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Weather {
private appId = '5fd6f61599fef6e0d71dde2fd4a5bea7';
private baseUrl = 'http://api.openweathermap.org/data/2.5/';

  constructor(public http: Http) {
    console.log('Hello Weather Provider');
  }


  getRemoteWeatherDataByCity(city: string, country: string){
  	let url = this.baseUrl +'weather';
    url += '?appId=' +this.appId;
    url += '&q=' +city;
    url += ',' +country;

    return this.http.get(url);
  }

  forecast(cityId: string, numOfDays: number){
    let url = this.baseUrl +'forecast/daily';
    url += '?appId=' +this.appId;
    url += '&id=' +cityId;
    url += '&cnt=' +numOfDays;

    return this.http.get(url);
  }

  local(){

    let Obs = Observable.create(observer => {

        Geolocation.getCurrentPosition().then((pos => {
            console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
            var lat = pos.coords.latitude; 
            var lon =  pos.coords.longitude; 

            let url = this.baseUrl +'weather';
            url += '?appId=' +this.appId;
            url += '&lat=' +lat;
            url += '&lon=' +lon; 
           
            this.http.get(url)
                .subscribe( data => {
                    observer.next(data.json());
                }, 
                  err => console.log(err), 
                  () => observer.complete()
                )
         }))
    
    })
    
    return Obs;
  }

}
