import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface City {
  id: string;
  name: string;
  main: {
    pressure: number,
    temp: number,
    max_temp: number,
    min_temp: number
  };
  weather: Weather[];
}

export interface Forcast {
  city: City;
  list: ForcastList[];
}

export interface ForcastList {
  main: {
    pressure: number,
    temp: number,
    max_temp: number,
    min_temp: number
  };
  dt: number;
  weather: Weather[];
}

export interface Weather {
  main: string;
  icon: string;
}

@Injectable()
export class WeatherService {

  constructor(
    private _http: HttpClient,
    @Inject('api') private _api: string,
    @Inject('token') private _token: string,
  ) {
    if(!window.localStorage.getItem('favoriteCities')) {
      window.localStorage.setItem('favoriteCities', JSON.stringify([]));
    }
  }

  getFavoriteCitiesId(): number[] {
    return JSON.parse(window.localStorage.getItem('favoriteCities'));
  }

  getWeatherByCityName(cityName: string): Observable<City> {
    return this._http.get<City>(
      `${this._api}/data/2.5/weather`,
      {
        params: {
          q: cityName,
          appid: this._token,
          units: 'metric'
        } 
      }
    );
  }

  getWeatherByCityId(cityId: string): Observable<City> {
    return this._http.get<City>(
      `${this._api}/data/2.5/weather`,
      {
        params: {
          id: cityId,
          appid: this._token,
          units: 'metric'
        } 
      }
    );
  }

  getWeatherForFewCities(cityIds: string[] | number[]) {
    return this._http.get<City[]>(
      `${this._api}/data/2.5/group`,
      {
        params: {
          id: cityIds.join(),
          appid: this._token,
          units: 'metric'
        } 
      }
    ).pipe(map((cityList: any) => cityList.list))
  }

  getWeatherForecastFor5Days(cityId: string): Observable<Forcast> {
    return this._http.get<Forcast>(
      `${this._api}/data/2.5/forecast`,
      {
        params: {
          id: cityId,
          units: 'metric',
          appid: this._token
        } 
      }).pipe(map(
        forecast => ({
          ...forecast,
          list: forecast.list.filter(
            (item, index, self) => self.findIndex(
              i => new Date(i.dt * 1000).getUTCDate() === new Date(item.dt * 1000).getUTCDate()
            ) === index
          )
        })
      )
    );
  }

  addCityToFavoriteList(city: City): void {
    window.localStorage.setItem('favoriteCities', JSON.stringify([
      ...this.getFavoriteCitiesId(), city.id
    ]));
  }

  removeCityFromFavoriteList(cityId: string | number): void {
    window.localStorage.setItem(
      'favoriteCities', JSON.stringify(this.getFavoriteCitiesId().filter(
        (_cityId: number) => _cityId !== cityId
      ))
    );
  }
}
