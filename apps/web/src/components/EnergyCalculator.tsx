import { useState } from "react";
import {
  work,
  kineticEnergy,
  potentialEnergy,
  power,
  netWork,
  degToRad,
} from "@fisicalc/physics";
import { NumberField } from "./NumberField";

/**
 * Calculadora de trabajo y energia.
 *
 * Cada formula pide campos distintos, asi que en vez de escribir 5
 * calculadoras separadas, describimos cada una como DATOS (un objeto con
 * sus campos, su formula y su unidad) y un solo componente las dibuja todas.
 * A esto se le llama "UI manejada por datos".
 */

type Field = { key: string; label: string; placeholder: string };
type Formula = {
  label: string;
  formula: string;
  fields: Field[];
  compute: (v: Record<string, number>) => number;
  unit: string;
};

const FORMULAS: Record<string, Formula> = {
  trabajo: {
    label: "Trabajo",
    formula: "W = F · d · cos(θ)",
    fields: [
      { key: "force", label: "Fuerza (N)", placeholder: "ej. 10" },
      { key: "distance", label: "Distancia (m)", placeholder: "ej. 2" },
      { key: "angle", label: "Ángulo (grados)", placeholder: "ej. 0" },
    ],
    compute: (v) => work(v.force, v.distance, degToRad(v.angle)),
    unit: "J",
  },
  cinetica: {
    label: "Energía cinética",
    formula: "Ec = ½ · m · v²",
    fields: [
      { key: "mass", label: "Masa (kg)", placeholder: "ej. 2" },
      { key: "velocity", label: "Velocidad (m/s)", placeholder: "ej. 3" },
    ],
    compute: (v) => kineticEnergy(v.mass, v.velocity),
    unit: "J",
  },
  potencial: {
    label: "Energía potencial",
    formula: "Ep = m · g · h",
    fields: [
      { key: "mass", label: "Masa (kg)", placeholder: "ej. 2" },
      { key: "height", label: "Altura (m)", placeholder: "ej. 5" },
    ],
    compute: (v) => potentialEnergy(v.mass, v.height),
    unit: "J",
  },
  potencia: {
    label: "Potencia",
    formula: "P = W / t",
    fields: [
      { key: "workValue", label: "Trabajo (J)", placeholder: "ej. 100" },
      { key: "time", label: "Tiempo (s)", placeholder: "ej. 4" },
    ],
    compute: (v) => power(v.workValue, v.time),
    unit: "W",
  },
  neto: {
    label: "Trabajo neto",
    formula: "W = ½ · m · (vf² − vi²)",
    fields: [
      { key: "mass", label: "Masa (kg)", placeholder: "ej. 2" },
      { key: "vi", label: "Velocidad inicial (m/s)", placeholder: "ej. 0" },
      { key: "vf", label: "Velocidad final (m/s)", placeholder: "ej. 5" },
    ],
    compute: (v) => netWork(v.mass, v.vi, v.vf),
    unit: "J",
  },
};

export function EnergyCalculator() {
  const [type, setType] = useState("trabajo");
  // Un solo estado en forma de objeto guarda TODOS los campos: { force: "10", ... }
  const [values, setValues] = useState<Record<string, string>>({});

  const formula = FORMULAS[type];

  // Convertimos cada campo a numero. Si alguno falta (NaN), no calculamos.
  const nums: Record<string, number> = {};
  let allValid = true;
  for (const f of formula.fields) {
    const n = parseFloat(values[f.key] ?? "");
    nums[f.key] = n;
    if (Number.isNaN(n)) allValid = false;
  }
  const result = allValid ? formula.compute(nums) : null;

  function handleChange(key: string, value: string) {
    // "...prev" copia lo anterior y solo cambia el campo tocado.
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleTypeChange(newType: string) {
    setType(newType);
    setValues({}); // al cambiar de formula, limpiamos los campos
  }

  return (
    <section className="card">
      <h2 className="card-title">Trabajo y energía</h2>

      <label className="field">
        <span>Fórmula</span>
        <select value={type} onChange={(e) => handleTypeChange(e.target.value)}>
          {Object.entries(FORMULAS).map(([key, f]) => (
            <option key={key} value={key}>
              {f.label}
            </option>
          ))}
        </select>
      </label>

      <p className="formula">{formula.formula}</p>

      {formula.fields.map((f) => (
        <NumberField
          key={f.key}
          label={f.label}
          value={values[f.key] ?? ""}
          onChange={(v) => handleChange(f.key, v)}
          placeholder={f.placeholder}
        />
      ))}

      {result !== null ? (
        <p className="result">
          {formula.label}: <strong>{result.toFixed(2)} {formula.unit}</strong>
        </p>
      ) : (
        <p className="hint">Completa todos los campos.</p>
      )}
    </section>
  );
}
