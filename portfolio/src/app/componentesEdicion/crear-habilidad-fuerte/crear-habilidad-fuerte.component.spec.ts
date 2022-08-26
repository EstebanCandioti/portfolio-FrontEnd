import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearHabilidadFuerteComponent } from './crear-habilidad-fuerte.component';

describe('CrearHabilidadFuerteComponent', () => {
  let component: CrearHabilidadFuerteComponent;
  let fixture: ComponentFixture<CrearHabilidadFuerteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearHabilidadFuerteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearHabilidadFuerteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
