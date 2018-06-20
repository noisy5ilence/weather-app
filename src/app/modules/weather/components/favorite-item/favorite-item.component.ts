import { Component, Input, Output, EventEmitter } from '@angular/core';
import { City } from '../../weather.service';

@Component({
  selector: 'weather-favorite-item',
  templateUrl: './favorite-item.component.html',
  styleUrls: ['./favorite-item.component.css']
})
export class FavoriteItemComponent {
  @Input() favoriteCity: City;
  @Output() onToggleFavorite: EventEmitter<{city: City, action: string}> = new EventEmitter();
  isCityFavorite: boolean = true;

  addToFavorite(city: City): void {
    this.isCityFavorite = true;
    this.onToggleFavorite.emit({city, action: 'add'})
  }

  removeFromFavorite(city: City): void {
    this.isCityFavorite = false;
    this.onToggleFavorite.emit({city, action: 'remove'})
  }
}
