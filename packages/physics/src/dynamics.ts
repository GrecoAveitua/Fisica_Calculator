/**
 * Leyes de fuerza (Fisica II).
 *
 * Funciones puras extraidas de physics-simulator.js
 * (calcularFuerza, calcularYAnimarConstK).
 */

/**
 * Segunda ley de Newton:  F = m * a
 *
 * @param mass         masa (kg)
 * @param acceleration aceleracion (m/s^2)
 * @returns fuerza (N)
 */
export function force(mass: number, acceleration: number): number {
  return mass * acceleration;
}

/**
 * Ley de Hooke - constante elastica de un resorte:  k = F / x
 *
 * @param appliedForce fuerza aplicada al resorte (N)
 * @param deformation  deformacion / estiramiento del resorte (m), distinto de 0
 * @returns constante elastica k (N/m)
 */
export function springConstant(appliedForce: number, deformation: number): number {
  return appliedForce / deformation;
}
