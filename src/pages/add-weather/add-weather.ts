import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the AddWeather page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-weather',
  templateUrl: 'add-weather.html'
})
export class AddWeatherPage {
	myColor: string = "purple"; 
  isRound: boolean = true; 

	public data = {
		city: '', 
		country:''
	}; 

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {}

  ionViewDidLoad() {
   
  }
  closeModal(){
    this.viewCtrl.dismiss();
  }
  dismiss(data){
  	this.viewCtrl.dismiss(this.data); 
  }

}
