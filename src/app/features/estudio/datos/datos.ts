import { Component, afterNextRender, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ApiService,
  CapacitacionPrevia,
  FrecuenciaUso,
} from '../../../core/api.service';
import { SesionService } from '../../../core/sesion.service';

@Component({
  selector: 'app-datos',
  imports: [FormsModule],
  templateUrl: './datos.html',
  styleUrl: './datos.css',
})
export class Datos {
  private router = inject(Router);
  private api = inject(ApiService);
  private sesion = inject(SesionService);

  programas = [
    'Ingeniería de Sistemas',
    'Ingeniería Electromecánica',
    'Ingeniería Mecatrónica',
    'Otro',
  ];
  capacitaciones = [
    { valor: 'formal', texto: 'Sí, formación formal' },
    { valor: 'informal', texto: 'Sí, formación informal' },
    { valor: 'no', texto: 'No' },
  ] as const;
  frecuencias = [
    { valor: 'diaria', texto: 'Todos los días' },
    { valor: 'varias_semana', texto: 'Varias veces por semana' },
    { valor: 'semanal', texto: 'Una vez por semana' },
    { valor: 'mensual', texto: 'Una vez al mes' },
    { valor: 'nunca', texto: 'Casi nunca o nunca' },
  ] as const;

  programa = '';
  semestre: number | null = null;
  area: boolean | null = null;
  capacitacion: CapacitacionPrevia | '' = '';
  frecuencia: FrecuenciaUso | '' = '';
  autoeficacia: number | null = null;

  enviando = signal(false);
  error = signal(false);

  constructor() {
    afterNextRender(() => {
      if (this.sesion.sesionId) this.router.navigateByUrl('/estudio/ensayo');
      else if (!this.sesion.consentimiento) this.router.navigateByUrl('/estudio');
    });
  }

  get valido() {
    return (
      this.programa !== '' &&
      this.semestre !== null &&
      this.semestre >= 1 &&
      this.semestre <= 12 &&
      this.area !== null &&
      this.capacitacion !== '' &&
      this.frecuencia !== '' &&
      this.autoeficacia !== null &&
      this.autoeficacia >= 1 &&
      this.autoeficacia <= 5
    );
  }

  async enviar() {
    if (!this.valido || this.enviando()) return;
    this.enviando.set(true);
    this.error.set(false);
    try {
      const { sesionId } = await this.api.crearSesion({
        programa: this.programa,
        semestre: this.semestre!,
        areaTecnologica: this.area!,
        capacitacionPrevia: this.capacitacion as CapacitacionPrevia,
        frecuenciaUso: this.frecuencia as FrecuenciaUso,
        autoeficacia: this.autoeficacia!,
        consentimiento: true,
        clientSessionId: this.sesion.claveIdempotencia,
      });
      this.sesion.activarSesion(sesionId);
      this.router.navigateByUrl('/estudio/instrucciones');
    } catch {
      this.error.set(true);
      this.enviando.set(false);
    }
  }
}
