import { useState } from "react";
import "./App.css";
import { FrictionCalculator } from "./components/FrictionCalculator";
import { MomentumCalculator } from "./components/MomentumCalculator";

// La lista de calculadoras disponibles. Agregar una nueva en el futuro
// sera tan facil como sumar una entrada aqui y su componente abajo.
const TABS = [
  { id: "friccion", label: "Fricción" },
  { id: "impetu", label: "Ímpetu" },
] as const;

function App() {
  // Recuerda que pestania esta activa. Empieza en "friccion".
  const [active, setActive] = useState("friccion");

  return (
    <div className="app">
      <header className="app-header">
        <span className="badge">⚛ FisiCalc</span>
        <h1>Calculadora de Física II</h1>
        <p>Fricción, movimiento circular, trabajo y energía.</p>
      </header>

      <nav className="tabs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={active === tab.id ? "tab active" : "tab"}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main>
        {active === "friccion" && <FrictionCalculator />}
        {active === "impetu" && <MomentumCalculator />}
      </main>
    </div>
  );
}

export default App;
