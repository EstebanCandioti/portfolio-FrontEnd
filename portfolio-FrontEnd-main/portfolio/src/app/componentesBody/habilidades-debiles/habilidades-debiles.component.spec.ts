import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabilidadesDebilesComponent } from './habilidades-debiles.component';

describe('HabilidadesDebilesComponent', () => {
  let component: HabilidadesDebilesComponent;
  let fixture: ComponentFixture<HabilidadesDebilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HabilidadesDebilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HabilidadesDebilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
