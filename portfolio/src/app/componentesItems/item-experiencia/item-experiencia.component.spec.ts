import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemExperienciaComponent } from './item-experiencia.component';

describe('ItemExperienciaComponent', () => {
  let component: ItemExperienciaComponent;
  let fixture: ComponentFixture<ItemExperienciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemExperienciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemExperienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
