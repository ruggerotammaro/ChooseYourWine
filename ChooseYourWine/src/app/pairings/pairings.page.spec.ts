import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PairingsPage } from './pairings.page';

describe('PairingsPage', () => {
  let component: PairingsPage;
  let fixture: ComponentFixture<PairingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PairingsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PairingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
