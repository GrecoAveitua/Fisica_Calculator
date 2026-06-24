/**
 * MCU - Movimiento Circular Uniforme (Fisica II).
 *
 * Un objeto que gira en circulo a rapidez constante. Cada funcion representa
 * UNA relacion fundamental; la interfaz las combina segun lo que el usuario
 * quiera calcular.
 *
 * Logica extraida de physics-simulator.js (calcularMCU, calcularRadioMCU,
 * calcularMasaMCU, calcularVelocidadTangencialMCU, calcularPeriodo,
 * calcularFrecuenciaMCU).
 */

/**
 * Periodo: tiempo que tarda en dar una vuelta completa.  T = t / n
 *
 * @param time  tiempo total (s)
 * @param turns numero de vueltas (n)
 * @returns periodo (s)
 */
export function period(time: number, turns: number): number {
  return time / turns;
}

/**
 * Frecuencia: vueltas por segundo.  f = 1 / T
 *
 * @param period periodo (s)
 * @returns frecuencia (Hz)
 */
export function frequency(period: number): number {
  return 1 / period;
}

/**
 * Velocidad angular: cuanto angulo barre por segundo.  omega = 2*PI / T
 *
 * @param period periodo (s)
 * @returns velocidad angular (rad/s)
 */
export function angularVelocity(period: number): number {
  return (2 * Math.PI) / period;
}

/**
 * Velocidad tangencial: rapidez lineal sobre la circunferencia.  v = omega * r
 *
 * @param angularVel velocidad angular (rad/s)
 * @param radius     radio de la trayectoria (m)
 * @returns velocidad tangencial (m/s)
 */
export function tangentialVelocity(angularVel: number, radius: number): number {
  return angularVel * radius;
}

/**
 * Longitud de la trayectoria recorrida en n vueltas.  d = 2*PI*r*n
 *
 * @param radius radio (m)
 * @param turns  numero de vueltas (n)
 * @returns distancia recorrida (m)
 */
export function pathLength(radius: number, turns: number): number {
  return 2 * Math.PI * radius * turns;
}

/**
 * Aceleracion centripeta: apunta hacia el centro.  a = v^2 / r
 *
 * @param tangentialVel velocidad tangencial (m/s)
 * @param radius        radio (m)
 * @returns aceleracion centripeta (m/s^2)
 */
export function centripetalAcceleration(tangentialVel: number, radius: number): number {
  return (tangentialVel * tangentialVel) / radius;
}

/**
 * Fuerza centripeta: la fuerza que mantiene al objeto en el circulo.
 *   F = m * v^2 / r
 *
 * @param mass          masa (kg)
 * @param tangentialVel velocidad tangencial (m/s)
 * @param radius        radio (m)
 * @returns fuerza centripeta (N)
 */
export function centripetalForce(
  mass: number,
  tangentialVel: number,
  radius: number,
): number {
  return (mass * tangentialVel * tangentialVel) / radius;
}

/**
 * Radio a partir de la fuerza centripeta:  r = m * v^2 / F
 *
 * @returns radio (m)
 */
export function radiusFromForce(
  mass: number,
  tangentialVel: number,
  force: number,
): number {
  return (mass * tangentialVel * tangentialVel) / force;
}

/**
 * Masa a partir de la fuerza centripeta:  m = F * r / v^2
 *
 * @returns masa (kg)
 */
export function massFromForce(
  force: number,
  radius: number,
  tangentialVel: number,
): number {
  return (force * radius) / (tangentialVel * tangentialVel);
}
