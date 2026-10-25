import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Fin } from './fin';

describe('Fin', () => {
  let component: Fin;
  let fixture: ComponentFixture<Fin>;

  beforeEach(async () => {
    sessionStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Fin],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Fin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
