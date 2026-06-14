/**
 * Friccion (Fisica II).
 *
 * Funciones PURAS: reciben numeros y devuelven numeros. No saben nada de
 * pantallas, botones ni animaciones. Eso las hace faciles de probar y de
 * reutilizar (las puede usar tanto el frontend como el backend).
 *
 * Logica extraida de physics-simulator.js (calcularFriccionpn, calcularMasapni,
 * calcularCoeficientepni, calcularMasa, calcularCoeficiente, calcularAngulo...).
 */

import { GRAVITY } from "./constants";

// ---------------------------------------------------------------------------
// Plano horizontal
// ---------------------------------------------------------------------------

/**
 * Fuerza de friccion sobre una superficie horizontal:  F = mu * m * g
 * Sirve para la friccion cinetica y para la friccion estatica maxima.
 *
 * @param mass        masa del objeto (kg)
 * @param coefficient coeficiente de friccion (mu, adimensional)
 * @param g           gravedad (m/s^2), por defecto 9.81
 * @returns fuerza de friccion (N)
 */
export function frictionForce(
  mass: number,
  coefficient: number,
  g: number = GRAVITY,
): number {
  return coefficient * mass * g;
}

/**
 * Masa a partir de la fuerza de friccion:  m = F / (mu * g)
 *
 * @returns masa (kg)
 */
export function massFromFriction(
  friction: number,
  coefficient: number,
  g: number = GRAVITY,
): number {
  return friction / (coefficient * g);
}

/**
 * Coeficiente de friccion a partir de la fuerza:  mu = F / (m * g)
 *
 * @returns coeficiente de friccion (mu, adimensional)
 */
export function frictionCoefficient(
  friction: number,
  mass: number,
  g: number = GRAVITY,
): number {
  return friction / (mass * g);
}

// ---------------------------------------------------------------------------
// Plano inclinado (el angulo va en RADIANES; usa degToRad para convertir)
// ---------------------------------------------------------------------------

/**
 * Aceleracion de un bloque que desliza por un plano inclinado con friccion:
 *   a = g * (sen(theta) - mu * cos(theta))
 * Si el resultado es <= 0, la friccion impide el deslizamiento.
 *
 * @param angleRad    angulo del plano (radianes)
 * @param coefficient coeficiente de friccion (mu)
 * @returns aceleracion (m/s^2)
 */
export function inclineAcceleration(
  angleRad: number,
  coefficient: number,
  g: number = GRAVITY,
): number {
  return g * (Math.sin(angleRad) - coefficient * Math.cos(angleRad));
}

/**
 * Masa en un plano inclinado a partir de la fuerza de friccion:
 *   m = F / (mu * g * cos(theta))
 *
 * @returns masa (kg)
 */
export function massOnIncline(
  friction: number,
  angleRad: number,
  coefficient: number,
  g: number = GRAVITY,
): number {
  return friction / (coefficient * g * Math.cos(angleRad));
}

/**
 * Coeficiente de friccion en un plano inclinado:
 *   mu = F / (m * g * cos(theta))
 *
 * @returns coeficiente de friccion (mu)
 */
export function coefficientOnIncline(
  friction: number,
  mass: number,
  angleRad: number,
  g: number = GRAVITY,
): number {
  return friction / (mass * g * Math.cos(angleRad));
}

/**
 * Angulo del plano a partir de la fuerza de friccion:
 *   theta = arccos( F / (mu * m * g) )
 * Devuelve el angulo en RADIANES. Lanza un error si no existe solucion real
 * (cuando F / (mu * m * g) queda fuera del rango [0, 1]).
 *
 * @returns angulo (radianes)
 */
export function angleFromFriction(
  friction: number,
  mass: number,
  coefficient: number,
  g: number = GRAVITY,
): number {
  const cosTheta = friction / (coefficient * mass * g);
  if (cosTheta < 0 || cosTheta > 1) {
    throw new Error("No existe solucion real: cos(theta) debe estar entre 0 y 1.");
  }
  return Math.acos(cosTheta);
}
