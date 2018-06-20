import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { WeatherService, Forcast } from './weather.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of'


@Injectable()
export class WeatherResolve implements Resolve<Forcast> {
  constructor(
    private _data: WeatherService,
    private _router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Forcast> {
    return this._data.getWeatherForecastFor5Days(route.params.id).pipe(
      catchError((error) => {
        this._router.navigate(['/']);
        return of(error);
      })
    );
  }
}