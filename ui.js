/* =========================================================================
   Capa de interfaz (navegación por datos) para la Calculadora de Física II.
   NO contiene lógica de física: solo construye la UI y delega los cálculos
   a las funciones definidas en physics-simulator.js (mismos IDs de inputs).
   ========================================================================= */

const CATEGORIAS = [
    {
        id: 'cin', nombre: 'Fricción Cinética', icono: '🛷',
        desc: 'Fricción en movimiento sobre plano inclinado u horizontal.',
        items: [
            { id: 'cin_inc_f',  titulo: 'Inclinado · Fuerza',         formula: 'F = μ·m·g·cos(θ)',     accion: 'calcularFriccion',
              campos: [['masaInput','Masa','kg'], ['anguloInput','Ángulo del plano','°'], ['coefInput','Coef. de fricción','μ']] },
            { id: 'cin_inc_mu', titulo: 'Inclinado · Coeficiente (μ)', formula: 'μ = F / (m·g·cos θ)',  accion: 'calcularCoeficiente',
              campos: [['fuerzaInput','Fricción cinética','N'], ['masaInput','Masa','kg'], ['anguloInput','Ángulo del plano','°']] },
            { id: 'cin_inc_m',  titulo: 'Inclinado · Masa',           formula: 'm = F / (μ·g·cos θ)',  accion: 'calcularMasa',
              campos: [['fuerzaInput','Fricción cinética','N'], ['anguloInput','Ángulo del plano','°'], ['coefInput','Coef. de fricción','μ']] },
            { id: 'cin_inc_a',  titulo: 'Inclinado · Ángulo',         formula: 'θ = arccos(F/(μ·m·g))', accion: 'calcularAngulo',
              campos: [['fuerzaInput','Fricción cinética','N'], ['masaInput','Masa','kg'], ['coefInput','Coef. de fricción','μ']] },
            { id: 'cin_hor_f',  titulo: 'Horizontal · Fuerza',        formula: 'F = μ·m·g',            accion: 'calcularFriccionpn',
              campos: [['masaInput','Masa','kg'], ['coefInput','Coef. de fricción','μ']] },
            { id: 'cin_hor_mu', titulo: 'Horizontal · Coeficiente (μ)', formula: 'μ = F / (m·g)',      accion: 'calcularCoeficientepni',
              campos: [['fuerzaInput','Fricción cinética','N'], ['masaInput','Masa','kg']] },
            { id: 'cin_hor_m',  titulo: 'Horizontal · Masa',          formula: 'm = F / (μ·g)',        accion: 'calcularMasapni',
              campos: [['fuerzaInput','Fricción cinética','N'], ['coefInput','Coef. de fricción','μ']] },
        ]
    },
    {
        id: 'est', nombre: 'Fricción Estática', icono: '🧱',
        desc: 'Fricción en reposo: condición de no deslizamiento.',
        items: [
            { id: 'est_inc_f',  titulo: 'Inclinado · Fuerza',         formula: 'F = μ·m·g·cos(θ)',     accion: 'calculateAndAnimateFFEstPI',
              campos: [['massInput','Masa','kg'], ['frictionCoefficientInput','Coef. de fricción','μ'], ['angleInput','Ángulo','°'], ['distanceInput','Distancia en rampa','m']] },
            { id: 'est_inc_mu', titulo: 'Inclinado · Coeficiente (μ)', formula: 'μₘᵢₙ = tan(θ)',        accion: 'calculateAndAnimateFrictionCoefficient',
              campos: [['angleInput','Ángulo de inclinación','°'], ['massInput','Masa','kg']] },
            { id: 'est_inc_m',  titulo: 'Inclinado · Masa',           formula: 'm = F / (g·sin θ)',    accion: 'calculateAndAnimateMassPI',
              campos: [['angleInput','Ángulo de inclinación','°'], ['frictionForceInput','Fuerza de fricción','N']] },
            { id: 'est_inc_a',  titulo: 'Inclinado · Ángulo',         formula: 'θ = arccos(F/(μ·m·g))', accion: 'calculateAndAnimateAngle',
              campos: [['massInput','Masa','kg'], ['frictionCoefficientInput','Coef. de fricción','μ'], ['frictionForceInput','Fuerza de fricción','N']] },
            { id: 'est_hor_f',  titulo: 'Horizontal · Fuerza',        formula: 'F = μ·m·g',            accion: 'calculateFFEst',       canvas: false,
              campos: [['massInput','Masa','kg'], ['frictionCoefficientInput','Coef. de fricción','μ']] },
            { id: 'est_hor_mu', titulo: 'Horizontal · Coeficiente (μ)', formula: 'μ = F / (m·g)',      accion: 'calculateFricCoefEst', canvas: false,
              campos: [['frictionForceInput','Fuerza de fricción','N'], ['massInput','Masa','kg']] },
            { id: 'est_hor_m',  titulo: 'Horizontal · Masa',          formula: 'm = F / (μ·g)',        accion: 'calculateMassEst',     canvas: false,
              campos: [['frictionForceInput','Fuerza de fricción','N'], ['frictionCoefficientInput','Coef. de fricción','μ']] },
        ]
    },
    {
        id: 'mcu', nombre: 'MCU', icono: '🌀',
        desc: 'Movimiento Circular Uniforme: período, frecuencia, fuerza centrípeta.',
        items: [
            { id: 'mcu_sim',    titulo: 'Simulador completo',  formula: 'v = 2πrn/t · F = m·v²/r', accion: 'calcularMCU',
              campos: [['masaInput','Masa','kg'], ['radioInput','Radio','m'], ['vueltasInput','Número de vueltas',''], ['tiempoInput','Tiempo','s']] },
            { id: 'mcu_periodo', titulo: 'Período',            formula: 'T = t / n',               accion: 'calcularPeriodo',
              campos: [['tiempoInput','Tiempo total','s'], ['vueltasInput','Número de vueltas','']] },
            { id: 'mcu_frec',   titulo: 'Frecuencia',          formula: 'f = n / t',               accion: 'calcularFrecuenciaMCU',
              campos: [['vueltasInput','Número de vueltas',''], ['tiempoInput','Tiempo total','s']] },
            { id: 'mcu_vt',     titulo: 'Velocidad tangencial', formula: 'v = 2πrn / t',           accion: 'calcularVelocidadTangencialMCU',
              campos: [['radioInput','Radio','m'], ['vueltasInput','Número de vueltas',''], ['tiempoInput','Tiempo total','s']] },
            { id: 'mcu_masa',   titulo: 'Masa',                formula: 'm = F·r / v²',            accion: 'calcularMasaMCU',
              campos: [['fuerzaInput','Fuerza centrípeta','N'], ['radioInput','Radio','m'], ['velocidadInput','Velocidad tangencial','m/s']] },
            { id: 'mcu_radio',  titulo: 'Radio',               formula: 'r = m·v² / F',            accion: 'calcularRadioMCU',
              campos: [['masaInput','Masa','kg'], ['velocidadInput','Velocidad tangencial','m/s'], ['fuerzaInput','Fuerza centrípeta','N']] },
        ]
    },
    {
        id: 'te', nombre: 'Trabajo y Energía', icono: '⚡',
        desc: 'Trabajo, energía cinética y potencial, potencia y elasticidad.',
        items: [
            { id: 'te_w',    titulo: 'Trabajo',            formula: 'W = F·d·cos(θ)',          accion: 'calcularYAnimartra',
              campos: [['fuerzaInput','Fuerza','N'], ['distanciaInput','Distancia','m'], ['anguloInput','Ángulo','°']] },
            { id: 'te_ec',   titulo: 'Energía cinética',   formula: 'K = ½·m·v²',              accion: 'calcularYAnimarECin',
              campos: [['masaInput','Masa','kg'], ['velocidadInput','Velocidad','m/s']] },
            { id: 'te_ep',   titulo: 'Energía potencial',  formula: 'U = m·g·h',               accion: 'calcularYAnimarEP',
              campos: [['masaInput','Masa','kg'], ['alturaInput','Altura','m']] },
            { id: 'te_pot',  titulo: 'Potencia',           formula: 'P = W / t',               accion: 'calcularYAnimarPot',
              campos: [['trabajoInput','Trabajo','J'], ['tiempoInput','Tiempo','s']] },
            { id: 'te_neto', titulo: 'Trabajo neto',       formula: 'Wₙ = ½·m·(vf² − vi²)',    accion: 'calcularYAnimarTrabajoNeto',
              campos: [['masaInput','Masa','kg'], ['viInput','Velocidad inicial','m/s'], ['vfInput','Velocidad final','m/s']] },
            { id: 'te_k',    titulo: 'Constante elástica', formula: 'k = F / x',               accion: 'calcularYAnimarConstK',
              campos: [['fuerzaInput','Fuerza','N'], ['deformacionInput','Deformación','m']] },
        ]
    },
    {
        id: 'imp', nombre: 'Ímpetu', icono: '🎱',
        desc: 'Cantidad de movimiento y sus relaciones con fuerza y energía.',
        items: [
            { id: 'imp_p',  titulo: 'Cantidad de movimiento', formula: 'p = m·v',            accion: 'calcularImpetu',
              campos: [['masaInput','Masa','kg'], ['velocidadInput','Velocidad','m/s']] },
            { id: 'imp_f',  titulo: 'Fuerza (2ª ley)',        formula: 'F = m·a',            accion: 'calcularFuerza',
              campos: [['masaInput','Masa','kg'], ['aceleracionInput','Aceleración','m/s²']] },
            { id: 'imp_ek', titulo: 'Energía cinética',       formula: 'K = ½·m·v²',         accion: 'calcularEnergiaCinetica',
              campos: [['masaInput','Masa','kg'], ['velocidadInput','Velocidad','m/s']] },
            { id: 'imp_w',  titulo: 'Energía transferida',    formula: 'W = F·d·cos(θ)',     accion: 'calcularTrabajo',
              campos: [['fuerzaInput','Fuerza','N'], ['distanciaInput','Distancia','m'], ['anguloInput','Ángulo','°']] },
            { id: 'imp_m',  titulo: 'Masa',                   formula: 'm = p / v',          accion: 'calcularMasaDesdeImpetu',
              campos: [['impetuInput','Ímpetu','kg·m/s'], ['velocidadInput','Velocidad','m/s']] },
            { id: 'imp_v',  titulo: 'Velocidad',              formula: 'v = p / m',          accion: 'calcularVelocidadDesdeImpetu',
              campos: [['impetuInput','Ímpetu','kg·m/s'], ['masaInput','Masa','kg']] },
        ]
    },
];

let categoriaActiva = null;
let itemActivo = null;

function detenerAnimacion() {
    // animationFrameId vive en physics-simulator.js (mismo realm); lo cancelamos
    // de forma defensiva al cambiar de calculadora.
    try { cancelAnimationFrame(animationFrameId); } catch (e) { /* aún no definido */ }
}

function renderTabs() {
    document.getElementById('tabs').innerHTML = CATEGORIAS.map(c =>
        `<button class="tab" data-cat="${c.id}" onclick="seleccionarCategoria('${c.id}')">
            <span class="ti">${c.icono}</span> ${c.nombre}
         </button>`).join('');
}

function renderChips() {
    const cat = CATEGORIAS.find(c => c.id === categoriaActiva);
    const chips = document.getElementById('chips');
    if (!cat) { chips.innerHTML = ''; return; }
    chips.innerHTML = cat.items.map(it =>
        `<button class="chip" data-item="${it.id}" onclick="seleccionarItem('${it.id}')">${it.titulo}</button>`
    ).join('');
}

function seleccionarCategoria(catId, autoItem = true) {
    categoriaActiva = catId;
    document.querySelectorAll('.tab').forEach(el => el.classList.toggle('active', el.dataset.cat === catId));
    renderChips();
    if (autoItem) {
        const cat = CATEGORIAS.find(c => c.id === catId);
        seleccionarItem(cat.items[0].id);
    }
}
window.seleccionarCategoria = seleccionarCategoria;

function seleccionarItem(itemId) {
    itemActivo = itemId;
    document.querySelectorAll('.chip').forEach(el => el.classList.toggle('active', el.dataset.item === itemId));
    renderCalculadora(itemId);
}
window.seleccionarItem = seleccionarItem;

function renderCalculadora(itemId) {
    detenerAnimacion();
    let item, cat;
    for (const c of CATEGORIAS) {
        const found = c.items.find(i => i.id === itemId);
        if (found) { item = found; cat = c; break; }
    }
    if (!item) return;

    const campos = item.campos.map(([id, label, unidad]) => `
        <div class="field">
            <label for="${id}">${label}${unidad ? ` <span style="color:var(--c2)">(${unidad})</span>` : ''}</label>
            <input type="number" id="${id}" placeholder="Ingresa ${label.toLowerCase()}${unidad ? ` en ${unidad}` : ''}">
        </div>`).join('');

    const visual = item.canvas === false
        ? `<div class="nota">🧱 En fricción estática el cuerpo permanece en reposo, así que no hay
            movimiento que animar. Los resultados aparecen abajo.</div>
           <div id="physicsResults"></div>`
        : `<canvas id="physicsCanvas" width="400" height="300"></canvas>
           <div id="physicsResults"></div>`;

    document.getElementById('contenido').innerHTML = `
        <div class="card">
            <div class="card-head">
                <h2>${cat.nombre} · ${item.titulo}</h2>
                <span class="formula">${item.formula}</span>
            </div>
            <div class="card-body">
                <div class="panel controls">
                    ${campos}
                    <button class="btn" onclick="${item.accion}()">⚡ Calcular y animar</button>
                </div>
                <div class="panel visual">
                    ${visual}
                </div>
            </div>
        </div>`;
}

function renderHome() {
    document.getElementById('contenido').innerHTML = `
        <div class="card">
            <div class="card-head"><h2>Bienvenido 👋</h2></div>
            <div style="padding:24px 26px;">
                <p class="home-intro">Elige un tema para empezar. Cada calculadora resuelve la variable que
                necesitas, muestra la fórmula usada y anima el fenómeno físico en tiempo real.</p>
                <div class="home-grid">
                    ${CATEGORIAS.map(c => `
                        <button class="home-tile" onclick="seleccionarCategoria('${c.id}')">
                            <div class="ic">${c.icono}</div>
                            <h3>${c.nombre}</h3>
                            <p>${c.desc}</p>
                        </button>`).join('')}
                </div>
            </div>
        </div>`;
}
window.renderHome = renderHome;

document.addEventListener('DOMContentLoaded', () => {
    renderTabs();
    seleccionarCategoria('cin');
});
