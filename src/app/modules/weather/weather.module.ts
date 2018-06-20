import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { WeatherComponent } from './weather.component';
import { WeatherService } from './weather.service';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { CityPageComponent } from './components/city-page/city-page.component';
import { WeatherResolve } from './weather.resolve';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { FavoriteItemComponent } from './components/favorite-item/favorite-item.component';


const ROUTES: Routes = [
  { path: '', component: WeatherComponent },
  { path: ':id', component: CityPageComponent, resolve: { forcast: WeatherResolve } }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule.forChild(ROUTES)
  ],
  providers: [
    WeatherService,
    WeatherResolve,
    { 
      provide: 'api',
      useValue: 'http://api.openweathermap.org'
    },
    {
      provide: 'token',
      useValue: '9e428cc0fdd5bf05d365eac2b75e0f3a'
    }
  ],
  declarations: [
    WeatherComponent,
    SearchInputComponent,
    CityPageComponent,
    FavoriteListComponent,
    FavoriteItemComponent
  ]
})
export class WeatherModule { }
