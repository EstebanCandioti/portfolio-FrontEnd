import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabilidadesFuertesComponent } from './habilidades-fuertes.component';

describe('HabilidadesFuertesComponent', () => {
  let component: HabilidadesFuertesComponent;
  let fixture: ComponentFixture<HabilidadesFuertesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HabilidadesFuertesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HabilidadesFuertesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
