import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SesionService } from '../../../core/sesion.service';

@Component({
  selector: 'app-consentimiento',
  imports: [],
  templateUrl: './consentimiento.html',
  styleUrl: './consentimiento.css',
})
export class Consentimiento {
  private router = inject(Router);
  private sesion = inject(SesionService);
  acepta = signal(false);

  marcar(evento: Event) {
    this.acepta.set((evento.target as HTMLInputElement).checked);
  }

  continuar() {
    this.sesion.aceptarConsentimiento();
    this.router.navigateByUrl('/estudio/datos');
  }
}
