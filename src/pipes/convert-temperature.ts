import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the ConvertTemperature pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'convertTemperature'
})
@Injectable()
export class ConvertTemperature {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value, args) {
   var celsius = Math.round(parseInt(value,10) - 273.15); 
   //var farheneit = Math.round(parseInt(value,10) * 9/5 -459.67); 

   return celsius+'°C';  
  }
}
