import {
    SearchCities,
    SelectCity,
    ClearSelectedCity,
} from '../../reducers/city.actions';
import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    AfterViewInit,
    OnDestroy,
} from '@angular/core';
import { fromEvent, Observable, of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { City } from '../../reducers/city.model';
import { selectCities, getCurrentCity, queryCities } from '../../reducers';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { SubSink } from 'SubSink';

@Component({
    selector: 'app-city-selector',
    templateUrl: './city-selector.component.html',
    styleUrls: ['./city-selector.component.scss'],
})
export class CityselectorComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('autoCompleteInput')
    autoCompleteInput: ElementRef;
    cityInput: FormControl = new FormControl();
    cities$: Observable<City[]>;
    currentCity$: Observable<City>;
    private subs = new SubSink();

    constructor(private cityStore: Store<City>) {}

    ngOnInit() {
        this.cities$ = this.cityStore.pipe(select(selectCities));
        this.subs.add(
            this.cityStore.pipe(select(getCurrentCity)).subscribe(city => {
                if (city) {
                    this.cityInput.setValue(city.name);
                }
            })
        );
    }

    ngAfterViewInit(): void {
        fromEvent(this.autoCompleteInput.nativeElement, 'keyup')
            .pipe(debounceTime(300))
            .subscribe((event: KeyboardEvent) => {
                if (this.cityInput.value) {
                    this.subs.add(
                        this.cityStore
                            .select(queryCities, this.cityInput.value)
                            .subscribe(cities => {
                                if (cities.length > 0) {
                                    this.cities$ = of(cities);
                                } else {
                                    this.cityStore.dispatch(
                                        new SearchCities({
                                            query: this.cityInput.value,
                                        })
                                    );
                                }
                            })
                    );
                } else {
                    this.cityStore.dispatch(new ClearSelectedCity());
                }
            });
    }

    onOptionSelected(event: MatAutocompleteSelectedEvent) {
        if (event.option.value && event.option.value.id) {
            this.cityStore.dispatch(
                new SelectCity({ cityId: event.option.value.id })
            );
            this.cityInput.setValue(event.option.value.name);
        } else {
            this.cityStore.dispatch(new ClearSelectedCity());
        }
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}
