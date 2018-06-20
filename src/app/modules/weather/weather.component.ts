import { Inject, Injector, Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

import { WeatherService, City } from './weather.service';


@Component({
  selector: 'weather-weather',
  template: `
    <br />
    <weather-search-input
      [cities]='cities'
      (onSearch)='onSearch($event)'
      (onCitySelect)='onCitySelect($event)'>
    </weather-search-input>
    <br />
    <mat-card *ngIf='isShowSearchError && !cities?.lenght'>
      No results. Try to enter another city name.
    </mat-card>
    <br />
    <weather-favorite-list
      *ngIf='(favoriteCities$ | async) as favoriteCities'
      [title]="'Favorite cities'">
      <ng-container *ngFor='let favoriteCity of favoriteCities'>
        <weather-favorite-item
          (onToggleFavorite)='onToggleFavorite($event)'
          [favoriteCity]='favoriteCity'>
        </weather-favorite-item>
      </ng-container>
    </weather-favorite-list>
  `,
  styles: ['']
})
export class WeatherComponent implements OnInit, OnDestroy {
  cities: City[] = [];
  favoriteCities$: Observable<City[]>;
  isShowSearchError: boolean = false;
  citySubscribtion: Subscription;

  constructor(
    private _data: WeatherService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    if (this._data.getFavoriteCitiesId().length) {
      this.favoriteCities$ = this._data.getWeatherForFewCities(this._data.getFavoriteCitiesId());
    }
  }

  onSearch(cityName: string): void {
    this.citySubscribtion = this._data.getWeatherByCityName(cityName).subscribe(
      (city: City) => {
        this.cities = [city];
        this.isShowSearchError = false;
      },
      () => {
        this.cities = [];
        this.isShowSearchError = !!cityName;
      }
    );
  }

  onToggleFavorite(payload: {city: City, action: string}) {
    if(payload.action === 'add') {
      this._data.addCityToFavoriteList(payload.city);
    } else {
      this._data.removeCityFromFavoriteList(payload.city.id);
    }
  }

  onCitySelect(cityId: string): void {
    this._router.navigate([cityId]);
  }

  ngOnDestroy(): void {
    this.citySubscribtion && this.citySubscribtion.unsubscribe();
  }
}
