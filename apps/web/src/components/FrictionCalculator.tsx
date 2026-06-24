import { useState } from "react";
import { frictionForce, GRAVITY } from "@fisicalc/physics";
import { NumberField } from "./NumberField";

/**
 * Calculadora de fuerza de friccion:  F = mu * m * g
 *
 * Usa la funcion pura frictionForce() del motor @fisicalc/physics.
 * El componente solo se encarga de la PANTALLA (inputs + resultado);
 * la matematica vive en el paquete compartido.
 */
export function FrictionCalculator() {
  // useState guarda lo que el usuario escribe. Cada input es texto (string),
  // que es el valor natural de un <input>. setMass/setCoefficient lo actualizan.
  const [mass, setMass] = useState("");
  const [coefficient, setCoefficient] = useState("");

  // Convertimos el texto a numero para poder calcular.
  const m = parseFloat(mass);
  const mu = parseFloat(coefficient);

  // parseFloat("") es NaN, y NaN > 0 es false, asi que esto cubre el caso vacio.
  const valid = m > 0 && mu > 0;

  // El resultado se DERIVA del estado: React recalcula esto en cada tecla.
  // (No hace falta boton "Calcular" como en el codigo viejo.)
  const result = valid ? frictionForce(m, mu) : null;

  return (
    <section className="card">
      <h2 className="card-title">Fuerza de friccion</h2>
      <p className="formula">F = μ · m · g</p>

      <NumberField label="Masa (kg)" value={mass} onChange={setMass} placeholder="ej. 2" />
      <NumberField
        label="Coeficiente de friccion (μ)"
        value={coefficient}
        onChange={setCoefficient}
        placeholder="ej. 0.3"
      />

      {result !== null ? (
        <p className="result">
          Fuerza de friccion: <strong>{result.toFixed(2)} N</strong>
        </p>
      ) : (
        <p className="hint">Ingresa una masa y un coeficiente positivos.</p>
      )}

      <p className="footnote">Se usa g = {GRAVITY} m/s².</p>
    </section>
  );
}
