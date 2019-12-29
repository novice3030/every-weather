import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityselectorComponent } from './city-selector.component';

describe('CountrySelectorComponent', () => {
  let component: CityselectorComponent;
  let fixture: ComponentFixture<CityselectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityselectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityselectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
