# Evidencias de prueba - Frontend

Fecha de ejecución: 25 de octubre de 2026.

## Entorno

- macOS.
- Node.js v24.22.1.
- Angular 22.
- Vitest 4.1.11.

## Pruebas unitarias

Comando:

```bash
npm test -- --watch=false
```

Resultado:

```text
Test Files  12 passed (12)
     Tests  19 passed (19)
```

Salida completa: [`evidencias/2026-10-25-test-unitarios.txt`](evidencias/2026-10-25-test-unitarios.txt).

Las pruebas incluyen la validación del formulario de perfil: no permite continuar hasta que estén diligenciadas `capacitacionPrevia`, `frecuenciaUso` y `autoeficacia`, además de programa, semestre y área. También cubren el formato del cronómetro y la persistencia de la duración de la sesión.

## Compilación

Comando:

```bash
npm run build
```

Resultado:

```text
Application bundle generation complete.
Initial total: 382.36 kB
Output location: dist/PishGuard
```

La compilación finaliza correctamente. Se mantiene una advertencia no bloqueante porque `home-page.css` supera el presupuesto de 4 kB por componente.

Salida completa: [`evidencias/2026-10-25-build.txt`](evidencias/2026-10-25-build.txt).

## Verificación del formulario

Se abrió el formulario en el navegador y se diligenciaron las seis preguntas:

- Programa: Ingeniería de Sistemas.
- Semestre: 5.
- Área de sistemas o tecnología: Sí.
- Capacitación previa: formación formal.
- Frecuencia de uso: todos los días.
- Autoeficacia: 4 de 5.

La verificación confirmó que el botón `Continuar` se habilita únicamente cuando el formulario está completo.

Captura: [`evidencias/2026-10-25-formulario-datos.png`](evidencias/2026-10-25-formulario-datos.png).

## Verificación del cronómetro

- La utilidad `formatearDuracion` convierte milisegundos a `mm:ss` y `h:mm:ss`; sus casos están cubiertos por pruebas unitarias.
- `SesionService` conserva la duración total y la limpia al terminar la sesión; ambos comportamientos están cubiertos por pruebas unitarias.
- La prueba de integración del backend completa una sesión real y verifica `iniciada_en`, `finalizada_en`, la duración total y su aparición en el CSV.
- La captura de navegador confirma que el cronómetro se muestra durante el ensayo con el texto “Tiempo transcurrido”.

Captura: [`evidencias/2026-10-25-cronometro.png`](evidencias/2026-10-25-cronometro.png).

## Archivos de evidencia

| Archivo | Contenido |
| --- | --- |
| [`evidencias/2026-10-25-test-unitarios.txt`](evidencias/2026-10-25-test-unitarios.txt) | Salida de las pruebas unitarias. |
| [`evidencias/2026-10-25-build.txt`](evidencias/2026-10-25-build.txt) | Salida de la compilación de producción. |
| [`evidencias/2026-10-25-formulario-datos.png`](evidencias/2026-10-25-formulario-datos.png) | Captura del formulario con las seis preguntas diligenciadas. |
| [`evidencias/2026-10-25-cronometro.png`](evidencias/2026-10-25-cronometro.png) | Captura del cronómetro visible durante un ensayo. |
