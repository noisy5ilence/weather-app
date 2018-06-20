import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { WeatherService, Forcast } from './weather.service';


@Injectable()
export class WeatherResolve implements Resolve<Forcast> {
  constructor(private _data: WeatherService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this._data.getWeatherForecastFor5Days(route.params.id);
  }
}