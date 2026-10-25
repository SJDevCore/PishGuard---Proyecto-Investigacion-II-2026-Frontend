import { formatearDuracion } from './tiempo';

describe('formatearDuracion', () => {
  it('formatea minutos y segundos', () => {
    expect(formatearDuracion(0)).toBe('00:00');
    expect(formatearDuracion(65_000)).toBe('01:05');
  });

  it('incluye horas cuando corresponde', () => {
    expect(formatearDuracion(3_661_000)).toBe('1:01:01');
  });

  it('devuelve un guion para valores no disponibles', () => {
    expect(formatearDuracion(null)).toBe('—');
    expect(formatearDuracion(undefined)).toBe('—');
  });
});
