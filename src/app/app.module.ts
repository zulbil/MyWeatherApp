import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddWeatherPage} from '../pages/add-weather/add-weather'; 
import { ForecastPage } from '../pages/forecast/forecast';
import { MapPage } from '../pages/map/map'; 
import { TaskPage } from '../pages/task/task'; 
import { ConvertTemperature } from '../pipes/convert-temperature'; 
import { Weather } from '../providers/weather';
import { StorageService } from '../providers/storage-service';
import { WeatherComponent } from '../components/weather/weather';
import { Storage } from '@ionic/storage';
import { PlacesPage } from '../pages/places/places';
import { SharePage } from '../pages/share/share'; 

@NgModule({
  declarations: [
    MyApp,
    HomePage, 
    AddWeatherPage,  
    ConvertTemperature, 
    ForecastPage,
    WeatherComponent, 
    PlacesPage,
    MapPage,
    SharePage,
    TaskPage
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
    TaskPage,
    PlacesPage,
    MapPage,
    SharePage,
    WeatherComponent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Weather, StorageService, Storage]
})
export class AppModule {}
