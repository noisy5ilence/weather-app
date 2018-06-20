import { Component, Input } from '@angular/core';

@Component({
  selector: 'weather-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent {
  @Input() title: string = '';
}
