import { useState } from "react";
import {
  period,
  frequency,
  angularVelocity,
  tangentialVelocity,
  pathLength,
  centripetalAcceleration,
  centripetalForce,
} from "@fisicalc/physics";
import { NumberField } from "./NumberField";

/**
 * Calculadora de Movimiento Circular Uniforme (MCU).
 *
 * A partir de 4 datos (masa, radio, vueltas, tiempo) ENCADENA varias
 * funciones puras del motor para obtener 7 resultados. Cada una hace una
 * cosa; aqui las combinamos.
 */
export function MCUCalculator() {
  const [mass, setMass] = useState("");
  const [radius, setRadius] = useState("");
  const [turns, setTurns] = useState("");
  const [time, setTime] = useState("");

  const m = parseFloat(mass);
  const r = parseFloat(radius);
  const n = parseFloat(turns);
  const t = parseFloat(time);
  const valid = m > 0 && r > 0 && n > 0 && t > 0;

  // Encadenamos las funciones del motor: la salida de una alimenta a la siguiente.
  let results: { label: string; value: number; unit: string }[] = [];
  if (valid) {
    const T = period(t, n);
    const f = frequency(T);
    const omega = angularVelocity(T);
    const v = tangentialVelocity(omega, r);
    const d = pathLength(r, n);
    const ac = centripetalAcceleration(v, r);
    const F = centripetalForce(m, v, r);

    results = [
      { label: "Período (T)", value: T, unit: "s" },
      { label: "Frecuencia (f)", value: f, unit: "Hz" },
      { label: "Velocidad angular (ω)", value: omega, unit: "rad/s" },
      { label: "Velocidad tangencial (v)", value: v, unit: "m/s" },
      { label: "Aceleración centrípeta", value: ac, unit: "m/s²" },
      { label: "Fuerza centrípeta", value: F, unit: "N" },
      { label: "Trayectoria recorrida", value: d, unit: "m" },
    ];
  }

  return (
    <section className="card">
      <h2 className="card-title">Movimiento circular uniforme</h2>
      <p className="formula">v = ω · r ， F = m · v² / r</p>

      <NumberField label="Masa (kg)" value={mass} onChange={setMass} placeholder="ej. 3" />
      <NumberField label="Radio (m)" value={radius} onChange={setRadius} placeholder="ej. 2" />
      <NumberField label="Vueltas (n)" value={turns} onChange={setTurns} placeholder="ej. 4" />
      <NumberField label="Tiempo (s)" value={time} onChange={setTime} placeholder="ej. 8" />

      {valid ? (
        <ul className="results">
          {results.map((row) => (
            <li key={row.label}>
              <span>{row.label}</span>
              <strong>
                {row.value.toFixed(2)} {row.unit}
              </strong>
            </li>
          ))}
        </ul>
      ) : (
        <p className="hint">Ingresa masa, radio, vueltas y tiempo positivos.</p>
      )}
    </section>
  );
}
