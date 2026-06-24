import { describe, it, expect } from "vitest";
import { force, springConstant } from "./dynamics";

describe("dynamics - leyes de fuerza", () => {
  it("segunda ley de Newton: F = m * a", () => {
    expect(force(2, 3)).toBeCloseTo(6, 6);
  });

  it("ley de Hooke: k = F / x", () => {
    expect(springConstant(10, 0.5)).toBeCloseTo(20, 6);
  });

  it("coherencia: con k conocido, F = k * x recupera la fuerza", () => {
    const k = springConstant(10, 0.5); // 20 N/m
    expect(k * 0.5).toBeCloseTo(10, 6);
  });
});
