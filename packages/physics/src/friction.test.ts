import { describe, it, expect } from "vitest";
import {
  frictionForce,
  massFromFriction,
  frictionCoefficient,
  inclineAcceleration,
  angleFromFriction,
} from "./friction";
import { degToRad } from "./math";

/**
 * Pruebas del modulo de friccion.
 *
 * describe(...) agrupa pruebas relacionadas.
 * it(...)       describe UN caso concreto ("deberia hacer X").
 * expect(...)   compara el resultado real contra el esperado.
 *
 * Para numeros con decimales usamos toBeCloseTo (evita problemas por los
 * redondeos de la computadora, ej. 0.1 + 0.2 != 0.3 exacto).
 */

describe("friction - plano horizontal", () => {
  it("calcula la fuerza de friccion: F = mu * m * g", () => {
    // 0.3 * 2 * 9.81 = 5.886
    expect(frictionForce(2, 0.3)).toBeCloseTo(5.886, 3);
  });

  it("calcula la masa a partir de la friccion: m = F / (mu * g)", () => {
    expect(massFromFriction(5.886, 0.3)).toBeCloseTo(2, 3);
  });

  it("calcula el coeficiente: mu = F / (m * g)", () => {
    expect(frictionCoefficient(5.886, 2)).toBeCloseTo(0.3, 3);
  });

  it("ida y vuelta: calcular la fuerza y recuperar la masa da lo mismo", () => {
    const f = frictionForce(5, 0.4);
    expect(massFromFriction(f, 0.4)).toBeCloseTo(5, 6);
  });
});

describe("friction - plano inclinado", () => {
  it("calcula la aceleracion: a = g * (sen - mu * cos)", () => {
    // 30 grados, mu = 0.2  ->  9.81 * (0.5 - 0.2 * 0.86602) = 3.2058...
    expect(inclineAcceleration(degToRad(30), 0.2)).toBeCloseTo(3.2058, 3);
  });

  it("recupera el angulo a partir de la friccion", () => {
    // angulo conocido de 30 grados
    const mass = 4;
    const mu = 0.5;
    const g = 9.81;
    const friction = mu * mass * g * Math.cos(degToRad(30));
    const anguloRad = angleFromFriction(friction, mass, mu);
    expect(anguloRad).toBeCloseTo(degToRad(30), 6);
  });

  it("lanza error cuando no hay solucion real para el angulo", () => {
    // friccion absurdamente grande -> cos(theta) > 1 -> sin solucion
    expect(() => angleFromFriction(1000, 1, 0.1)).toThrow();
  });
});
