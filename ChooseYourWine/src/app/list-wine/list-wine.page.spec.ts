import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWinePage } from './list-wine.page';

describe('ListWinePage', () => {
  let component: ListWinePage;
  let fixture: ComponentFixture<ListWinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListWinePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
