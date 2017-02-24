import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Weather } from '../../providers/weather'; 

/*
  Generated class for the Forecast page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-forecast',
  templateUrl: 'forecast.html'
})
export class ForecastPage {
	public forecast = []; 
	cityWeather: any; 
  constructor(public navCtrl: NavController, public navParams: NavParams, public weatherService: Weather) {
  	this.cityWeather = navParams.get('cityWeather'); 
  	this.getForecast(this.cityWeather.id); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForecastPage');
  }

  getForecast(cityId){
  	this.weatherService.forecast(cityId, 7)
  		.map(data => data.json())
  		.subscribe( data => {
  			this.forecast = data.list; 
  		}, 
  		(err) => console.log(err), 
  		() => console.log("getting forecast arry for city")
  		);
  }

}
