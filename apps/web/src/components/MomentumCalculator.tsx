import { useState } from "react";
import { momentum } from "@fisicalc/physics";
import { NumberField } from "./NumberField";

/**
 * Calculadora de impetu (momento lineal):  p = m * v
 * Misma estructura que la de friccion, pero reusando <NumberField>.
 */
export function MomentumCalculator() {
  const [mass, setMass] = useState("");
  const [velocity, setVelocity] = useState("");

  const m = parseFloat(mass);
  const v = parseFloat(velocity);
  const valid = m > 0 && v > 0;

  const result = valid ? momentum(m, v) : null;

  return (
    <section className="card">
      <h2 className="card-title">Ímpetu (momento lineal)</h2>
      <p className="formula">p = m · v</p>

      <NumberField label="Masa (kg)" value={mass} onChange={setMass} placeholder="ej. 2" />
      <NumberField
        label="Velocidad (m/s)"
        value={velocity}
        onChange={setVelocity}
        placeholder="ej. 3"
      />

      {result !== null ? (
        <p className="result">
          Ímpetu: <strong>{result.toFixed(2)} kg·m/s</strong>
        </p>
      ) : (
        <p className="hint">Ingresa una masa y una velocidad positivas.</p>
      )}
    </section>
  );
}
