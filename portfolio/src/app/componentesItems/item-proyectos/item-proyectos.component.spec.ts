import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemProyectosComponent } from './item-proyectos.component';

describe('ItemProyectosComponent', () => {
  let component: ItemProyectosComponent;
  let fixture: ComponentFixture<ItemProyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemProyectosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
