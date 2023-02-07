import { environment } from './../environments/environment';
import { AppEffects } from './effects/app.effects';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CityselectorComponent } from './components/city-selector/city-selector.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { MomentModule } from 'ngx-moment';
import { MomentPipe } from './pipes/moment.pipe';
import { CitiesPageComponent } from './components/cities-page/cities-page.component';
import { FavoritesPageComponent } from './components/favorites-page/favorites-page.component';
import { UnitsSelectorComponent } from './components/units-selector/units-selector.component';
import { ImpirialPipe } from './pipes/impirial.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CityselectorComponent,
    WeatherCardComponent,
    MomentPipe,
    CitiesPageComponent,
    FavoritesPageComponent,
    UnitsSelectorComponent,
    ImpirialPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatInputModule,
    MatMenuModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MomentModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
