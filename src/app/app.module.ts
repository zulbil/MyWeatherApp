import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddWeatherPage} from '../pages/add-weather/add-weather'; 
import { ForecastPage } from '../pages/forecast/forecast';
import { ConvertTemperature } from '../pipes/convert-temperature'; 
import { Weather } from '../providers/weather';
import { StorageService } from '../providers/storage-service';
import { WeatherComponent } from '../components/weather/weather';
import { Storage } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage, 
    AddWeatherPage,  
    ConvertTemperature, 
    ForecastPage,
    WeatherComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,  
    AddWeatherPage, 
    ForecastPage, 
    WeatherComponent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Weather, StorageService, Storage]
})
export class AppModule {}
