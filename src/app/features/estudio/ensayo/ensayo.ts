import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, afterNextRender, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, ResultadoRespuesta, Siguiente } from '../../../core/api.service';
import { Opcion } from '../../../core/models/estimulo';
import { SesionService } from '../../../core/sesion.service';
import { formatearDuracion } from '../../../core/tiempo';

const BLOQUEO_MIN_MS = 800;
@Component({
  selector: 'app-ensayo',
  imports: [],
  templateUrl: './ensayo.html',
  styleUrl: './ensayo.css',
})
export class Ensayo implements OnDestroy {
  private router = inject(Router);
  private api = inject(ApiService);
  private sesion = inject(SesionService);
  private sesionId = '';
  private inicio = 0;
  private inicioCronometro: number | null = null;
  private intervalo: ReturnType<typeof setInterval> | null = null;
  feedback = signal<ResultadoRespuesta | null>(null);
  transicion = signal<'intervencion' | 'post' | null>(null);
  cronometro = signal('');

  ensayo = signal<Siguiente | null>(null);
  listo = signal(false);
  error = signal(false);

  constructor() {
    afterNextRender(() => this.iniciar());
  }

  private async iniciar() {
    const id = this.sesion.sesionId;
    if (!id) {
      this.router.navigateByUrl('/estudio');
      return;
    }
    this.sesionId = id;
    await this.cargarSiguiente();
  }

  async reintentar() {
    this.error.set(false);
    await this.cargarSiguiente();
  }

  private async cargarSiguiente() {
    this.listo.set(false);
    this.error.set(false);

    try {
      const res = await this.api.siguiente(this.sesionId);
      if (res.fin) {
        this.sesion.guardarDuracion(res.duracionMs);
        this.router.navigateByUrl('/estudio/fin');
        return;
      }
      if (res.iniciadaEn) this.iniciarCronometro(res.iniciadaEn);
      this.ensayo.set(res);
      // El cronómetro arranca cuando el estímulo ya está pintado
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          this.inicio = performance.now();
          setTimeout(() => this.listo.set(true), BLOQUEO_MIN_MS);
        }),
      );
    } catch (error) {
      this.recuperarSesion(error);
    }
  }

  private recuperarSesion(error: unknown) {
    if (error instanceof HttpErrorResponse && error.status === 404) {
      this.sesion.limpiar();
      this.router.navigateByUrl('/estudio');
      return;
    }
    this.error.set(true);
  }

  async responder(opcion: Opcion) {
    if (!this.listo()) return;
    const latenciaMs = Math.round(performance.now() - this.inicio);
    this.listo.set(false);

    try {
      const res = await this.api.responder(this.ensayo()!.ensayoId!, opcion, latenciaMs);
      if (res.feedback) this.feedback.set(res);
      else await this.avanzar(res);
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 409) {
        await this.cargarSiguiente();
        return;
      }
      this.recuperarSesion(error);
    }
  }

  // Botón "Siguiente" de la retroalimentación
  async continuar() {
    const res = this.feedback()!;
    this.feedback.set(null);
    await this.avanzar(res);
  }

  // Botón "Continuar" del aviso de cambio de fase
  async seguir() {
    this.transicion.set(null);
    await this.cargar();
  }

  private async avanzar(res: ResultadoRespuesta) {
    if (res.cambioFase) this.transicion.set(res.cambioFase);
    else await this.cargar();
  }

  private async cargar() {
    try {
      await this.cargarSiguiente();
    } catch {
      this.error.set(true);
    }
  }

  private iniciarCronometro(iniciadaEn: string) {
    const inicio = new Date(iniciadaEn).getTime();
    if (!Number.isFinite(inicio)) return;

    this.inicioCronometro = inicio;
    this.actualizarCronometro();
    if (this.intervalo === null) {
      this.intervalo = setInterval(() => this.actualizarCronometro(), 1000);
    }
  }

  private actualizarCronometro() {
    if (this.inicioCronometro === null) return;
    const transcurrido = Math.max(0, Date.now() - this.inicioCronometro);
    this.cronometro.set(formatearDuracion(transcurrido));
  }

  ngOnDestroy() {
    if (this.intervalo !== null) clearInterval(this.intervalo);
  }
}
