import { Component } from '@angular/core';
import { Weather } from '../../providers/weather';
import { AddWeatherPage } from '../add-weather/add-weather';
import { NavController, ModalController } from 'ionic-angular';
import {ForecastPage} from '../forecast/forecast';
import { WeatherComponent } from '../../components/weather/weather';
import { StorageService } from '../../providers/storage-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	public WeatherList = [];
  public localWeather;

  constructor(public navCtrl: NavController, public weatherService: Weather,
    public mdlCtrl: ModalController, public storageService: StorageService) {
    this.getLocalWeather();
    this.getStoredWeather();
  }

  ionViewDidLoad(){
  }

  addWeather(){
  	let modal = this.mdlCtrl.create(AddWeatherPage);

  	modal.onDidDismiss((data) => {
  		if(data){
  			this.getWeather(data.city, data.country);
  		}
      console.log(this.WeatherList);
  	})

  	modal.present();
  }

  getWeather(city: string, country: string){
  	this.weatherService.getRemoteWeatherDataByCity(city,country)
  		.map(data => data.json())
  		.subscribe((data) => {
        console.log(data);
  			this.WeatherList.push(data);
        this.storageService.setWeathers(data);
  		},
  			err => console.log(err)
  		, () => console.log("getting weather")
  		);
  }

  viewForecast(cityWeather){
    this.navCtrl.push(ForecastPage,{ cityWeather: cityWeather});
  }

  getLocalWeather(){
      this.weatherService.local()
           .subscribe( data => {
             this.localWeather = data;
           });
  }

  getStoredWeather(){
    this.storageService.getWeathers().then((weathers) => {
      this.WeatherList = JSON.parse(weathers) || [];
    })
  }

  removeStoredWeather(weather) {
    this.storageService.deleteWeather(weather);
    this.getStoredWeather();
  }
}
