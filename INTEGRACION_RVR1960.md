# Integración Reina-Valera 1960

Se agregó la versión **Reina-Valera 1960 (RVR60)** a `public/data/biblia/rvr1960/`.

## Contenido integrado
- 39 libros del Antiguo Testamento
- 929 capítulos
- Archivos JSON locales
- Selector de versión actualizado en `src/pages/Biblia.jsx`
- Génesis normalizado al formato de nombres que utiliza la aplicación
- `manifest.json` con el alcance de los datos

## Importante
El archivo fuente proporcionado para esta integración contiene 929 capítulos, correspondientes al Antiguo Testamento. No contiene los 260 capítulos del Nuevo Testamento, por lo que la integración RVR60 actual se limita al AT.

No se modificaron las demás versiones ni las funciones de lectura, favoritos, copia, compartir, audio y proyección.

## Instalación
Desde la carpeta del proyecto:

```bash
npm install
npm run dev
```

Para producción:

```bash
npm run build
```
