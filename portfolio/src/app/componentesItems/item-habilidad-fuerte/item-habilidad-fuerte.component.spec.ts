import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemHabilidadFuerteComponent } from './item-habilidad-fuerte.component';

describe('ItemHabilidadFuerteComponent', () => {
  let component: ItemHabilidadFuerteComponent;
  let fixture: ComponentFixture<ItemHabilidadFuerteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemHabilidadFuerteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemHabilidadFuerteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
