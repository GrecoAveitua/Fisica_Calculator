/**
 * Impetu / momento lineal (Fisica II).
 *
 * El impetu (p) mide "la cantidad de movimiento" de un objeto:
 *   p = m * v        (unidades: kg·m/s)
 *
 * Funciones puras extraidas de physics-simulator.js
 * (calcularImpetu, calcularVelocidadDesdeImpetu, calcularMasaDesdeImpetu).
 */

/**
 * Impetu a partir de la masa y la velocidad:  p = m * v
 *
 * @param mass     masa del objeto (kg)
 * @param velocity velocidad (m/s)
 * @returns impetu (kg·m/s)
 */
export function momentum(mass: number, velocity: number): number {
  return mass * velocity;
}

/**
 * Velocidad a partir del impetu:  v = p / m
 *
 * @param p    impetu (kg·m/s)
 * @param mass masa (kg)
 * @returns velocidad (m/s)
 */
export function velocityFromMomentum(p: number, mass: number): number {
  return p / mass;
}

/**
 * Masa a partir del impetu:  m = p / v
 *
 * @param p        impetu (kg·m/s)
 * @param velocity velocidad (m/s)
 * @returns masa (kg)
 */
export function massFromMomentum(p: number, velocity: number): number {
  return p / velocity;
}
