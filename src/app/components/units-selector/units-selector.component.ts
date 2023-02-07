import { SetDegreesUnit } from './../../reducers/app-settings.actions';
import { selectAppSettings } from './../../reducers/index';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AppSettings } from 'src/app/reducers/app-settings.model';
import { Store, select } from '@ngrx/store';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-units-selector',
  templateUrl: './units-selector.component.html',
  styleUrls: ['./units-selector.component.scss'],
})
export class UnitsSelectorComponent implements OnInit {
  appSettings$: Observable<AppSettings>;
  constructor(private appSettingsStore: Store<AppSettings>) {}

  ngOnInit() {
    this.appSettings$ = this.appSettingsStore.pipe(select(selectAppSettings));
  }

  onSelectionChanged(changeEvent: MatRadioChange) {
    this.appSettingsStore.dispatch(
      new SetDegreesUnit({ unit: changeEvent.value })
    );
  }
}
