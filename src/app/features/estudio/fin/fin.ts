import { Component, afterNextRender, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SesionService } from '../../../core/sesion.service';
import { formatearDuracion } from '../../../core/tiempo';

@Component({
  selector: 'app-fin',
  imports: [RouterLink],
  templateUrl: './fin.html',
  styleUrl: './fin.css',
})
export class Fin {
  private sesion = inject(SesionService);
  duracion = signal<number | null>(null);
  tiempoTotal = computed(() => formatearDuracion(this.duracion()));

  constructor() {
    afterNextRender(() => {
      this.duracion.set(this.sesion.duracionMs);
      this.sesion.limpiar();
    });
  }
}
