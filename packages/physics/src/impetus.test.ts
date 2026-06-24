import { describe, it, expect } from "vitest";
import { momentum, velocityFromMomentum, massFromMomentum } from "./impetus";

describe("impetus - momento lineal", () => {
  it("calcula el impetu: p = m * v", () => {
    expect(momentum(2, 3)).toBeCloseTo(6, 6);
  });

  it("calcula la velocidad a partir del impetu: v = p / m", () => {
    expect(velocityFromMomentum(6, 2)).toBeCloseTo(3, 6);
  });

  it("calcula la masa a partir del impetu: m = p / v", () => {
    expect(massFromMomentum(6, 3)).toBeCloseTo(2, 6);
  });

  it("ida y vuelta: calcular el impetu y recuperar la velocidad da lo mismo", () => {
    const p = momentum(4, 7);
    expect(velocityFromMomentum(p, 4)).toBeCloseTo(7, 6);
  });
});
