let animationFrameId;
const G = 9.81; // aceleración de la gravedad (m/s²)

// ===========================================================================
//  Definición de temas y sus calculadoras (navegación por datos)
// ===========================================================================

const TEMAS = [
    {
        id: 'mru', nombre: 'MRU', icono: '→',
        desc: 'Movimiento Rectilíneo Uniforme · velocidad constante.',
        items: [
            { id: 'MRU_Distancia', titulo: 'Distancia', formula: 'd = v · t', accion: 'calcularMRUDistancia',
              campos: [ ['velocidadInput', 'Velocidad', 'm/s'], ['tiempoInput', 'Tiempo', 's'] ] },
            { id: 'MRU_Velocidad', titulo: 'Velocidad', formula: 'v = d / t', accion: 'calcularMRUVelocidad',
              campos: [ ['distanciaInput', 'Distancia', 'm'], ['tiempoInput', 'Tiempo', 's'] ] },
            { id: 'MRU_Tiempo', titulo: 'Tiempo', formula: 't = d / v', accion: 'calcularMRUTiempo',
              campos: [ ['distanciaInput', 'Distancia', 'm'], ['velocidadInput', 'Velocidad', 'm/s'] ] },
        ]
    },
    {
        id: 'mruv', nombre: 'MRUV', icono: '⇒',
        desc: 'Movimiento Rectilíneo Uniformemente Variado · aceleración constante.',
        items: [
            { id: 'MRUV_VF', titulo: 'Velocidad final (con tiempo)', formula: 'vf = vi + a · t', accion: 'calcularMRUVVelocidadFinal',
              campos: [ ['viInput', 'Velocidad inicial', 'm/s'], ['aceleracionInput', 'Aceleración', 'm/s²'], ['tiempoInput', 'Tiempo', 's'] ] },
            { id: 'MRUV_VFD', titulo: 'Velocidad final (con distancia)', formula: 'vf² = vi² + 2·a·d', accion: 'calcularMRUVVelocidadFinalD',
              campos: [ ['viInput', 'Velocidad inicial', 'm/s'], ['aceleracionInput', 'Aceleración', 'm/s²'], ['distanciaInput', 'Distancia', 'm'] ] },
            { id: 'MRUV_D', titulo: 'Distancia', formula: 'd = vi·t + ½·a·t²', accion: 'calcularMRUVDistancia',
              campos: [ ['viInput', 'Velocidad inicial', 'm/s'], ['aceleracionInput', 'Aceleración', 'm/s²'], ['tiempoInput', 'Tiempo', 's'] ] },
            { id: 'MRUV_A', titulo: 'Aceleración', formula: 'a = (vf − vi) / t', accion: 'calcularMRUVAceleracion',
              campos: [ ['viInput', 'Velocidad inicial', 'm/s'], ['vfInput', 'Velocidad final', 'm/s'], ['tiempoInput', 'Tiempo', 's'] ] },
            { id: 'MRUV_T', titulo: 'Tiempo', formula: 't = (vf − vi) / a', accion: 'calcularMRUVTiempo',
              campos: [ ['viInput', 'Velocidad inicial', 'm/s'], ['vfInput', 'Velocidad final', 'm/s'], ['aceleracionInput', 'Aceleración', 'm/s²'] ] },
        ]
    },
    {
        id: 'cl', nombre: 'Caída Libre', icono: '↓',
        desc: 'Movimiento vertical bajo la gravedad (g = 9.81 m/s²).',
        items: [
            { id: 'CL_Caida', titulo: 'Caída desde una altura', formula: 't = √(2h/g) · vf = √(2gh)', accion: 'calcularCaidaLibre',
              campos: [ ['alturaInput', 'Altura', 'm'] ] },
            { id: 'CL_Altura', titulo: 'Altura (desde el tiempo)', formula: 'h = ½ · g · t²', accion: 'calcularAlturaCaida',
              campos: [ ['tiempoInput', 'Tiempo de caída', 's'] ] },
            { id: 'CL_TiroVertical', titulo: 'Tiro vertical hacia arriba', formula: 'hmax = vi²/(2g)', accion: 'calcularTiroVertical',
              campos: [ ['viInput', 'Velocidad inicial', 'm/s'] ] },
        ]
    },
    {
        id: 'tp', nombre: 'Tiro Parabólico', icono: '⤴',
        desc: 'Movimiento de proyectiles en dos dimensiones.',
        items: [
            { id: 'TP_Completo', titulo: 'Lanzamiento completo', formula: 'R = v₀²·sin(2θ)/g', accion: 'calcularTiroParabolico',
              campos: [ ['viInput', 'Velocidad inicial', 'm/s'], ['anguloInput', 'Ángulo de lanzamiento', '°'] ] },
            { id: 'TP_Horizontal', titulo: 'Lanzamiento horizontal', formula: 't = √(2h/g) · x = v₀·t', accion: 'calcularTiroHorizontal',
              campos: [ ['viInput', 'Velocidad horizontal', 'm/s'], ['alturaInput', 'Altura inicial', 'm'] ] },
        ]
    },
];

let temaActivo = null;
let itemActivo = null;

// ===========================================================================
//  Render de la interfaz
// ===========================================================================

function renderTabs() {
    document.getElementById('tabs').innerHTML = TEMAS.map(t =>
        `<button class="tab" data-tema="${t.id}" onclick="seleccionarTema('${t.id}')">
            <span class="ti">${t.icono}</span> ${t.nombre}
         </button>`).join('');
}

function renderChips() {
    const tema = TEMAS.find(t => t.id === temaActivo);
    const chips = document.getElementById('chips');
    if (!tema) { chips.innerHTML = ''; return; }
    chips.innerHTML = tema.items.map(it =>
        `<button class="chip" data-item="${it.id}" onclick="seleccionarItem('${it.id}')">${it.titulo}</button>`
    ).join('');
}

function seleccionarTema(temaId, autoItem = true) {
    temaActivo = temaId;
    document.querySelectorAll('.tab').forEach(el =>
        el.classList.toggle('active', el.dataset.tema === temaId));
    renderChips();
    if (autoItem) {
        const tema = TEMAS.find(t => t.id === temaId);
        seleccionarItem(tema.items[0].id);
    }
}
window.seleccionarTema = seleccionarTema;

function seleccionarItem(itemId) {
    itemActivo = itemId;
    document.querySelectorAll('.chip').forEach(el =>
        el.classList.toggle('active', el.dataset.item === itemId));
    renderCalculadora(itemId);
}
window.seleccionarItem = seleccionarItem;

function renderCalculadora(itemId) {
    cancelAnimationFrame(animationFrameId);
    let item, tema;
    for (const t of TEMAS) {
        const found = t.items.find(i => i.id === itemId);
        if (found) { item = found; tema = t; break; }
    }
    if (!item) return;

    const campos = item.campos.map(([id, label, unidad]) => `
        <div class="field">
            <label for="${id}">${label} <span style="color:var(--c1)">(${unidad})</span></label>
            <input type="number" id="${id}" placeholder="Ingresa ${label.toLowerCase()} en ${unidad}">
        </div>`).join('');

    document.getElementById('contenido').innerHTML = `
        <div class="card">
            <div class="card-head">
                <h2>${tema.nombre} · ${item.titulo}</h2>
                <span class="formula">${item.formula}</span>
            </div>
            <div class="card-body">
                <div class="panel controls">
                    ${campos}
                    <button class="btn" onclick="${item.accion}()">⚡ Calcular y animar</button>
                </div>
                <div class="panel visual">
                    <canvas id="physicsCanvas" width="520" height="325"></canvas>
                    <div id="physicsResults"></div>
                </div>
            </div>
        </div>`;
}

function renderHome() {
    document.getElementById('contenido').innerHTML = `
        <div class="card">
            <div class="card-head"><h2>Bienvenido 👋</h2></div>
            <div style="padding:24px 26px;">
                <p class="home-intro">Elige un tema para empezar. Cada calculadora resuelve la variable que necesitas,
                te muestra la fórmula usada y anima el movimiento en tiempo real.</p>
                <div class="home-grid">
                    ${TEMAS.map(t => `
                        <button class="home-tile" onclick="seleccionarTema('${t.id}')">
                            <div class="ic">${t.icono}</div>
                            <h3>${t.nombre}</h3>
                            <p>${t.desc}</p>
                        </button>`).join('')}
                </div>
            </div>
        </div>`;
}
window.renderHome = renderHome;

// Arranque
document.addEventListener('DOMContentLoaded', () => {
    renderTabs();
    seleccionarTema('mru');
});

// ===========================================================================
//  Helpers de cálculo / presentación
// ===========================================================================

function mostrarError(mensaje) {
    const div = document.getElementById('physicsResults');
    if (div) div.innerHTML = `<p class="error">⚠ ${mensaje}</p>`;
    else alert(mensaje);
}
window.mostrarError = mostrarError;

function val(id) { return parseFloat(document.getElementById(id).value); }

// Construye la tabla de resultados: recibe pares [etiqueta, valor].
function filas(pares) {
    return `<h3>Resultados</h3><ul>` +
        pares.map(([k, v]) => `<li><strong>${k}</strong><span class="v">${v}</span></li>`).join('') +
        `</ul>`;
}

function setResultados(html) {
    document.getElementById('physicsResults').innerHTML = html;
}

// ===========================================================================
//  MRU
// ===========================================================================

function calcularMRUDistancia() {
    const v = val('velocidadInput'), t = val('tiempoInput');
    if ([v, t].some(x => isNaN(x)) || t < 0) {
        mostrarError('Ingresa valores válidos (el tiempo no puede ser negativo).'); return;
    }
    const d = v * t;
    setResultados(filas([
        ['Distancia', `${d.toFixed(2)} m`],
        ['Velocidad', `${v.toFixed(2)} m/s`],
        ['Tiempo', `${t.toFixed(2)} s`],
    ]));
    animarMRU(v);
}
window.calcularMRUDistancia = calcularMRUDistancia;

function calcularMRUVelocidad() {
    const d = val('distanciaInput'), t = val('tiempoInput');
    if ([d, t].some(x => isNaN(x)) || t <= 0) {
        mostrarError('Ingresa valores válidos y un tiempo mayor que cero.'); return;
    }
    const v = d / t;
    setResultados(filas([
        ['Velocidad', `${v.toFixed(2)} m/s`],
        ['Distancia', `${d.toFixed(2)} m`],
        ['Tiempo', `${t.toFixed(2)} s`],
    ]));
    animarMRU(v);
}
window.calcularMRUVelocidad = calcularMRUVelocidad;

function calcularMRUTiempo() {
    const d = val('distanciaInput'), v = val('velocidadInput');
    if ([d, v].some(x => isNaN(x)) || v <= 0) {
        mostrarError('Ingresa valores válidos y una velocidad mayor que cero.'); return;
    }
    const t = d / v;
    setResultados(filas([
        ['Tiempo', `${t.toFixed(2)} s`],
        ['Distancia', `${d.toFixed(2)} m`],
        ['Velocidad', `${v.toFixed(2)} m/s`],
    ]));
    animarMRU(v);
}
window.calcularMRUTiempo = calcularMRUTiempo;

// Caja que avanza a velocidad constante (rebota en los bordes para repetir).
function animarMRU(velocidad) {
    const canvas = document.getElementById('physicsCanvas');
    const ctx = canvas.getContext('2d');
    cancelAnimationFrame(animationFrameId);

    const boxSize = 38;
    const pisoY = canvas.height - 70;
    let posX = 0;
    let dir = velocidad >= 0 ? 1 : -1;
    const vel = Math.max(0.6, Math.min(7, Math.abs(velocidad) * 0.6));
    if (dir < 0) posX = canvas.width - boxSize;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dibujarPiso(ctx, pisoY + boxSize);

        ctx.fillStyle = '#34d399';
        redondeado(ctx, posX, pisoY, boxSize, boxSize, 8); ctx.fill();

        dibujarFlecha(ctx, posX + boxSize / 2, pisoY + boxSize / 2,
            posX + boxSize / 2 + dir * 48, pisoY + boxSize / 2, '#38bdf8');

        posX += vel * dir;
        if (posX > canvas.width - boxSize) { posX = canvas.width - boxSize; dir = -1; }
        if (posX < 0) { posX = 0; dir = 1; }
        animationFrameId = requestAnimationFrame(draw);
    }
    draw();
}
window.animarMRU = animarMRU;

// ===========================================================================
//  MRUV
// ===========================================================================

function calcularMRUVVelocidadFinal() {
    const vi = val('viInput'), a = val('aceleracionInput'), t = val('tiempoInput');
    if ([vi, a, t].some(x => isNaN(x)) || t < 0) {
        mostrarError('Ingresa valores válidos (el tiempo no puede ser negativo).'); return;
    }
    const vf = vi + a * t, d = vi * t + 0.5 * a * t * t;
    setResultados(filas([
        ['Velocidad final', `${vf.toFixed(2)} m/s`],
        ['Distancia recorrida', `${d.toFixed(2)} m`],
    ]));
    animarMRUV(vi, a);
}
window.calcularMRUVVelocidadFinal = calcularMRUVVelocidadFinal;

function calcularMRUVVelocidadFinalD() {
    const vi = val('viInput'), a = val('aceleracionInput'), d = val('distanciaInput');
    if ([vi, a, d].some(x => isNaN(x))) { mostrarError('Ingresa valores numéricos válidos.'); return; }
    const vf2 = vi * vi + 2 * a * d;
    if (vf2 < 0) {
        mostrarError('No hay solución real: el móvil se detiene antes de recorrer esa distancia.'); return;
    }
    const vf = Math.sqrt(vf2);
    setResultados(filas([
        ['Velocidad final', `${vf.toFixed(2)} m/s`],
        ['Velocidad inicial', `${vi.toFixed(2)} m/s`],
        ['Aceleración', `${a.toFixed(2)} m/s²`],
    ]));
    animarMRUV(vi, a);
}
window.calcularMRUVVelocidadFinalD = calcularMRUVVelocidadFinalD;

function calcularMRUVDistancia() {
    const vi = val('viInput'), a = val('aceleracionInput'), t = val('tiempoInput');
    if ([vi, a, t].some(x => isNaN(x)) || t < 0) {
        mostrarError('Ingresa valores válidos (el tiempo no puede ser negativo).'); return;
    }
    const d = vi * t + 0.5 * a * t * t, vf = vi + a * t;
    setResultados(filas([
        ['Distancia', `${d.toFixed(2)} m`],
        ['Velocidad final', `${vf.toFixed(2)} m/s`],
    ]));
    animarMRUV(vi, a);
}
window.calcularMRUVDistancia = calcularMRUVDistancia;

function calcularMRUVAceleracion() {
    const vi = val('viInput'), vf = val('vfInput'), t = val('tiempoInput');
    if ([vi, vf, t].some(x => isNaN(x)) || t <= 0) {
        mostrarError('Ingresa valores válidos y un tiempo mayor que cero.'); return;
    }
    const a = (vf - vi) / t, d = vi * t + 0.5 * a * t * t;
    setResultados(filas([
        ['Aceleración', `${a.toFixed(2)} m/s²`],
        ['Distancia recorrida', `${d.toFixed(2)} m`],
    ]));
    animarMRUV(vi, a);
}
window.calcularMRUVAceleracion = calcularMRUVAceleracion;

function calcularMRUVTiempo() {
    const vi = val('viInput'), vf = val('vfInput'), a = val('aceleracionInput');
    if ([vi, vf, a].some(x => isNaN(x)) || a === 0) {
        mostrarError('Ingresa valores válidos y una aceleración distinta de cero.'); return;
    }
    const t = (vf - vi) / a;
    if (t < 0) { mostrarError('El tiempo resultó negativo: revisa los signos de velocidad y aceleración.'); return; }
    setResultados(filas([
        ['Tiempo', `${t.toFixed(2)} s`],
        ['Velocidad inicial', `${vi.toFixed(2)} m/s`],
        ['Velocidad final', `${vf.toFixed(2)} m/s`],
    ]));
    animarMRUV(vi, a);
}
window.calcularMRUVTiempo = calcularMRUVTiempo;

// Caja que parte con velocidad vi y acelera con a.
function animarMRUV(vi, a) {
    const canvas = document.getElementById('physicsCanvas');
    const ctx = canvas.getContext('2d');
    cancelAnimationFrame(animationFrameId);

    const boxSize = 38;
    const pisoY = canvas.height - 70;
    let posX = 0, vel = vi * 0.4;
    const acel = a * 0.012;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dibujarPiso(ctx, pisoY + boxSize);

        ctx.fillStyle = '#fb923c';
        redondeado(ctx, posX, pisoY, boxSize, boxSize, 8); ctx.fill();

        const dir = vel >= 0 ? 1 : -1;
        const largo = Math.min(64, 8 + Math.abs(vel) * 6);
        dibujarFlecha(ctx, posX + boxSize / 2, pisoY + boxSize / 2,
            posX + boxSize / 2 + dir * largo, pisoY + boxSize / 2, '#38bdf8');

        vel += acel; posX += vel;
        if (posX > canvas.width - boxSize || posX < 0) { posX = vi >= 0 ? 0 : canvas.width - boxSize; vel = vi * 0.4; }
        animationFrameId = requestAnimationFrame(draw);
    }
    draw();
}
window.animarMRUV = animarMRUV;

// ===========================================================================
//  Caída Libre
// ===========================================================================

function calcularCaidaLibre() {
    const h = val('alturaInput');
    if (isNaN(h) || h <= 0) { mostrarError('Ingresa una altura mayor que cero.'); return; }
    const t = Math.sqrt(2 * h / G), vf = Math.sqrt(2 * G * h);
    setResultados(filas([
        ['Tiempo de caída', `${t.toFixed(2)} s`],
        ['Velocidad al impactar', `${vf.toFixed(2)} m/s`],
        ['Altura', `${h.toFixed(2)} m`],
    ]));
    animarCaida(h, t);
}
window.calcularCaidaLibre = calcularCaidaLibre;

function calcularAlturaCaida() {
    const t = val('tiempoInput');
    if (isNaN(t) || t <= 0) { mostrarError('Ingresa un tiempo mayor que cero.'); return; }
    const h = 0.5 * G * t * t, vf = G * t;
    setResultados(filas([
        ['Altura de caída', `${h.toFixed(2)} m`],
        ['Velocidad al impactar', `${vf.toFixed(2)} m/s`],
        ['Tiempo', `${t.toFixed(2)} s`],
    ]));
    animarCaida(h, t);
}
window.calcularAlturaCaida = calcularAlturaCaida;

// Pelota que cae con aceleración g, escalando la altura real al canvas.
function animarCaida(altura, tiempoTotal) {
    const canvas = document.getElementById('physicsCanvas');
    const ctx = canvas.getContext('2d');
    cancelAnimationFrame(animationFrameId);

    const radio = 15, topY = 24, pisoY = canvas.height - 34;
    const recorrido = pisoY - topY - radio;
    const x = canvas.width / 2;
    let t = 0;
    const dt = tiempoTotal / 90;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dibujarPiso(ctx, pisoY + radio);

        const frac = Math.min(1, (0.5 * G * t * t) / altura);
        const y = topY + radio + frac * recorrido;

        bola(ctx, x, y, radio, '#38bdf8');
        const vLargo = Math.min(54, G * t * 2);
        dibujarFlecha(ctx, x, y + radio, x, y + radio + vLargo, '#fb7185');

        if (frac < 1) { t += dt; animationFrameId = requestAnimationFrame(draw); }
        else { t = 0; setTimeout(() => { animationFrameId = requestAnimationFrame(draw); }, 600); }
    }
    draw();
}
window.animarCaida = animarCaida;

function calcularTiroVertical() {
    const vi = val('viInput');
    if (isNaN(vi) || vi <= 0) { mostrarError('Ingresa una velocidad inicial mayor que cero.'); return; }
    const hmax = (vi * vi) / (2 * G), tSubida = vi / G, tVuelo = 2 * tSubida;
    setResultados(filas([
        ['Altura máxima', `${hmax.toFixed(2)} m`],
        ['Tiempo de subida', `${tSubida.toFixed(2)} s`],
        ['Tiempo total de vuelo', `${tVuelo.toFixed(2)} s`],
    ]));
    animarTiroVertical(vi, hmax, tVuelo);
}
window.calcularTiroVertical = calcularTiroVertical;

// Pelota que sube y baja (tiro vertical).
function animarTiroVertical(vi, hmax, tVuelo) {
    const canvas = document.getElementById('physicsCanvas');
    const ctx = canvas.getContext('2d');
    cancelAnimationFrame(animationFrameId);

    const radio = 15, pisoY = canvas.height - 34, topY = 28;
    const recorrido = pisoY - topY - radio;
    const x = canvas.width / 2;
    let t = 0;
    const dt = tVuelo / 120;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dibujarPiso(ctx, pisoY + radio);

        const altura = vi * t - 0.5 * G * t * t;
        const frac = Math.max(0, altura / hmax);
        const y = pisoY - radio - frac * recorrido;

        bola(ctx, x, y, radio, '#a78bfa');
        const v = vi - G * t;
        const vLargo = Math.min(54, Math.abs(v) * 2.2);
        const dir = v >= 0 ? -1 : 1;
        dibujarFlecha(ctx, x, y, x, y + dir * vLargo, '#fb7185');

        if (t < tVuelo) { t += dt; animationFrameId = requestAnimationFrame(draw); }
        else { t = 0; setTimeout(() => { animationFrameId = requestAnimationFrame(draw); }, 500); }
    }
    draw();
}
window.animarTiroVertical = animarTiroVertical;

// ===========================================================================
//  Tiro Parabólico
// ===========================================================================

function calcularTiroParabolico() {
    const v0 = val('viInput'), angulo = val('anguloInput');
    if ([v0, angulo].some(x => isNaN(x)) || v0 <= 0) {
        mostrarError('Ingresa una velocidad mayor que cero y un ángulo válido.'); return;
    }
    if (angulo < 0 || angulo > 90) { mostrarError('El ángulo debe estar entre 0° y 90°.'); return; }
    const rad = angulo * Math.PI / 180;
    const v0x = v0 * Math.cos(rad), v0y = v0 * Math.sin(rad);
    const tVuelo = 2 * v0y / G, hmax = (v0y * v0y) / (2 * G);
    const alcance = (v0 * v0 * Math.sin(2 * rad)) / G;
    setResultados(filas([
        ['Alcance horizontal', `${alcance.toFixed(2)} m`],
        ['Altura máxima', `${hmax.toFixed(2)} m`],
        ['Tiempo de vuelo', `${tVuelo.toFixed(2)} s`],
        ['Velocidad horizontal (v₀ₓ)', `${v0x.toFixed(2)} m/s`],
        ['Velocidad vertical (v₀ᵧ)', `${v0y.toFixed(2)} m/s`],
    ]));
    animarProyectil(v0x, v0y, tVuelo, alcance, hmax);
}
window.calcularTiroParabolico = calcularTiroParabolico;

function calcularTiroHorizontal() {
    const v0 = val('viInput'), h = val('alturaInput');
    if ([v0, h].some(x => isNaN(x)) || v0 <= 0 || h <= 0) {
        mostrarError('Ingresa una velocidad y una altura mayores que cero.'); return;
    }
    const tVuelo = Math.sqrt(2 * h / G), alcance = v0 * tVuelo;
    const vfy = G * tVuelo, vf = Math.sqrt(v0 * v0 + vfy * vfy);
    setResultados(filas([
        ['Tiempo de vuelo', `${tVuelo.toFixed(2)} s`],
        ['Alcance horizontal', `${alcance.toFixed(2)} m`],
        ['Velocidad vertical al caer', `${vfy.toFixed(2)} m/s`],
        ['Velocidad final (resultante)', `${vf.toFixed(2)} m/s`],
    ]));
    animarProyectil(v0, 0, tVuelo, alcance, h, true);
}
window.calcularTiroHorizontal = calcularTiroHorizontal;

// Proyectil con trayectoria parabólica. Si desdeAltura=true, parte desde arriba.
function animarProyectil(v0x, v0y, tVuelo, alcance, hmax, desdeAltura = false) {
    const canvas = document.getElementById('physicsCanvas');
    const ctx = canvas.getContext('2d');
    cancelAnimationFrame(animationFrameId);

    const margen = 38, pisoY = canvas.height - 30, radio = 9;
    const anchoUtil = canvas.width - margen * 2;
    const altoUtil = pisoY - 32;
    const escalaX = alcance > 0 ? anchoUtil / alcance : 1;
    const escalaY = hmax > 0 ? altoUtil / hmax : 1;
    const alturaInicial = desdeAltura ? hmax : 0;
    let t = 0;
    const dt = tVuelo / 130;
    const trail = [];

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dibujarPiso(ctx, pisoY);

        const px = v0x * t;
        const py = desdeAltura ? alturaInicial - 0.5 * G * t * t : v0y * t - 0.5 * G * t * t;
        const cx = margen + px * escalaX;
        const cy = pisoY - py * escalaY;
        trail.push({ x: cx, y: cy });

        ctx.beginPath();
        trail.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y));
        ctx.strokeStyle = 'rgba(129,140,248,.7)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.lineWidth = 1;

        bola(ctx, cx, cy, radio, '#f472b6');

        if (t < tVuelo) { t += dt; animationFrameId = requestAnimationFrame(draw); }
        else { t = 0; trail.length = 0; setTimeout(() => { animationFrameId = requestAnimationFrame(draw); }, 700); }
    }
    draw();
}
window.animarProyectil = animarProyectil;

// ===========================================================================
//  Utilidades de dibujo
// ===========================================================================

function dibujarPiso(ctx, y) {
    const c = ctx.canvas;
    const grad = ctx.createLinearGradient(0, y, c.width, y);
    grad.addColorStop(0, 'rgba(56,189,248,.5)');
    grad.addColorStop(1, 'rgba(129,140,248,.5)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, y, c.width, 4);
}

function bola(ctx, x, y, r, color) {
    const grad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.2, x, y, r);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.25, color);
    grad.addColorStop(1, color);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = grad;
    ctx.shadowColor = color;
    ctx.shadowBlur = 14;
    ctx.fill();
    ctx.shadowBlur = 0;
}

function redondeado(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
}

function dibujarFlecha(ctx, x1, y1, x2, y2, color) {
    const headLen = 9;
    const ang = Math.atan2(y2 - y1, x2 - x1);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - headLen * Math.cos(ang - Math.PI / 6), y2 - headLen * Math.sin(ang - Math.PI / 6));
    ctx.lineTo(x2 - headLen * Math.cos(ang + Math.PI / 6), y2 - headLen * Math.sin(ang + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
    ctx.lineWidth = 1;
}
window.dibujarFlecha = dibujarFlecha;
