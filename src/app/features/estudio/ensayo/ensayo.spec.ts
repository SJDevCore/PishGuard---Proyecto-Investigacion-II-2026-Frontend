import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Ensayo } from './ensayo';

describe('Ensayo', () => {
  let component: Ensayo;
  let fixture: ComponentFixture<Ensayo>;

  beforeEach(async () => {
    sessionStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Ensayo],
      providers: [{ provide: Router, useValue: { navigateByUrl: vi.fn() } }],
    }).compileComponents();

    fixture = TestBed.createComponent(Ensayo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
