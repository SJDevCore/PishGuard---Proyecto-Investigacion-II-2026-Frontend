export function formatearDuracion(ms: number | null | undefined): string {
  if (ms === null || ms === undefined || !Number.isFinite(ms) || ms < 0) return '—';

  const totalSegundos = Math.floor(ms / 1000);
  const horas = Math.floor(totalSegundos / 3600);
  const minutos = Math.floor((totalSegundos % 3600) / 60);
  const segundos = totalSegundos % 60;
  const dosDigitos = (valor: number) => String(valor).padStart(2, '0');

  return horas > 0
    ? `${horas}:${dosDigitos(minutos)}:${dosDigitos(segundos)}`
    : `${dosDigitos(minutos)}:${dosDigitos(segundos)}`;
}
