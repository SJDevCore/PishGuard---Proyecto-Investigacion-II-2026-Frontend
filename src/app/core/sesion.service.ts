import { Injectable } from '@angular/core';

const SESION_KEY = 'sesionId';
const PENDIENTE_KEY = 'sesionPendienteId';
const CONSENTIMIENTO_KEY = 'consentimiento';
const DURACION_KEY = 'duracionSesionMs';

@Injectable({ providedIn: 'root' })
export class SesionService {
  get sesionId(): string | null {
    return sessionStorage.getItem(SESION_KEY);
  }

  get consentimiento(): boolean {
    return sessionStorage.getItem(CONSENTIMIENTO_KEY) === '1';
  }

  get duracionMs(): number | null {
    const valor = sessionStorage.getItem(DURACION_KEY);
    if (valor === null) return null;
    const numero = Number(valor);
    return Number.isFinite(numero) ? numero : null;
  }

  get claveIdempotencia(): string {
    const guardada = sessionStorage.getItem(PENDIENTE_KEY);
    if (guardada) return guardada;

    const nueva = this.generarUuid();
    sessionStorage.setItem(PENDIENTE_KEY, nueva);
    return nueva;
  }

  aceptarConsentimiento(): void {
    sessionStorage.setItem(CONSENTIMIENTO_KEY, '1');
  }

  activarSesion(id: string): void {
    sessionStorage.setItem(SESION_KEY, id);
    sessionStorage.removeItem(PENDIENTE_KEY);
  }

  guardarDuracion(ms: number | null | undefined): void {
    if (ms === null || ms === undefined || !Number.isFinite(ms)) return;
    sessionStorage.setItem(DURACION_KEY, String(Math.max(0, Math.round(ms))));
  }

  limpiar(): void {
    sessionStorage.removeItem(SESION_KEY);
    sessionStorage.removeItem(PENDIENTE_KEY);
    sessionStorage.removeItem(CONSENTIMIENTO_KEY);
    sessionStorage.removeItem(DURACION_KEY);
  }

  private generarUuid(): string {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (caracter) => {
      const aleatorio = Math.floor(Math.random() * 16);
      const valor = caracter === 'x' ? aleatorio : (aleatorio & 0x3) | 0x8;
      return valor.toString(16);
    });
  }
}
