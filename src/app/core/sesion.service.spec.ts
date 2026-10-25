import { TestBed } from '@angular/core/testing';
import { SesionService } from './sesion.service';

describe('SesionService', () => {
  let service: SesionService;

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(SesionService);
  });

  it('reutiliza la clave de idempotencia durante los reintentos', () => {
    const primera = service.claveIdempotencia;
    const segunda = service.claveIdempotencia;

    expect(primera).toBe(segunda);
  });

  it('activa la sesión y elimina la clave pendiente', () => {
    const id = '0f8fad5b-d9cb-469f-a165-70867728950e';
    service.claveIdempotencia;

    service.activarSesion(id);

    expect(service.sesionId).toBe(id);
    expect(sessionStorage.getItem('sesionPendienteId')).toBeNull();
  });

  it('guarda la duración para mostrarla al finalizar', () => {
    service.guardarDuracion(65_000);

    expect(service.duracionMs).toBe(65_000);
  });

  it('limpia la sesión y la duración al finalizar el estudio', () => {
    service.aceptarConsentimiento();
    service.activarSesion('0f8fad5b-d9cb-469f-a165-70867728950e');
    service.guardarDuracion(65_000);

    service.limpiar();

    expect(service.sesionId).toBeNull();
    expect(service.consentimiento).toBe(false);
    expect(service.duracionMs).toBeNull();
    expect(sessionStorage.getItem('sesionPendienteId')).toBeNull();
  });
});
