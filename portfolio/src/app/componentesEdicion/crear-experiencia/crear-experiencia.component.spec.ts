import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearExperienciaComponent } from './crear-experiencia.component';

describe('CrearExperienciaComponent', () => {
  let component: CrearExperienciaComponent;
  let fixture: ComponentFixture<CrearExperienciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearExperienciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearExperienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
