import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearHabilidadDebilComponent } from './crear-habilidad-debil.component';

describe('CrearHabilidadDebilComponent', () => {
  let component: CrearHabilidadDebilComponent;
  let fixture: ComponentFixture<CrearHabilidadDebilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearHabilidadDebilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearHabilidadDebilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
