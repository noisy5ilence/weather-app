import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { City, WeatherService } from '../../weather.service';
import { Observable, Subscription } from 'rxjs';
import { pluck } from 'rxjs/internal/operators/pluck';


@Component({
  selector: 'weather-city-page',
  templateUrl: './city-page.component.html',
  styleUrls: ['./city-page.component.css']
})
export class CityPageComponent implements OnInit, OnDestroy {
  resolvedForcast$: Observable<City> = this._route.data.pipe(pluck('forcast'));
  isFavoriteCity: boolean = false;
  routerParamsSubscribtion: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _data: WeatherService
  ) { }

  ngOnInit(): void {
    this.routerParamsSubscribtion = this._route.params.subscribe(
      params => this.isFavoriteCity = this._data.getFavoriteCitiesId().includes(Number.parseInt(params.id))
    );
  }

  getDateFromMilliseconds(milliseconds: number): Date {
    return new Date(milliseconds * 1000);
  }

  addToFavorite(city: City): void {
    this.isFavoriteCity = true;
    this._data.addCityToFavoriteList(city);
  }

  removeFromFavorite(city: City): void {
    this.isFavoriteCity = false;
    this._data.removeCityFromFavoriteList(city.id);
  }

  ngOnDestroy(): void {
    this.routerParamsSubscribtion.unsubscribe();
  }
}
