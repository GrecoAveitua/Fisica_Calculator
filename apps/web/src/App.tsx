import "./App.css";
import { FrictionCalculator } from "./components/FrictionCalculator";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <span className="badge">⚛ FisiCalc</span>
        <h1>Calculadora de Física II</h1>
        <p>Fricción, movimiento circular, trabajo y energía.</p>
      </header>

      <main>
        <FrictionCalculator />
      </main>
    </div>
  );
}

export default App;
