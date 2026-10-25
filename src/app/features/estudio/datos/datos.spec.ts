import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Datos } from './datos';

describe('Datos', () => {
  let component: Datos;
  let fixture: ComponentFixture<Datos>;

  beforeEach(async () => {
    sessionStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Datos],
      providers: [{ provide: Router, useValue: { navigateByUrl: vi.fn() } }],
    }).compileComponents();

    fixture = TestBed.createComponent(Datos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('exige las tres variables intervinientes para continuar', () => {
    component.programa = 'Ingeniería de Sistemas';
    component.semestre = 5;
    component.area = true;
    expect(component.valido).toBe(false);

    component.capacitacion = 'formal';
    component.frecuencia = 'diaria';
    component.autoeficacia = 4;
    expect(component.valido).toBe(true);
  });
});
