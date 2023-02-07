import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Favorite } from './favorite.model';

export enum FavoriteActionTypes {
  LoadFavorites = '[Favorite] Load Favorites',
  AddFavorite = '[Favorite] Add Favorite',
  UpsertFavorite = '[Favorite] Upsert Favorite',
  AddFavorites = '[Favorite] Add Favorites',
  UpsertFavorites = '[Favorite] Upsert Favorites',
  UpdateFavorite = '[Favorite] Update Favorite',
  UpdateFavorites = '[Favorite] Update Favorites',
  DeleteFavorite = '[Favorite] Delete Favorite',
  DeleteFavorites = '[Favorite] Delete Favorites',
  ClearFavorites = '[Favorite] Clear Favorites',
  SaveFavoritesToLocalStorage = '[Favorite] Save Favorites To Local Storage',
  LoadFavoritesFromLocalStorage = '[Favorite] Load Favorites From Local Storage',
  AddSelectedCityToFavorites = '[Favorite] Add Selected City To Favorites',
  RemoveSelectedCityFromFavorites = '[Favorite] Remove Selected City From Favorites',
  LoadFavoritesPage = '[Favorite] Load Favorites Page',
}

export class LoadFavorites implements Action {
  readonly type = FavoriteActionTypes.LoadFavorites;

  constructor(public payload: { favorites: Favorite[] }) {}
}

export class AddFavorite implements Action {
  readonly type = FavoriteActionTypes.AddFavorite;

  constructor(public payload: { favorite: Favorite }) {}
}

export class UpsertFavorite implements Action {
  readonly type = FavoriteActionTypes.UpsertFavorite;

  constructor(public payload: { favorite: Favorite }) {}
}

export class AddFavorites implements Action {
  readonly type = FavoriteActionTypes.AddFavorites;

  constructor(public payload: { favorites: Favorite[] }) {}
}

export class UpsertFavorites implements Action {
  readonly type = FavoriteActionTypes.UpsertFavorites;

  constructor(public payload: { favorites: Favorite[] }) {}
}

export class UpdateFavorite implements Action {
  readonly type = FavoriteActionTypes.UpdateFavorite;

  constructor(public payload: { favorite: Update<Favorite> }) {}
}

export class UpdateFavorites implements Action {
  readonly type = FavoriteActionTypes.UpdateFavorites;

  constructor(public payload: { favorites: Update<Favorite>[] }) {}
}

export class DeleteFavorite implements Action {
  readonly type = FavoriteActionTypes.DeleteFavorite;

  constructor(public payload: { id: string }) {}
}

export class DeleteFavorites implements Action {
  readonly type = FavoriteActionTypes.DeleteFavorites;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearFavorites implements Action {
  readonly type = FavoriteActionTypes.ClearFavorites;
}

export class SaveFavoritesToLocalStorage implements Action {
  readonly type = FavoriteActionTypes.SaveFavoritesToLocalStorage;
}

export class LoadFavoritesFromLocalStorage implements Action {
  readonly type = FavoriteActionTypes.LoadFavoritesFromLocalStorage;
}

export class AddSelectedCityToFavorites implements Action {
  readonly type = FavoriteActionTypes.AddSelectedCityToFavorites;
}

export class LoadFavoritesPage implements Action {
  readonly type = FavoriteActionTypes.LoadFavoritesPage;
}

export class RemoveSelectedCityFromFavorites implements Action {
  readonly type = FavoriteActionTypes.RemoveSelectedCityFromFavorites;
}

export type FavoriteActions =
  | LoadFavorites
  | AddFavorite
  | UpsertFavorite
  | AddFavorites
  | UpsertFavorites
  | UpdateFavorite
  | UpdateFavorites
  | DeleteFavorite
  | DeleteFavorites
  | ClearFavorites
  | SaveFavoritesToLocalStorage
  | LoadFavoritesFromLocalStorage
  | AddSelectedCityToFavorites
  | LoadFavoritesPage
  | RemoveSelectedCityFromFavorites;
