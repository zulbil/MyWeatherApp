import { Component } from '@angular/core';
import { Weather } from '../../providers/weather';
import { AddWeatherPage } from '../add-weather/add-weather';
import { NavController, ModalController, PopoverController, AlertController } from 'ionic-angular';
import {ForecastPage} from '../forecast/forecast';
import { TaskPage } from '../task/task';
import { StorageService } from '../../providers/storage-service';
import { SocialSharing } from 'ionic-native';
import Moment from 'moment';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	public slides = [];
  public localWeather;
  public myColor: string = "purple";
  public date: string;

  constructor(public navCtrl: NavController, public weatherService: Weather,
    public mdlCtrl: ModalController, public storageService: StorageService,
    public propoverCtrl:PopoverController, public alrtCtrl:AlertController) {
    this.getLocalWeather();
    this.getStoredWeather();
    this.getCurrentDate();
  }

  ionViewDidLoad(){
  }

  getCurrentDate(){
    this.date = Moment().format('LLL');
    return this.date;
  }

  addWeather(){
  	let modal = this.mdlCtrl.create(AddWeatherPage);

  	modal.onDidDismiss((data) => {
  		if(data){
  			this.getWeather(data.city, data.country);
  		}
      console.log(this.slides);
  	})

  	modal.present();
  }

  getWeather(city: string, country: string){
  	this.weatherService.getRemoteWeatherDataByCity(city,country)
  		.map(data => data.json())
  		.subscribe((data) => {
        console.log(data);
  			this.slides.push(data);
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
      this.slides = JSON.parse(weathers) || [];
    })
  }



  more(event){
    let popover = this.propoverCtrl.create(TaskPage);
    popover.present({ ev: event});
  }

  sharebyFacebook(){
    SocialSharing.shareViaFacebook("test","test","https://www.joshmorony.com/").then(() =>
    {
        this.showAlert();
    }).catch((err) => {
      console.log(err);
    });
  }

  sharebyTwitter(){
    SocialSharing.shareViaTwitter("test","test","https://www.joshmorony.com/").then( () => {
        this.showAlert();
    }).catch((err) => {
      console.log(err);
    })
  }

  sharebyWhatsapp(){
    SocialSharing.shareViaWhatsApp("test","test","https://www.joshmorony.com/").then(() => {
        this.showAlert();
    }).catch((err) => {
      console.log(err);
    })
  }

  showAlert() {
    let alert = this.alrtCtrl.create({
      title: 'Success!',
      subTitle: 'You share something!'
    });
    alert.present();
  }
}
