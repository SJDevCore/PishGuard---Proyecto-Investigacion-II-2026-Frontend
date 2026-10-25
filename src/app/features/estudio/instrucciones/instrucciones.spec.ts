import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Instrucciones } from './instrucciones';

describe('Instrucciones', () => {
  let component: Instrucciones;
  let fixture: ComponentFixture<Instrucciones>;

  beforeEach(async () => {
    sessionStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Instrucciones],
      providers: [{ provide: Router, useValue: { navigateByUrl: vi.fn() } }],
    }).compileComponents();

    fixture = TestBed.createComponent(Instrucciones);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
