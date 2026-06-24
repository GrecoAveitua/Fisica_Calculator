/**
 * Trabajo, energia y potencia (Fisica II).
 *
 * Funciones puras extraidas de physics-simulator.js (calcularTrabajo,
 * calcularEnergiaCinetica, calcularYAnimarEP, calcularYAnimarPot,
 * calcularYAnimarTrabajoNeto).
 */

import { GRAVITY } from "./constants";

/**
 * Trabajo de una fuerza:  W = F * d * cos(theta)
 * El angulo va en RADIANES (usa degToRad para convertir desde grados).
 *
 * @param force    fuerza aplicada (N)
 * @param distance distancia recorrida (m)
 * @param angleRad angulo entre la fuerza y el desplazamiento (radianes)
 * @returns trabajo (J)
 */
export function work(force: number, distance: number, angleRad: number): number {
  return force * distance * Math.cos(angleRad);
}

/**
 * Energia cinetica (energia del movimiento):  Ec = 1/2 * m * v^2
 *
 * @param mass     masa (kg)
 * @param velocity velocidad (m/s)
 * @returns energia cinetica (J)
 */
export function kineticEnergy(mass: number, velocity: number): number {
  return 0.5 * mass * velocity * velocity;
}

/**
 * Energia potencial gravitatoria (energia por la altura):  Ep = m * g * h
 *
 * @param mass   masa (kg)
 * @param height altura (m)
 * @param g      gravedad (m/s^2), por defecto 9.81
 * @returns energia potencial (J)
 */
export function potentialEnergy(
  mass: number,
  height: number,
  g: number = GRAVITY,
): number {
  return mass * g * height;
}

/**
 * Potencia (trabajo por unidad de tiempo):  P = W / t
 *
 * @param workValue trabajo realizado (J)
 * @param time      tiempo empleado (s)
 * @returns potencia (W)
 */
export function power(workValue: number, time: number): number {
  return workValue / time;
}

/**
 * Trabajo neto segun el teorema trabajo-energia:
 *   W_neto = 1/2 * m * (vf^2 - vi^2)
 * Es la energia cinetica ganada o perdida al cambiar de velocidad.
 *
 * @param mass           masa (kg)
 * @param initialVelocity velocidad inicial vi (m/s)
 * @param finalVelocity   velocidad final vf (m/s)
 * @returns trabajo neto (J)
 */
export function netWork(
  mass: number,
  initialVelocity: number,
  finalVelocity: number,
): number {
  return 0.5 * mass * (finalVelocity * finalVelocity - initialVelocity * initialVelocity);
}
