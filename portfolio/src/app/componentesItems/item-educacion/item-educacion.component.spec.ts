import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEducacionComponent } from './item-educacion.component';

describe('ItemEducacionComponent', () => {
  let component: ItemEducacionComponent;
  let fixture: ComponentFixture<ItemEducacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemEducacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemEducacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
