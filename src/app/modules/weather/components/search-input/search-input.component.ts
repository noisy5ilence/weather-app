import { Component, OnInit, Output, Input, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { City } from '../../weather.service';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { Subscription } from 'rxjs';


@Component({
  selector: 'weather-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit, OnDestroy {
  @Output() onSearch: EventEmitter<string> = new EventEmitter();
  @Output() onCitySelect: EventEmitter<string> = new EventEmitter();
  @Input() cities: City[] = [];

  searchQuery: FormControl = new FormControl();
  valueChangesSubscribtion: Subscription;

  onSelect(city: City): void {
    this.onCitySelect.emit(city.id);
  }

  ngOnInit(): void {
    this.valueChangesSubscribtion = this.searchQuery.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value => this.onSearch.emit(value));
  }

  ngOnDestroy(): void {
    this.valueChangesSubscribtion.unsubscribe();
  }
}
