import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the StorageService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StorageService {
	private storageDB ="weatherStorage";
	private weathers: Array<Object>;

  constructor(public storage: Storage) {
    this.storage = new Storage(['sqlite', 'websql', 'indexeddb'], {name: this.storageDB});
    this.getWeathers().then(data => {
    	this.weathers = JSON.parse(data);
    });
  }

  getWeathers(){
  		return this.storage.get(this.storageDB);
  }

  setWeathers(weather){
  	if(!this.weathers){
  		this.weathers = [weather];
  	}
  	else {
  		this.weathers.push(weather);
  	}
  	this.storage.set(this.storageDB, JSON.stringify(this.weathers));
  }

  deleteWeather(weather){
    this.storage.remove(weather).then((weather) => {
      console.log(weather +" is deleted successfully");
    });
  }

}
