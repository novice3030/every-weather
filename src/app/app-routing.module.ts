import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CitiesPageComponent } from './components/cities-page/cities-page.component';
import { FavoritesPageComponent } from './components/favorites-page/favorites-page.component';

const routes: Routes = [
  { path: '', component: CitiesPageComponent },
  { path: 'favorites', component: FavoritesPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
