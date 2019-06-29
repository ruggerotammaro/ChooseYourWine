import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodPairingsPage } from './food-pairings.page';

describe('FoodPairingsPage', () => {
  let component: FoodPairingsPage;
  let fixture: ComponentFixture<FoodPairingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodPairingsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodPairingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
