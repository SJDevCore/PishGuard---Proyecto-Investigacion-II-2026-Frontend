import { Component, afterNextRender, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SesionService } from '../../../core/sesion.service';

@Component({
  selector: 'app-instrucciones',
  imports: [],
  templateUrl: './instrucciones.html',
  styleUrl: './instrucciones.css',
})
export class Instrucciones {
  private router = inject(Router);
  private sesion = inject(SesionService);
  practicado = signal(false);

  constructor() {
    afterNextRender(() => {
      if (!this.sesion.sesionId) this.router.navigateByUrl('/estudio');
    });
  }

  comenzar() {
    this.router.navigateByUrl('/estudio/ensayo');
  }
}
