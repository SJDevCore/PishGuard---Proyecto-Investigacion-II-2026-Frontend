import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SesionService } from '../../../core/sesion.service';
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-consentimiento',
  imports: [],
  templateUrl: './consentimiento.html',
  styleUrl: './consentimiento.css',
})
export class Consentimiento {
  private router = inject(Router);
  private sesion = inject(SesionService);
  private api = inject(ApiService);

  acepta = signal(false);
  servidor = signal<'conectando' | 'listo' | 'error'>('conectando');

  constructor() {
    this.despertarServidor();
  }

  // Despierta el backend mientras el participante lee; reintenta hasta ~90 s
  private async despertarServidor() {
    this.servidor.set('conectando');
    const limite = Date.now() + 120_000;
    while (Date.now() < limite) {
      try {
        await this.api.despertar();
        this.servidor.set('listo');
        return;
      } catch {
        await new Promise((r) => setTimeout(r, 3000));
      }
    }
    this.servidor.set('error');
  }

  reintentar() {
    this.despertarServidor();
  }

  marcar(evento: Event) {
    this.acepta.set((evento.target as HTMLInputElement).checked);
  }

  continuar() {
    this.sesion.aceptarConsentimiento();
    this.router.navigateByUrl('/estudio/datos');
  }
}
