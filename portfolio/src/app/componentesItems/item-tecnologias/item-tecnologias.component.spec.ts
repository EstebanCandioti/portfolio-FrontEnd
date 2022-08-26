import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTecnologiasComponent } from './item-tecnologias.component';

describe('ItemTecnologiasComponent', () => {
  let component: ItemTecnologiasComponent;
  let fixture: ComponentFixture<ItemTecnologiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemTecnologiasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemTecnologiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
