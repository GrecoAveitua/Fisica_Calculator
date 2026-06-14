/**
 * Pequenas utilidades matematicas.
 * El motor trabaja internamente en RADIANES (como Math.sin/cos de JS);
 * la interfaz convierte desde/hacia grados con estas funciones.
 */

/** Convierte un angulo de grados a radianes. */
export function degToRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/** Convierte un angulo de radianes a grados. */
export function radToDeg(radians: number): number {
  return radians * (180 / Math.PI);
}
