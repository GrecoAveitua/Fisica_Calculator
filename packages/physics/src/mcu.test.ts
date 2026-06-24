import { describe, it, expect } from "vitest";
import {
  period,
  frequency,
  angularVelocity,
  tangentialVelocity,
  pathLength,
  centripetalAcceleration,
  centripetalForce,
  radiusFromForce,
  massFromForce,
} from "./mcu";

/**
 * Escenario base usado en varias pruebas:
 *   radio r = 2 m, vueltas n = 4, tiempo t = 8 s, masa m = 3 kg
 * De ahi se derivan:
 *   T = 2 s, f = 0.5 Hz, omega = PI rad/s, v = 2*PI m/s
 */

describe("mcu - periodo, frecuencia y velocidad angular", () => {
  it("calcula el periodo: T = t / n", () => {
    expect(period(8, 4)).toBeCloseTo(2, 6);
  });

  it("calcula la frecuencia: f = 1 / T", () => {
    expect(frequency(2)).toBeCloseTo(0.5, 6);
  });

  it("calcula la velocidad angular: omega = 2*PI / T", () => {
    expect(angularVelocity(2)).toBeCloseTo(Math.PI, 6);
  });
});

describe("mcu - velocidades y trayectoria", () => {
  it("calcula la velocidad tangencial: v = omega * r", () => {
    expect(tangentialVelocity(Math.PI, 2)).toBeCloseTo(2 * Math.PI, 6);
  });

  it("la trayectoria coincide con velocidad tangencial * tiempo", () => {
    // d = 2*PI*r*n  y tambien  d = v * t  -> deben coincidir
    const d = pathLength(2, 4);
    const v = tangentialVelocity(Math.PI, 2);
    expect(d).toBeCloseTo(v * 8, 6);
  });
});

describe("mcu - dinamica (fuerza centripeta)", () => {
  const v = 2 * Math.PI; // velocidad tangencial del escenario base

  it("calcula la aceleracion centripeta: a = v^2 / r", () => {
    expect(centripetalAcceleration(v, 2)).toBeCloseTo((v * v) / 2, 6);
  });

  it("calcula la fuerza centripeta: F = m * v^2 / r", () => {
    expect(centripetalForce(3, v, 2)).toBeCloseTo((3 * v * v) / 2, 6);
  });

  it("ida y vuelta: de la fuerza recupera el radio original", () => {
    const f = centripetalForce(3, v, 2);
    expect(radiusFromForce(3, v, f)).toBeCloseTo(2, 6);
  });

  it("ida y vuelta: de la fuerza recupera la masa original", () => {
    const f = centripetalForce(3, v, 2);
    expect(massFromForce(f, 2, v)).toBeCloseTo(3, 6);
  });
});
