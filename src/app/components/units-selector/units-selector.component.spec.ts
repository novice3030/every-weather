import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UnitsSelectorComponent } from './units-selector.component';

describe('UnitsSelectorComponent', () => {
    let component: UnitsSelectorComponent;
    let fixture: ComponentFixture<UnitsSelectorComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [UnitsSelectorComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(UnitsSelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
