import { describe, it, expect } from "vitest";
import { work, kineticEnergy, potentialEnergy, power, netWork } from "./energy";
import { degToRad } from "./math";

describe("energy - trabajo", () => {
  it("trabajo con angulo 0: W = F * d (cos 0 = 1)", () => {
    expect(work(10, 2, 0)).toBeCloseTo(20, 6);
  });

  it("trabajo con angulo de 60 grados: cos 60 = 0.5", () => {
    expect(work(10, 2, degToRad(60))).toBeCloseTo(10, 6);
  });
});

describe("energy - energias", () => {
  it("energia cinetica: Ec = 1/2 * m * v^2", () => {
    expect(kineticEnergy(2, 3)).toBeCloseTo(9, 6);
  });

  it("energia potencial: Ep = m * g * h", () => {
    expect(potentialEnergy(2, 5)).toBeCloseTo(98.1, 6);
  });
});

describe("energy - potencia y trabajo neto", () => {
  it("potencia: P = W / t", () => {
    expect(power(100, 4)).toBeCloseTo(25, 6);
  });

  it("trabajo neto al acelerar desde el reposo: W_neto = 1/2 * m * vf^2", () => {
    expect(netWork(2, 0, 3)).toBeCloseTo(9, 6);
  });

  it("teorema trabajo-energia: el trabajo neto desde 0 iguala la energia cinetica final", () => {
    // arrancar desde el reposo hasta v debe costar exactamente Ec(m, v)
    expect(netWork(2, 0, 5)).toBeCloseTo(kineticEnergy(2, 5), 6);
  });
});
