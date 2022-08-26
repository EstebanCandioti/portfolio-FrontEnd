import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemHabilidadDebilComponent } from './item-habilidad-debil.component';

describe('ItemHabilidadDebilComponent', () => {
  let component: ItemHabilidadDebilComponent;
  let fixture: ComponentFixture<ItemHabilidadDebilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemHabilidadDebilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemHabilidadDebilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
