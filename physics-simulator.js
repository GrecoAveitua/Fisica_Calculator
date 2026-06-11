let animationFrameId;

// Muestra un mensaje de error dentro de la página (en rojo), en vez de un alert() del navegador.
function mostrarError(mensaje) {
    const div = document.getElementById('physicsResults');
    if (div) {
        div.innerHTML = `<p style="color:#ff5252;">${mensaje}</p>`;
    } else {
        alert(mensaje);
    }
}
window.mostrarError = mostrarError;

function toggleMenu(element) {
    const submenu = element.nextElementSibling;
    const arrow = element.querySelector('.arrow');
    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
    arrow.classList.toggle('rotated');
    element.classList.toggle('open');
}

//funcion para cargar los items
function cargarContenido(opcion, elemento) {
    // Remover clase active de todos los items y marcar el seleccionado
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    if (elemento) elemento.classList.add('active');

    // Detener la animación en curso antes de cambiar de contenido
    cancelAnimationFrame(animationFrameId);

    // Cambiar el contenido según la opción seleccionada
    const contenido = document.getElementById('contenido');

    switch(opcion) {
        case 'Inicio':
            contenido.innerHTML = `
                <h2>Bienvenido a la página</h2>
                <p>Selecciona una opción del menú para ver su contenido.</p>
            `;
            break;
        case 'FFPNIEST':
            contenido.innerHTML = `
                <div class="simulator-container">
                    <div class="controls-section">
                        <h2>Cálculo de Fuerza de Fricción Estática</h2>
                        <input type="number" id="massInput" placeholder="Masa (kg)">
                        <input type="number" id="frictionCoefficientInput" placeholder="Coeficiente de fricción (μ)">
                        <p>Recuerda que como es fricción estática, no es posible mostrar una animación correspondiente
                        debido a que está quieto</p>
                        <p class="formula">Fórmula: F = μ · m · g</p>
                        <button onclick="calculateFFEst()">Calcular</button> 
                        <div id="physicsResults"></div>
                    </div>
                </div>
            `;
            break;
        case 'CoefFricEstPNI':
            contenido.innerHTML = `
                <div class="simulator-container">
                    <div class="controls-section">
                        <h2>Cálculo de Coeficiente de fricción Estatico</h2>
                        <input type="number" id="frictionForceInput" placeholder="Fuerza de fricción (N)">
                        <input type="number" id="massInput" placeholder="Masa (kg)">
                        <p>Recuerda que como es fricción estática, no es posible mostrar una animación correspondiente
                         debido a que está quieto</p>
                        <p class="formula">Fórmula: μ = F / (m · g)</p>
                        <button onclick="calculateFricCoefEst()">Calcular</button> 
                        <div id="physicsResults"></div>
                    </div>
                </div>
            `;
            break;
        case 'MasaEstPNI':
            contenido.innerHTML = `
                <div class="simulator-container">
                    <div class="controls-section">
                        <h2>Cálculo de Masa</h2>
                        <input type="number" id="frictionForceInput" placeholder="Fuerza de fricción (N)">
                        <input type="number" id="frictionCoefficientInput" placeholder="Coeficiente de fricción (μ)">
                        <p>Recuerda que como es fricción estática, no es posible mostrar una animación correspondiente
                        debido a que está quieto</p>
                        <p class="formula">Fórmula: m = F / (μ · g)</p>
                        <button onclick="calculateMassEst()">Calcular</button> 
                        <div id="physicsResults"></div>
                    </div>
                </div>
            `;
            break;
        case 'FFPIEST' :
            contenido.innerHTML= `
                <div class="simulator-container">
                    <div class="controls-section">
                        <h2>Cálculo de Fuerza de Fricción Estática</h2>
                        <input type="number" id="massInput" placeholder="Masa (kg)">
                        <input type="number" id="frictionCoefficientInput" placeholder="Coeficiente de fricción (μ)">
                        <input type="number" id="angleInput" placeholder="Ángulo (°)">
                        <input type="number" id="distanceInput" placeholder="Distancia sobre la rampa (m)">
                        <p class="formula">Fórmula: F = μ · m · g · cos(θ)</p>
                        <button onclick="calculateAndAnimateFFEstPI()">Calcular y Animar</button> 
                        <div id="physicsResults"></div>
                    </div>
                    <div class="animation-section">
                        <canvas id="physicsCanvas" width="400" height="300"></canvas>
                    </div>
                </div>
            `;
             break;
        case 'CoeficientePIF':
            contenido.innerHTML = `
                <div class="simulator-container">
                    <div class="controls-section">
                        <h2>Cálculo del Coeficiente de Fricción Estática (μ)</h2>
                        <input type="number" id="angleInput" placeholder="Ángulo de inclinación (°)">
                        <input type="number" id="massInput" placeholder="Masa (kg)">
                        <p class="formula">Fórmula: μ(mínimo) = tan(θ)</p>
                        <button onclick="calculateAndAnimateFrictionCoefficient()">Calcular y Animar</button> 
                        <div id="physicsResults"></div>
                    </div>
                    <div class="animation-section">
                        <canvas id="physicsCanvas" width="400" height="300"></canvas>
                    </div>
                </div>
                `;
            break;
        case 'MasaPIF':
            contenido.innerHTML = `
                <div class="simulator-container">
                    <div class="controls-section">
                        <h2>Cálculo de Fuerza de Masa</h2>
                        <input type="number" id="angleInput" placeholder="Ángulo de  inclinación(°)">
                        <input type="number" id="frictionForceInput" placeholder="Fuerza de Fricción (N)">
                        <p class="formula">Fórmula: m = F / (g · sin(θ))</p>
                        <button onclick="calculateAndAnimateMassPI()">Calcular y Animar</button> 
                        <div id="physicsResults"></div>
                    </div>
                    <div class="animation-section">
                        <canvas id="physicsCanvas" width="400" height="300"></canvas>
                    </div>
                </div>
                `;
            break;
        case 'ÁnguloPIF':
            contenido.innerHTML = `
                <div class="simulator-container">
                    <div class="controls-section">
                        <h2>Cálculo de Ángulo</h2>
                        <input type="number" id="massInput" placeholder="Masa (kg)">
                        <input type="number" id="frictionCoefficientInput" placeholder="Coeficiente de fricción (μ)">
                        <input type="number" id="frictionForceInput" placeholder="Fuerza de Fricción (N)">
                        <p class="formula">Fórmula: θ = arccos(F / (μ · m · g))</p>
                        <button onclick="calculateAndAnimateAngle()">Calcular y Animar</button> 
                        <div id="physicsResults"></div>
                    </div>
                    <div class="animation-section">
                        <canvas id="physicsCanvas" width="400" height="300"></canvas>
                    </div>
                </div>
                `;
            break;
        case 'FFPICIN':
            contenido.innerHTML = `
                <div class="simulator-container">
                    <div class="controls-section">
                        <h2>Fricción Cinética en Plano Inclinado</h2>

                        <input type="number" id="masaInput" placeholder="Masa (kg)">
                        <input type="number" id="anguloInput" placeholder="Ángulo del plano (°)">
                        <input type="number" step="0.01" id="coefInput" placeholder="Coef. fricción cinética (μ)">

                        <p class="formula">Fórmula: F = μ · m · g · cos(θ)</p>
                        <button onclick="calcularFriccion()">Calcular y Animar</button> 
                        <div id="physicsResults"></div>
                    </div>

                    <div class="animation-section">
                        <canvas id="physicsCanvas" width="400" height="300"></canvas>
                    </div>
                </div>
                `;
            break;
        case 'CoeficientePIFCin':
            contenido.innerHTML = `
            <div class="simulator-container">
                <div class="controls-section">
                    <h2>Plano Inclinado - Cálculo del Coeficiente de Fricción Cinética</h2>

                    <input type="number" id="fuerzaInput" placeholder="Fricción cinética (N)">
                    <input type="number" id="masaInput" placeholder="Masa (kg)">
                    <input type="number" id="anguloInput" placeholder="Ángulo del plano (°)">

                    <p class="formula">Fórmula: μ = F / (m · g · cos(θ))</p>
                        <button onclick="calcularCoeficiente()">Calcular y Animar</button> 
                    <div id="physicsResults"></div>
                </div>

                <div class="animation-section">
                    <canvas id="physicsCanvas" width="400" height="300"></canvas>
                </div>
            </div>
                `;
            break;
        case 'MasaPIFCin':
            contenido.innerHTML = `
                <div class="simulator-container">
                    <div class="controls-section">
                        <h2>Plano Inclinado - Cálculo de Masa</h2>

                        <input type="number" id="fuerzaInput" placeholder="Fricción cinética (N)">
                        <input type="number" id="anguloInput" placeholder="Ángulo del plano (°)">
                        <input type="number" step="0.01" id="coefInput" placeholder="Coef. fricción cinética (μ)">

                        <p class="formula">Fórmula: m = F / (μ · g · cos(θ))</p>
                        <button onclick="calcularMasa()">Calcular y Animar</button> 
                        <div id="physicsResults"></div>
                    </div>

                    <div class="animation-section">
                        <canvas id="physicsCanvas" width="400" height="300"></canvas>
                    </div>
                </div>
                `;
            break;
        case 'ÁnguloPIFCin':
            contenido.innerHTML = `
                <div class="simulator-container">
                    <div class="controls-section">
                        <h2>Plano Inclinado - Cálculo del Ángulo</h2>

                        <input type="number" id="fuerzaInput" placeholder="Fricción cinética (N)">
                        <input type="number" id="masaInput" placeholder="Masa (kg)">
                        <input type="number" step="0.01" id="coefInput" placeholder="Coef. fricción cinética (μ)">

                        <p class="formula">Fórmula: θ = arccos(F / (μ · m · g))</p>
                        <button onclick="calcularAngulo()">Calcular y Animar</button> 
                        <div id="physicsResults"></div>
                    </div>

                    <div class="animation-section">
                        <canvas id="physicsCanvas" width="400" height="300"></canvas>
                    </div>
                </div>
                `;
            break;
        case 'FFPNICIN':
            contenido.innerHTML = `
                <div class="simulator-container">
                    <div class="controls-section">
                        <h2>Fricción Cinética - Plano No Inclinado</h2>

                        <input type="number" id="masaInput" placeholder="Masa (kg)">
                        <input type="number" id="coefInput" placeholder="Coef. fricción cinética (μ)" step="0.01">

                        <p class="formula">Fórmula: F = μ · m · g</p>
                        <button onclick="calcularFriccionpn()">Calcular y Animar</button>
                        <div id="physicsResults"></div>
                    </div>

                    <div class="animation-section">
                        <canvas id="physicsCanvas" width="400" height="250"></canvas>
                    </div>
                </div>
                `;
            break;
        case 'CoefFriCinPNI':
            contenido.innerHTML = `
                <div class="simulator-container">
                    <div class="controls-section">
                        <h2>Plano Horizontal - Cálculo del Coeficiente de Fricción</h2>

                        <input type="number" id="fuerzaInput" placeholder="Fricción cinética (N)">
                        <input type="number" id="masaInput" placeholder="Masa (kg)">

                        <p class="formula">Fórmula: μ = F / (m · g)</p>
                        <button onclick="calcularCoeficientepni()">Calcular y Animar</button> 
                        <div id="physicsResults"></div>
                    </div>

                    <div class="animation-section">
                        <canvas id="physicsCanvas" width="400" height="250"></canvas>
                    </div>
                </div>
                `;
            break;
        case 'MasaCinPNI':
            contenido.innerHTML = `
                <div class="simulator-container">
                    <div class="controls-section">
                        <h2>Plano Horizontal - Cálculo de Masa</h2>

                        <input type="number" id="fuerzaInput" placeholder="Fricción cinética (N)">
                        <input type="number" step="0.01" id="coefInput" placeholder="Coef. fricción cinética (μ)">

                        <p class="formula">Fórmula: m = F / (μ · g)</p>
                        <button onclick="calcularMasapni()">Calcular y Animar</button> 
                        <div id="physicsResults"></div>
                    </div>

                    <div class="animation-section">
                        <canvas id="physicsCanvas" width="400" height="250"></canvas>
                    </div>
                </div>
                `;
            break;
        case 'SimulMCUNorm':
            contenido.innerHTML = `
                <div class="simulator-container">
                    <div class="controls-section">
                        <h2>Simulador de Movimiento Circular Uniforme (MCU)</h2>
                        <input type="number" id="masaInput" placeholder="Masa (kg)">
                        <input type="number" id="radioInput" placeholder="Radio (m)">
                        <input type="number" id="vueltasInput" placeholder="Número de vueltas">
                        <input type="number" id="tiempoInput" placeholder="Tiempo (s)">
                        <p class="formula">Fórmula: v = 2*π*r*n / t ; F = m*v² / r</p>
                        <button onclick="calcularMCU()">Calcular y Animar</button> 
                        <div id="physicsResults"></div>
                    </div>
                    <div class="animation-section">
                        <canvas id="physicsCanvas" width="400" height="300"></canvas>
                    </div>
                </div>`;
            break;
        case 'SimulMCURueda':
            contenido.innerHTML = `
                <div class="simulator-container">
                    <div class="controls-section">
                        <h2>MCU - Cálculo del Período de una Rueda</h2>
                        <input type="number" id="tiempoInput" placeholder="Tiempo total (s)">
                        <input type="number" id="vueltasInput" placeholder="Número de vueltas">
                        <p class="formula">Fórmula: T = t / n</p>
                        <button onclick="calcularPeriodo()">Calcular y Animar</button> 
                        <div id="physicsResults"></div>
                    </div>
                    <div class="animation-section">
                        <canvas id="physicsCanvas" width="400" height="300"></canvas>
                    </div>
                </div>`;
            break;
        case 'MCU_Frecuencia':
            contenido.innerHTML = `
                <div class="simulator-container">
                    <div class="controls-section">
                        <h2>MCU - Cálculo de la Frecuencia</h2>
                        <input type="number" id="vueltasInput" placeholder="Número de vueltas">
                        <input type="number" id="tiempoInput" placeholder="Tiempo total (s)">
                        <p class="formula">Fórmula: f = n / t</p>
                        <button onclick="calcularFrecuenciaMCU()">Calcular y Animar</button> 
                        <div id="physicsResults"></div>
                    </div>
                    <div class="animation-section">
                        <canvas id="physicsCanvas" width="400" height="300"></canvas>
                    </div>
                </div>`;
            break;
        case 'MCU_VelocidadTangencial':
            contenido.innerHTML = `
                <div class="simulator-container">
                    <div class="controls-section">
                        <h2>MCU - Velocidad Tangencial</h2>
                        <input type="number" id="radioInput" placeholder="Radio (m)">
                        <input type="number" id="vueltasInput" placeholder="Número de vueltas">
                        <input type="number" id="tiempoInput" placeholder="Tiempo total (s)">
                        <p class="formula">Fórmula: v = 2*π*r*n / t</p>
                        <button onclick="calcularVelocidadTangencialMCU()">Calcular y Animar</button> 
                        <div id="physicsResults"></div>
                    </div>
                    <div class="animation-section">
                        <canvas id="physicsCanvas" width="400" height="300"></canvas>
                    </div>
                </div>`;
            break;
        case 'MCU_Masa':
            contenido.innerHTML = `
                <div class="simulator-container">
                    <div class="controls-section">
                        <h2>MCU - Cálculo de Masa</h2>
                        <input type="number" id="fuerzaInput" placeholder="Fuerza centrípeta (N)">
                        <input type="number" id="radioInput" placeholder="Radio (m)">
                        <input type="number" id="velocidadInput" placeholder="Velocidad tangencial (m/s)">
                        <p class="formula">Fórmula: m = F · r / v²</p>
                        <button onclick="calcularMasaMCU()">Calcular y Animar</button> 
                        <div id="physicsResults"></div>
                    </div>
                    <div class="animation-section">
                        <canvas id="physicsCanvas" width="400" height="300"></canvas>
                    </div>
                </div>`;
            break;
        case 'MCU_Radio':
            contenido.innerHTML = `
                <div class="simulator-container">
                    <div class="controls-section">
                        <h2>MCU - Cálculo del Radio</h2>
                        <input type="number" id="masaInput" placeholder="Masa (kg)">
                        <input type="number" id="velocidadInput" placeholder="Velocidad tangencial (m/s)">
                        <input type="number" id="fuerzaInput" placeholder="Fuerza centrípeta (N)">
                        <p class="formula">Fórmula: r = m · v² / F</p>
                        <button onclick="calcularRadioMCU()">Calcular y Animar</button> 
                        <div id="physicsResults"></div>
                    </div>
                    <div class="animation-section">
                        <canvas id="physicsCanvas" width="400" height="300"></canvas>
                    </div>
                </div>`;
            break;
        case 'SimulWork':
            contenido.innerHTML = `
            <div class="simulator-container">
              <div class="controls-section">
                <h2>Trabajo</h2>
                <input type="number" id="fuerzaInput" placeholder="Fuerza (N)">
                <input type="number" id="distanciaInput" placeholder="Distancia (m)">
                <input type="number" id="anguloInput" placeholder="Ángulo (°)">
                <p><strong>Fórmula utilizada:</strong> W = F × d × cos(θ)</p>
                <button onclick="calcularYAnimartra()">Calcular y Animar</button>
                <div id="physicsResults"></div>
              </div>
              <div class="animation-section">
                <canvas id="physicsCanvas" width="400" height="300"></canvas>
              </div>
            </div>
            `;
            break;
        case 'SimulECin':
            contenido.innerHTML = `
            <div class="simulator-container">
              <div class="controls-section">
                <h2>Energía Cinética</h2>
                <input type="number" id="masaInput" placeholder="Masa (kg)">
                <input type="number" id="velocidadInput" placeholder="Velocidad (m/s)">
                <button onclick="calcularYAnimarECin()">Calcular y Animar</button>
                <div id="physicsResults"></div>
                <p><strong>Fórmula utilizada:</strong> K = ½ × m × v²</p>
              </div>
              <div class="animation-section">
                <canvas id="physicsCanvas" width="400" height="300"></canvas>
              </div>
            </div>
            `;
            break;
        case 'SimulEP':
            contenido.innerHTML = `
            <div class="simulator-container">
              <div class="controls-section">
                <h2>Energía Potencial</h2>
                <input type="number" id="masaInput" placeholder="Masa (kg)">
                <input type="number" id="alturaInput" placeholder="Altura (m)">
                <button onclick="calcularYAnimarEP()">Calcular y Animar</button>
                <div id="physicsResults"></div>
                <p><strong>Fórmula utilizada:</strong> U = m × g × h</p>
              </div>
              <div class="animation-section">
                <canvas id="physicsCanvas" width="400" height="300"></canvas>
              </div>
            </div>
            `;
            break;
        case 'SimulPot':
            contenido.innerHTML = `
            <div class="simulator-container">
              <div class="controls-section">
                <h2>Potencia</h2>
                <input type="number" id="trabajoInput" placeholder="Trabajo (J)">
                <input type="number" id="tiempoInput" placeholder="Tiempo (s)">
                <button onclick="calcularYAnimarPot()">Calcular y Animar</button>
                <div id="physicsResults"></div>
                <p><strong>Fórmula utilizada:</strong> P = W / t</p>
              </div>
              <div class="animation-section">
                <canvas id="physicsCanvas" width="400" height="300"></canvas>
              </div>
            </div>
            `;
            break;
        case 'SimulTrabajoNeto':
            contenido.innerHTML = `
            <div class="simulator-container">
              <div class="controls-section">
                <h2>Trabajo Neto</h2>
                <input type="number" id="masaInput" placeholder="Masa (kg)">
                <input type="number" id="viInput" placeholder="Velocidad inicial (m/s)">
                <input type="number" id="vfInput" placeholder="Velocidad final (m/s)">
                <button onclick="calcularYAnimarTrabajoNeto()">Calcular y Animar</button>
                <div id="physicsResults"></div>
                <p><strong>Fórmula utilizada:</strong> W<sub>neto</sub> = ½ × m × (v<sub>f</sub>² - v<sub>i</sub>²)</p>
              </div>
              <div class="animation-section">
                <canvas id="physicsCanvas" width="400" height="300"></canvas>
              </div>
            </div>
            `;
            break;
        case 'SimulConstK':
            contenido.innerHTML = `
            <div class="simulator-container">
              <div class="controls-section">
                <h2>Constante Elástica</h2>
                <input type="number" id="fuerzaInput" placeholder="Fuerza (N)">
                <input type="number" id="deformacionInput" placeholder="Deformación (m)">
                <button onclick="calcularYAnimarConstK()">Calcular y Animar</button>
                <div id="physicsResults"></div>
                <p><strong>Fórmula utilizada:</strong> k = F / x</p>
              </div>
              <div class="animation-section">
                <canvas id="physicsCanvas" width="400" height="300"></canvas>
              </div>
            </div>
            `;
            break;
        case 'ImpCCM':
            contenido.innerHTML = `
            <div class="simulator-container">
                <div class="controls-section">
                    <h2>Ímpetu - Cálculo de la Cantidad de Movimiento</h2>

                    <input type="number" id="masaInput" placeholder="Masa (kg)">
                    <input type="number" id="velocidadInput" placeholder="Velocidad (m/s)">

                    <p class="formula">Fórmula: p = m · v</p>
                        <button onclick="calcularImpetu()">Calcular y Animar</button> 
                    <div id="physicsResults"></div>
                </div>

                <div class="animation-section">
                    <canvas id="physicsCanvas" width="400" height="300"></canvas>
                </div>
            </div>
            `;
            break;
        case 'ImpSLN':
            contenido.innerHTML = `
            <div class="simulator-container">
                <div class="controls-section">
                    <h2>Fuerza - Segunda Ley de Newton</h2>

                    <input type="number" id="masaInput" placeholder="Masa (kg)">
                    <input type="number" id="aceleracionInput" placeholder="Aceleración (m/s²)">

                    <p class="formula">Fórmula: F = m · a</p>
                        <button onclick="calcularFuerza()">Calcular y Animar</button> 
                    <div id="physicsResults"></div>
                </div>

                <div class="animation-section">
                    <canvas id="physicsCanvas" width="400" height="300"></canvas>
                </div>
            </div>
            `;
            break;
        case 'ImpEK':
            contenido.innerHTML = `
            <div class="simulator-container">
                <div class="controls-section">
                    <h2>Energía Cinética</h2>

                    <input type="number" id="masaInput" placeholder="Masa (kg)">
                    <input type="number" id="velocidadInput" placeholder="Velocidad (m/s)">

                    <p class="formula">Fórmula: K = ½ · m · v²</p>
                        <button onclick="calcularEnergiaCinetica()">Calcular y Animar</button> 
                    <div id="physicsResults"></div>
                </div>

                <div class="animation-section">
                    <canvas id="physicsCanvas" width="400" height="300"></canvas>
                </div>
            </div>
            `;
            break;
        case 'impTraET':
            contenido.innerHTML = `
            <div class="simulator-container">
                <div class="controls-section">
                    <h2>Trabajo - Cálculo de Energía Transferida</h2>

                    <input type="number" id="fuerzaInput" placeholder="Fuerza (N)">
                    <input type="number" id="distanciaInput" placeholder="Distancia (m)">
                    <input type="number" id="anguloInput" placeholder="Ángulo (°)">

                    <p class="formula">Fórmula: W = F · d · cos(θ)</p>
                        <button onclick="calcularTrabajo()">Calcular y Animar</button> 
                    <div id="physicsResults"></div>
                </div>

                <div class="animation-section">
                    <canvas id="physicsCanvas" width="400" height="300"></canvas>
                </div>
            </div>
            `;
            break;
        case 'ImpCM':
            contenido.innerHTML = `
            <div class="simulator-container">
                <div class="controls-section">
                    <h2>Ímpetu - Cálculo de la Masa</h2>

                    <input type="number" id="impetuInput" placeholder="Ímpetu (kg·m/s)">
                    <input type="number" id="velocidadInput" placeholder="Velocidad (m/s)">

                    <p class="formula">Fórmula: m = p / v</p>
                        <button onclick="calcularMasaDesdeImpetu()">Calcular y Animar</button> 
                    <div id="physicsResults"></div>
                </div>

                <div class="animation-section">
                    <canvas id="physicsCanvas" width="400" height="300"></canvas>
                </div>
            </div>
            `;
            break;
        case 'ImpCV':
            contenido.innerHTML = `
            <div class="simulator-container">
                <div class="controls-section">
                    <h2>Ímpetu - Cálculo de la Velocidad</h2>

                    <input type="number" id="impetuInput" placeholder="Ímpetu (kg·m/s)">
                    <input type="number" id="masaInput" placeholder="Masa (kg)">

                    <p class="formula">Fórmula: v = p / m</p>
                        <button onclick="calcularVelocidadDesdeImpetu()">Calcular y Animar</button> 
                    <div id="physicsResults"></div>
                </div>

                <div class="animation-section">
                    <canvas id="physicsCanvas" width="400" height="300"></canvas>
                </div>
            </div>
            `;
            break;
        default:
            contenido.innerHTML = `
                <h2>${opcion}</h2>
                <p>Contenido para ${opcion}.</p>
            `;
    }
}



function calcularMasapni() {
    const fuerza = parseFloat(document.getElementById('fuerzaInput').value);
    const coef = parseFloat(document.getElementById('coefInput').value);
    const g = 9.81;

    if ([fuerza, coef].some(v => isNaN(v) || fuerza <= 0 || coef <= 0)) {
        mostrarError('Verifica que los valores sean válidos y positivos.');
        return;
    }

    const masa = fuerza / (coef * g);

    document.getElementById('physicsResults').innerHTML = `
        <h3>Resultados:</h3>
        <p><strong>Masa del objeto:</strong> ${masa.toFixed(2)} kg</p>
    `;

    startHorizontalAnimation(coef);
}
window.calcularMasapni = calcularMasapni;

function startHorizontalAnimation(coef) {
    const canvas = document.getElementById("physicsCanvas");
    const ctx = canvas.getContext("2d");
    cancelAnimationFrame(animationFrameId);

    let posX = 0;
    const posY = 160;
    const boxSize = 40;
    let vel = 6;                 // velocidad inicial (px/frame)
    const frenado = coef * 0.15; // desaceleración a = μ·g escalada a píxeles

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Piso
        ctx.fillStyle = "#555";
        ctx.fillRect(0, posY + boxSize / 2, canvas.width, 10);

        // Caja
        ctx.fillStyle = "#4caf50";
        ctx.fillRect(posX, posY, boxSize, boxSize);

        posX += vel;
        vel -= frenado;

        // La fricción detiene la caja (o se frena al llegar al borde)
        if (vel > 0 && posX < canvas.width - boxSize) {
            animationFrameId = requestAnimationFrame(draw);
        }
    }

    draw();
}
window.startHorizontalAnimation = startHorizontalAnimation;

function calcularCoeficientepni() {
    const fuerza = parseFloat(document.getElementById('fuerzaInput').value);
    const masa = parseFloat(document.getElementById('masaInput').value);
    const g = 9.81;

    if ([fuerza, masa].some(v => isNaN(v) || fuerza <= 0 || masa <= 0)) {
        mostrarError('Verifica que los valores sean válidos y positivos.');
        return;
    }

    const coef = fuerza / (masa * g);

    document.getElementById('physicsResults').innerHTML = `
        <h3>Resultados:</h3>
        <p><strong>Coeficiente de fricción (μ):</strong> ${coef.toFixed(3)}</p>
    `;

    startHorizontalAnimationpni(coef);
}
window.calcularCoeficientepni = calcularCoeficientepni;

function startHorizontalAnimationpni(coef) {
    const canvas = document.getElementById("physicsCanvas");
    const ctx = canvas.getContext("2d");
    cancelAnimationFrame(animationFrameId);

    let posX = 0;
    const posY = 160;
    const boxSize = 40;
    let vel = 6;                 // velocidad inicial (px/frame)
    const frenado = coef * 0.15; // desaceleración a = μ·g escalada a píxeles

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Piso
        ctx.fillStyle = "#555";
        ctx.fillRect(0, posY + boxSize / 2, canvas.width, 10);

        // Caja
        ctx.fillStyle = "#ff9800";
        ctx.fillRect(posX, posY, boxSize, boxSize);

        posX += vel;
        vel -= frenado;

        // La fricción detiene la caja (o se frena al llegar al borde)
        if (vel > 0 && posX < canvas.width - boxSize) {
            animationFrameId = requestAnimationFrame(draw);
        }
    }

    draw();
}
window.startHorizontalAnimationpni = startHorizontalAnimationpni;

function calcularFriccionpn() {
    const masa = parseFloat(document.getElementById('masaInput').value);
    const coef = parseFloat(document.getElementById('coefInput').value);
    const g = 9.81;

    if ([masa, coef].some(v => isNaN(v) || masa <= 0 || coef < 0)) {
        mostrarError('Ingresa valores válidos y positivos.');
        return;
    }

    const friccion = coef * masa * g;

    document.getElementById('physicsResults').innerHTML = `
        <h3>Resultado:</h3>
        <p><strong>Fuerza de fricción cinética:</strong> ${friccion.toFixed(2)} N</p>
    `;

    startHorizontalAnimationpn(coef);
}
window.calcularFriccionpn = calcularFriccionpn;

function startHorizontalAnimationpn(coef) {
    const canvas = document.getElementById("physicsCanvas");
    const ctx = canvas.getContext("2d");
    cancelAnimationFrame(animationFrameId);

    let posX = 0;
    const posY = 160;
    const boxSize = 40;
    let vel = 6;                 // velocidad inicial (px/frame)
    const frenado = coef * 0.15; // desaceleración a = μ·g escalada a píxeles

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Piso
        ctx.fillStyle = "#555";
        ctx.fillRect(0, posY + boxSize / 2, canvas.width, 10);

        // Caja
        ctx.fillStyle = "#00bcd4";
        ctx.fillRect(posX, posY, boxSize, boxSize);

        posX += vel;
        vel -= frenado;

        // La fricción detiene la caja (o se frena al llegar al borde)
        if (vel > 0 && posX < canvas.width - boxSize) {
            animationFrameId = requestAnimationFrame(draw);
        }
    }

    draw();
}
window.startHorizontalAnimationpn = startHorizontalAnimationpn;

function calcularMasa() {
    const fuerza = parseFloat(document.getElementById('fuerzaInput').value);
    const angulo = parseFloat(document.getElementById('anguloInput').value);
    const coef = parseFloat(document.getElementById('coefInput').value);
    const g = 9.81;

    if ([fuerza, angulo, coef].some(v => isNaN(v) || fuerza <= 0 || coef <= 0)) {
        mostrarError('Asegúrate de ingresar valores válidos y positivos.');
        return;
    }

    const anguloRad = angulo * (Math.PI / 180);
    const masa = fuerza / (coef * g * Math.cos(anguloRad));
    const aceleracion = g * (Math.sin(anguloRad) - coef * Math.cos(anguloRad));

    document.getElementById('physicsResults').innerHTML = `
        <h3>Resultados:</h3>
        <p><strong>Masa del objeto:</strong> ${masa.toFixed(2)} kg</p>
        <p><strong>Aceleración del objeto:</strong> ${aceleracion.toFixed(2)} m/s²</p>
    `;

    animarPlanoInclinado(anguloRad, aceleracion, "#2196f3");
}
window.calcularMasa = calcularMasa;

function animarPlanoInclinado(anguloRad, aceleracion, color) {
    const canvas = document.getElementById("physicsCanvas");
    const ctx = canvas.getContext("2d");
    cancelAnimationFrame(animationFrameId);

    const baseX = 50;
    const baseY = 250;
    const slopeLength = 300;
    const boxSize = 20;

    const acelPx = aceleracion * 0.01; // aceleración real (m/s²) escalada a píxeles
    let t = slopeLength;               // la caja parte desde lo alto del plano
    let vel = 0;

    function drawIncline() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Coordenadas finales del plano inclinado
        const endX = baseX + slopeLength * Math.cos(anguloRad);
        const endY = baseY - slopeLength * Math.sin(anguloRad);

        // Dibujar plano inclinado
        ctx.beginPath();
        ctx.moveTo(baseX, baseY);
        ctx.lineTo(endX, endY);
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#888";
        ctx.stroke();

        // Dibujar caja
        const posX = baseX + t * Math.cos(anguloRad);
        const posY = baseY - t * Math.sin(anguloRad);

        ctx.save();
        ctx.translate(posX, posY);
        ctx.rotate(-anguloRad);
        ctx.fillStyle = color;
        ctx.fillRect(-boxSize/2, -boxSize/2, boxSize, boxSize);
        ctx.restore();

        if (acelPx <= 0) {
            // La fricción supera a la componente del peso: no hay deslizamiento
            ctx.fillStyle = "#9e9e9e";
            ctx.font = "13px Arial";
            ctx.fillText("La fricción impide el deslizamiento (a ≤ 0)", 60, 30);
            return;
        }

        vel += acelPx;
        t -= vel;

        if (t > 0) {
            animationFrameId = requestAnimationFrame(drawIncline);
        }
    }

    drawIncline();
}
window.animarPlanoInclinado = animarPlanoInclinado;

function calcularCoeficiente() {
    const fuerza = parseFloat(document.getElementById('fuerzaInput').value);
    const masa = parseFloat(document.getElementById('masaInput').value);
    const angulo = parseFloat(document.getElementById('anguloInput').value);
    const g = 9.81;

    if ([fuerza, masa, angulo].some(v => isNaN(v) || masa <= 0 || fuerza <= 0)) {
        mostrarError('Valores inválidos. Masa y fuerza deben ser > 0');
        return;
    }

    const anguloRad = angulo * (Math.PI / 180);
    const coef = fuerza / (masa * g * Math.cos(anguloRad));

    // Validación física adicional
    if (coef < 0) {
        mostrarError('El coeficiente no puede ser negativo');
        return;
    }

    const aceleracion = g * (Math.sin(anguloRad) - coef * Math.cos(anguloRad));

    document.getElementById('physicsResults').innerHTML = `
        <h3>Resultados:</h3>
        <p><strong>Coeficiente de fricción cinética (μ):</strong> ${coef.toFixed(4)}</p>
        <p><strong>Ángulo del plano:</strong> ${angulo}°</p>
        <p><strong>Fuerza aplicada:</strong> ${fuerza.toFixed(2)} N</p>
        <p><strong>Aceleración del objeto:</strong> ${aceleracion.toFixed(2)} m/s²</p>
    `;

    animarPlanoInclinado(anguloRad, aceleracion, "#ff9800");
}
window.calcularCoeficiente = calcularCoeficiente;

function calcularAngulo() {
    const fuerza = parseFloat(document.getElementById('fuerzaInput').value);
    const masa = parseFloat(document.getElementById('masaInput').value);
    const coef = parseFloat(document.getElementById('coefInput').value);
    const g = 9.81;

    // Validaciones mejoradas
    if ([fuerza, masa, coef].some(isNaN) || masa <= 0 || coef <= 0) {
        mostrarError('Valores inválidos. Masa y coeficiente deben ser > 0');
        return;
    }

    // Fórmula CORREGIDA para fricción cinética:
    // F_fricción = μ * m * g * cosθ
    // Despejamos θ = arccos(F_fricción / (μ * m * g))
    const cosTheta = fuerza / (coef * masa * g);

    if (cosTheta > 1 || cosTheta < 0) {
        mostrarError('No existe solución real (cosθ debe estar entre 0 y 1)');
        return;
    }

    const anguloRad = Math.acos(cosTheta);
    const anguloDeg = anguloRad * (180 / Math.PI);
    const aceleracion = g * (Math.sin(anguloRad) - coef * Math.cos(anguloRad));

    document.getElementById('physicsResults').innerHTML = `
        <h3>Resultados:</h3>
        <p><strong>Ángulo del plano:</strong> ${anguloDeg.toFixed(2)}°</p>
        <p><strong>Fuerza de fricción cinética:</strong> ${fuerza.toFixed(2)} N</p>
        <p><strong>Coeficiente de fricción (μ):</strong> ${coef.toFixed(4)}</p>
        <p><strong>Aceleración del objeto:</strong> ${aceleracion.toFixed(2)} m/s²</p>
    `;

    animarPlanoInclinado(anguloRad, aceleracion, "#9c27b0");
}
window.calcularAngulo = calcularAngulo;

function calcularVelocidadDesdeImpetu() {
    const impetu = parseFloat(document.getElementById('impetuInput').value);
    const masa = parseFloat(document.getElementById('masaInput').value);

    if ([impetu, masa].some(v => isNaN(v) || v <= 0)) {
        mostrarError('Todos los valores deben ser mayores que cero');
        return;
    }

    const velocidad = impetu / masa;

    document.getElementById('physicsResults').innerHTML = `
        <h3>Resultados:</h3>
        <p><strong>Velocidad:</strong> ${velocidad.toFixed(2)} m/s</p>
    `;

    animarPelota(velocidad, "#28a745");
}
window.calcularVelocidadDesdeImpetu = calcularVelocidadDesdeImpetu;

// Pelota que avanza a una rapidez proporcional a la magnitud calculada.
// Si se indica una distancia, recorre esa distancia y se detiene; si no, repite el recorrido.
function animarPelota(rapidez, color, distancia) {
    const canvas = document.getElementById("physicsCanvas");
    const ctx = canvas.getContext("2d");
    cancelAnimationFrame(animationFrameId);

    const radius = 20;
    const vel = Math.max(1, Math.min(12, Math.abs(rapidez))); // px/frame, acotado para que se vea
    const metaX = distancia
        ? Math.min(canvas.width - radius, radius + distancia * 30)
        : null;
    let posX = radius;

    function drawObject() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.arc(posX, canvas.height / 2, radius, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();

        posX += vel;

        if (metaX !== null) {
            // Recorre la distancia indicada y se detiene
            if (posX < metaX) animationFrameId = requestAnimationFrame(drawObject);
        } else {
            // Movimiento continuo
            if (posX > canvas.width + radius) posX = -radius;
            animationFrameId = requestAnimationFrame(drawObject);
        }
    }

    drawObject();
}
window.animarPelota = animarPelota;

// Pelota que parte del reposo y acelera (2ª ley de Newton).
function animarPelotaAcelerada(aceleracion, color) {
    const canvas = document.getElementById("physicsCanvas");
    const ctx = canvas.getContext("2d");
    cancelAnimationFrame(animationFrameId);

    const radius = 20;
    const acel = Math.max(0.01, Math.min(0.4, aceleracion * 0.05)); // m/s² escalado a píxeles
    let posX = radius;
    let vel = 0;

    function drawObject() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.arc(posX, canvas.height / 2, radius, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();

        vel += acel;
        posX += vel;
        if (posX > canvas.width + radius) { posX = radius; vel = 0; }

        animationFrameId = requestAnimationFrame(drawObject);
    }

    drawObject();
}
window.animarPelotaAcelerada = animarPelotaAcelerada;

function calcularMasaDesdeImpetu() {
    const impetu = parseFloat(document.getElementById('impetuInput').value);
    const velocidad = parseFloat(document.getElementById('velocidadInput').value);

    if ([impetu, velocidad].some(v => isNaN(v) || v <= 0)) {
        mostrarError('Todos los valores deben ser mayores que cero');
        return;
    }

    const masa = impetu / velocidad;

    document.getElementById('physicsResults').innerHTML = `
        <h3>Resultados:</h3>
        <p><strong>Masa:</strong> ${masa.toFixed(2)} kg</p>
    `;

    animarPelota(velocidad, "#007bff");
}
window.calcularMasaDesdeImpetu = calcularMasaDesdeImpetu;

function calcularTrabajo() {
    const fuerza = parseFloat(document.getElementById('fuerzaInput').value);
    const distancia = parseFloat(document.getElementById('distanciaInput').value);
    const angulo = parseFloat(document.getElementById('anguloInput').value);

    if ([fuerza, distancia, angulo].some(v => isNaN(v) || distancia <= 0 || fuerza <= 0)) {
        mostrarError('Verifica que fuerza y distancia sean mayores que cero y que todos los valores sean válidos');
        return;
    }

    const anguloRad = angulo * (Math.PI / 180);
    const trabajo = fuerza * distancia * Math.cos(anguloRad);

    document.getElementById('physicsResults').innerHTML = `
        <h3>Resultados:</h3>
        <p><strong>Trabajo:</strong> ${trabajo.toFixed(2)} J</p>
    `;

    // Avanza la distancia ingresada a una rapidez proporcional a la fuerza
    animarPelota(fuerza, "#ffc107", distancia);
}
window.calcularTrabajo = calcularTrabajo;

function calcularEnergiaCinetica() {
    const masa = parseFloat(document.getElementById('masaInput').value);
    const velocidad = parseFloat(document.getElementById('velocidadInput').value);

    if ([masa, velocidad].some(v => isNaN(v) || v <= 0)) {
        mostrarError('Todos los valores deben ser mayores que cero');
        return;
    }

    const energia = 0.5 * masa * Math.pow(velocidad, 2);

    document.getElementById('physicsResults').innerHTML = `
        <h3>Resultados:</h3>
        <p><strong>Energía Cinética:</strong> ${energia.toFixed(2)} J</p>
    `;

    animarPelota(velocidad, "#6f42c1");
}
window.calcularEnergiaCinetica = calcularEnergiaCinetica;

function calcularFuerza() {
    const masa = parseFloat(document.getElementById('masaInput').value);
    const aceleracion = parseFloat(document.getElementById('aceleracionInput').value);

    if ([masa, aceleracion].some(v => isNaN(v) || v <= 0)) {
        mostrarError('Todos los valores deben ser mayores que cero');
        return;
    }

    const fuerza = masa * aceleracion;

    document.getElementById('physicsResults').innerHTML = `
        <h3>Resultados:</h3>
        <p><strong>Fuerza:</strong> ${fuerza.toFixed(2)} N</p>
    `;

    // La pelota acelera según la aceleración ingresada (F = m·a)
    animarPelotaAcelerada(aceleracion, "#ff9900");
}
window.calcularFuerza = calcularFuerza;

function calcularImpetu() {
    const masa = parseFloat(document.getElementById('masaInput').value);
    const velocidad = parseFloat(document.getElementById('velocidadInput').value);

    if ([masa, velocidad].some(v => isNaN(v) || v <= 0)) {
        mostrarError('Todos los valores deben ser mayores que cero');
        return;
    }

    const impetu = masa * velocidad;

    document.getElementById('physicsResults').innerHTML = `
        <h3>Resultados:</h3>
        <p><strong>Ímpetu:</strong> ${impetu.toFixed(2)} kg·m/s</p>
    `;

    animarPelota(velocidad, "#dc3545");
}
window.calcularImpetu = calcularImpetu;

function calcularFriccion() {
    const masa = parseFloat(document.getElementById('masaInput').value);
    const angulo = parseFloat(document.getElementById('anguloInput').value);
    const coef = parseFloat(document.getElementById('coefInput').value);
    const g = 9.81;

    if ([masa, angulo, coef].some(v => isNaN(v) || masa <= 0 || coef < 0)) {
        mostrarError('Verifica que los valores sean válidos y positivos');
        return;
    }

    const anguloRad = angulo * (Math.PI / 180);
    const friccion = coef * masa * g * Math.cos(anguloRad);
    const aceleracion = g * (Math.sin(anguloRad) - coef * Math.cos(anguloRad));

    document.getElementById('physicsResults').innerHTML = `
        <h3>Resultados:</h3>
        <p><strong>Fuerza de fricción:</strong> ${friccion.toFixed(2)} N</p>
        <p><strong>Aceleración del objeto:</strong> ${aceleracion.toFixed(2)} m/s²</p>
    `;

    animarPlanoInclinado(anguloRad, aceleracion, "#4caf50");
}
window.calcularFriccion = calcularFriccion;

function calcularRadioMCU() {
    const masa = parseFloat(document.getElementById('masaInput').value);
    const velocidad = parseFloat(document.getElementById('velocidadInput').value);
    const fuerza = parseFloat(document.getElementById('fuerzaInput').value);

    if ([masa, velocidad, fuerza].some(v => isNaN(v) || v <= 0)) {
        mostrarError('Por favor ingrese valores válidos (mayores que cero)');
        return;
    }

    const radio = (masa * Math.pow(velocidad, 2)) / fuerza;
    const velocidadAngular = velocidad / radio;
    const periodo = (2 * Math.PI) / velocidadAngular;
    const frecuencia = 1 / periodo;
    const aceleracionCentripeta = Math.pow(velocidad, 2) / radio;

    document.getElementById('physicsResults').innerHTML = `
        <h3>Resultados:</h3>
        <ul>
            <li><strong>Radio de trayectoria:</strong> ${radio.toFixed(2)} m</li>
            <li><strong>Velocidad angular:</strong> ${velocidadAngular.toFixed(2)} rad/s</li>
            <li><strong>Período:</strong> ${periodo.toFixed(2)} s</li>
            <li><strong>Frecuencia:</strong> ${frecuencia.toFixed(2)} Hz</li>
            <li><strong>Aceleración centrípeta:</strong> ${aceleracionCentripeta.toFixed(2)} m/s²</li>
        </ul>
        <p class="formula">Fórmula: r = m·v²/F</p>
    `;

    animarMCU(radio, velocidadAngular);
}
window.calcularRadioMCU = calcularRadioMCU;

function calcularMasaMCU() {
    const fuerza = parseFloat(document.getElementById('fuerzaInput').value);
    const radio = parseFloat(document.getElementById('radioInput').value);
    const velocidad = parseFloat(document.getElementById('velocidadInput').value);

    if ([fuerza, radio, velocidad].some(v => isNaN(v)) || [fuerza, radio, velocidad].some(v => v <= 0)) {
        mostrarError('Ingrese valores válidos (mayores que cero)');
        return;
    }

    const masa = (fuerza * radio) / Math.pow(velocidad, 2);
    const velocidadAngular = velocidad / radio;
    const periodo = (2 * Math.PI) / velocidadAngular;
    const frecuencia = 1 / periodo;
    const aceleracionCentripeta = Math.pow(velocidad, 2) / radio;

    document.getElementById('physicsResults').innerHTML = `
        <h3>Resultados:</h3>
        <ul>
            <li><strong>Masa:</strong> ${masa.toFixed(2)} kg</li>
            <li><strong>Velocidad angular:</strong> ${velocidadAngular.toFixed(2)} rad/s</li>
            <li><strong>Aceleración centrípeta:</strong> ${aceleracionCentripeta.toFixed(2)} m/s²</li>
            <li><strong>Período:</strong> ${periodo.toFixed(2)} s</li>
            <li><strong>Frecuencia:</strong> ${frecuencia.toFixed(2)} Hz</li>
        </ul>
        <p class="note">Fórmula utilizada: F = m·v²/r → m = F·r/v²</p>
    `;

    animarMCU(radio, velocidadAngular);
}
window.calcularMasaMCU = calcularMasaMCU;

function calcularVelocidadTangencialMCU() {
    const radio = parseFloat(document.getElementById('radioInput').value);
    const vueltas = parseFloat(document.getElementById('vueltasInput').value);
    const tiempo = parseFloat(document.getElementById('tiempoInput').value);

    if ([radio, vueltas, tiempo].some(v => isNaN(v) || radio <= 0 || vueltas <= 0 || tiempo <= 0)) {
        mostrarError('Por favor ingrese valores válidos (mayores que cero)');
        return;
    }

    const trayectoria = 2 * Math.PI * radio * vueltas;
    const velocidadTangencial = trayectoria / tiempo;
    const periodo = tiempo / vueltas;
    const frecuencia = vueltas / tiempo;
    const velocidadAngular = velocidadTangencial / radio;
    const aceleracionCentripeta = Math.pow(velocidadTangencial, 2) / radio;

    document.getElementById('physicsResults').innerHTML = `
        <h3>Resultados:</h3>
        <ul>
            <li><strong>Velocidad tangencial:</strong> ${velocidadTangencial.toFixed(2)} m/s</li>
            <li><strong>Velocidad angular:</strong> ${velocidadAngular.toFixed(2)} rad/s</li>
            <li><strong>Aceleración centrípeta:</strong> ${aceleracionCentripeta.toFixed(2)} m/s²</li>
            <li><strong>Período:</strong> ${periodo.toFixed(2)} s</li>
            <li><strong>Frecuencia:</strong> ${frecuencia.toFixed(2)} Hz</li>
            <li><strong>Trayectoria recorrida:</strong> ${trayectoria.toFixed(2)} m</li>
        </ul>
    `;

    animarMCUr(velocidadAngular, radio);
}
window.calcularVelocidadTangencialMCU = calcularVelocidadTangencialMCU;

function animarMCUr(velocidadAngular, radio) {
    const canvas = document.getElementById("physicsCanvas");
    const ctx = canvas.getContext("2d");
    cancelAnimationFrame(animationFrameId);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    // El radio del dibujo escala con el radio real, acotado al canvas
    const radioPx = Math.max(20, Math.min(canvas.height / 2 - 20, radio * 20));

    let angle = 0;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Trazo de trayectoria circular
        ctx.beginPath();
        ctx.arc(centerX, centerY, radioPx, 0, 2 * Math.PI);
        ctx.strokeStyle = '#aaa';
        ctx.stroke();

        // Posición del objeto (caja)
        const x = centerX + radioPx * Math.cos(angle);
        const y = centerY + radioPx * Math.sin(angle);

        // Dibujo del objeto
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, 2 * Math.PI);
        ctx.fillStyle = '#FF5733';
        ctx.fill();

        // Dibujo del radio
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = '#888';
        ctx.stroke();

        // Dibujo del vector velocidad tangencial
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(
            x + 20 * Math.cos(angle + Math.PI / 2),
            y + 20 * Math.sin(angle + Math.PI / 2)
        );
        ctx.strokeStyle = '#4da6ff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Avanzar el ángulo según la velocidad angular
        angle += velocidadAngular * 0.05;

        // Loop de animación
        animationFrameId = requestAnimationFrame(draw);
    }

    draw();
}
window.animarMCUr = animarMCUr;

function calculateFFEst() { //Calculo de Fuerza de Fricción estática
    const mass = parseFloat(document.getElementById('massInput').value);
    const mu = parseFloat(document.getElementById('frictionCoefficientInput').value);

    if (isNaN(mass) || isNaN(mu) || mass <= 0 || mu <= 0) {
        document.getElementById('physicsResults').innerHTML = `
            <p style="color: #ff5252;">Error: Ingrese valores numéricos mayores que cero</p>
        `;
        return;
    }

    const g = 9.81;
    const weight = mass * g;

    const normalForce = weight;
    const frictionForce = mu * normalForce;

    document.getElementById('physicsResults').innerHTML = `
        <h3>Resultados:</h3>
        <p><strong>Peso:</strong> ${weight.toFixed(2)} N</p>
        <p><strong>Fuerza Normal:</strong> ${normalForce.toFixed(2)} N</p>
        <p><strong>Fuerza de Fricción:</strong> ${frictionForce.toFixed(2)} N</p>
    `;
}
window.calculateFFEst = calculateFFEst;

function calculateMassEst() { //Cálculo de Masa de Fricción Estática
    const frictionForce = parseFloat(document.getElementById('frictionForceInput').value);
    const mu = parseFloat(document.getElementById('frictionCoefficientInput').value);

    if (isNaN(frictionForce) || isNaN(mu) || frictionForce <= 0 || mu <= 0) {
        mostrarError('Los valores deben ser mayores que cero');
        return;
    }

    const g = 9.81;
    const aux = mu * g;
    const mass = frictionForce / aux;
    const weight = mass * g;
    const normalForce = weight;

    document.getElementById('physicsResults').innerHTML = `
        <h3>Resultados:</h3>
        <p><strong>Peso:</strong> ${weight.toFixed(2)} N</p>
        <p><strong>Fuerza Normal:</strong> ${normalForce.toFixed(2)} N</p>
        <p><strong>Masa:</strong> ${mass.toFixed(2)} kg</p>
    `;
}
window.calculateMassEst = calculateMassEst;

function calculateFricCoefEst() { //Cálculo de Coeficiente de Fricción estática
    const frictionForce = parseFloat(document.getElementById('frictionForceInput').value);
    const mass = parseFloat(document.getElementById('massInput').value);

    if (isNaN(frictionForce) || isNaN(mass) || mass <= 0 || frictionForce <= 0) {
        mostrarError('Los valores deben ser mayores que cero');
        return;
    }

    const g = 9.81;
    const weight = mass * g;
    const normalForce = weight;
    const mu = frictionForce / normalForce;

    document.getElementById('physicsResults').innerHTML = `
        <h3>Resultados:</h3>
        <p><strong>Peso:</strong> ${weight.toFixed(2)} N</p>
        <p><strong>Fuerza Normal:</strong> ${normalForce.toFixed(2)} N</p>
        <p><strong>Coeficiente de Fricción (μ):</strong> ${mu.toFixed(4)}</p>
    `;
}
window.calculateFricCoefEst = calculateFricCoefEst;

function calculateAndAnimateFFEstPI() {
    const mass = parseFloat(document.getElementById('massInput').value);
    const mu = parseFloat(document.getElementById('frictionCoefficientInput').value);
    const angleInput = document.getElementById('angleInput').value;
    const distanceInput = document.getElementById('distanceInput').value;

    let angle = parseFloat(angleInput);
    let distance = parseFloat(distanceInput);

    if (isNaN(mass) || isNaN(mu) || mass <= 0 || mu <= 0) {
        mostrarError('Los valores deben ser mayores que cero');
        return;
    }

    // Si no se proporciona ángulo o distancia, usar valores por defecto
    angle = isNaN(angle) ? 30 : angle;
    distance = isNaN(distance) ? 5 : distance;

    const g = 9.81;
    const weight = mass * g;
    const angleRad = angle * Math.PI / 180;

    const normalForce = weight * Math.cos(angleRad);
    const frictionForce = mu * normalForce;
    const weightComponent = weight * Math.sin(angleRad);

    document.getElementById('physicsResults').innerHTML = `
        <h3>Resultados:</h3>
        <p><strong>Peso:</strong> ${weight.toFixed(2)} N</p>
        <p><strong>Fuerza Normal:</strong> ${normalForce.toFixed(2)} N</p>
        <p><strong>Fuerza de Fricción Estática:</strong> ${frictionForce.toFixed(2)} N</p>
        <p><strong>Componente del peso paralela al plano:</strong> ${weightComponent.toFixed(2)} N</p>
        <p>${weightComponent <= frictionForce ? 
            "El objeto permanecerá en reposo (fricción estática)" : 
            "El objeto comenzará a moverse (fricción cinética)"}</p>
    `;

    startAnimation(angle, distance, angleRad);
}
window.calculateAndAnimateFFEstPI = calculateAndAnimateFFEstPI;

function calculateAndAnimateAngle() {
    const frictionForce = parseFloat(document.getElementById('frictionForceInput').value);
    const mass = parseFloat(document.getElementById('massInput').value);
    const mu = parseFloat(document.getElementById('frictionCoefficientInput').value);

    if (isNaN(frictionForce) || isNaN(mass) || isNaN(mu) || mass <= 0 || mu <= 0) {
        mostrarError('Los valores deben ser mayores que cero');
        return;
    }

    const g = 9.81;
    const weight = mass * g;
    const normalForce = weight; 

    const cosTheta = frictionForce / (mu * normalForce);

    if (Math.abs(cosTheta) > 1) {
        mostrarError('No existe solución real para estos valores (cosθ debe estar entre -1 y 1)');
        return;
    }

    const angleRad = Math.acos(cosTheta);
    const angle = angleRad * (180 / Math.PI);

    document.getElementById('physicsResults').innerHTML = `
        <h3>Resultados:</h3>
        <p><strong>Peso:</strong> ${weight.toFixed(2)} N</p>
        <p><strong>Fuerza Normal:</strong> ${normalForce.toFixed(2)} N</p>
        <p><strong>Ángulo calculado:</strong> ${angle.toFixed(2)}°</p>
    `;

    // Usar valores por defecto para distancia si se quiere animar
    startAnimation(angle, 5, angleRad);
}
window.calculateAndAnimateAngle = calculateAndAnimateAngle;

function calculateAndAnimateMassPI() { //Base de todo
    const angle = parseFloat(document.getElementById('angleInput').value);
    const frictionForce = parseFloat(document.getElementById('frictionForceInput').value);

    if (isNaN(frictionForce) || isNaN(angle) || angle <= 0) {
        mostrarError('Los valores deben ser mayores que cero');
        return;
    }

    const g = 9.81;
    const angleRad = angle * Math.PI / 180;
    const sinAngle = Math.sin(angleRad);

    const mass = frictionForce / (g * sinAngle);
    const weight = mass * g;

    document.getElementById('physicsResults').innerHTML = `
        <h3>Resultados:</h3>
        <p><strong>Peso:</strong> ${weight.toFixed(2)} N</p>
        <p><strong>Masa:</strong> ${mass.toFixed(2)} kg</p>
        <p><strong>Fuerza de Fricción:</strong> ${frictionForce.toFixed(2)} N</p>

    `;

    startAnimation(angle, 5, angleRad);
}
window.calculateAndAnimateMassPI = calculateAndAnimateMassPI;

function calculateAndAnimateFrictionCoefficient() {
    const angle = parseFloat(document.getElementById('angleInput').value);
    const mass = parseFloat(document.getElementById('massInput').value);

    if (isNaN(angle) || isNaN(mass) || mass <= 0) {
        mostrarError('Por favor ingrese valores válidos (ángulo y masa > 0)');
        return;
    }

    const g = 9.81;
    const angleRad = angle * Math.PI / 180; // Convertir a radianes

    // Cálculo del coeficiente de fricción estática mínimo requerido para evitar el deslizamiento
    const minFrictionCoefficient = Math.tan(angleRad);

    const weight = mass * g;
    const normalForce = weight * Math.cos(angleRad);
    const frictionForceNeeded = weight * Math.sin(angleRad); // Fuerza necesaria para equilibrar

    // Resultado teórico (μ mínimo requerido)
    const theoreticalFrictionForce = minFrictionCoefficient * normalForce;

    document.getElementById('physicsResults').innerHTML = `
        <h3>Resultados:</h3>
        <p><strong>Peso:</strong> ${weight.toFixed(2)} N</p>
        <p><strong>Fuerza Normal:</strong> ${normalForce.toFixed(2)} N</p>
        <p><strong>Componente del peso paralela al plano:</strong> ${frictionForceNeeded.toFixed(2)} N</p>
        <p><strong>Coeficiente de Fricción Mínimo (μ) requerido:</strong> ${minFrictionCoefficient.toFixed(4)}</p>
        <p>Para que el objeto no deslice, el coeficiente de fricción estática real debe ser ≥ ${minFrictionCoefficient.toFixed(4)}</p>
    `;

    // Usar valores por defecto para la animación
    const distance = 5; // metros
    startAnimation(angle, distance, angleRad);
}
window.calculateAndAnimateFrictionCoefficient = calculateAndAnimateFrictionCoefficient;

function calcularMCU() {
    const masa = parseFloat(document.getElementById("masaInput").value);
    const radio = parseFloat(document.getElementById("radioInput").value);
    const vueltas = parseFloat(document.getElementById("vueltasInput").value);
    const tiempo = parseFloat(document.getElementById("tiempoInput").value);
    const resultadoDiv = document.getElementById("physicsResults");

    if ([masa, radio, vueltas, tiempo].some(v => isNaN(v) || v <= 0)) {
        resultadoDiv.innerHTML = "<p style='color:#ff5252;'>Completa todos los campos correctamente.</p>";
        return;
    }

    const periodo = tiempo / vueltas;
    const frecuencia = 1 / periodo;
    const trayectoriaRecorrida = 2 * Math.PI * radio * vueltas;
    const velocidadTangencial = trayectoriaRecorrida / tiempo;
    const velocidadAngular = (2 * Math.PI) / periodo;
    const aceleracionCentripeta = Math.pow(velocidadTangencial, 2) / radio;
    const fuerzaCentripeta = masa * aceleracionCentripeta;

    resultadoDiv.innerHTML = `
        <h3>Resultados MCU:</h3>
        <ul>
            <li><strong>Periodo (T):</strong> ${periodo.toFixed(2)} s</li>
            <li><strong>Frecuencia (f):</strong> ${frecuencia.toFixed(2)} Hz</li>
            <li><strong>Velocidad tangencial (v):</strong> ${velocidadTangencial.toFixed(2)} m/s</li>
            <li><strong>Velocidad angular (ω):</strong> ${velocidadAngular.toFixed(2)} rad/s</li>
            <li><strong>Aceleración centrípeta:</strong> ${aceleracionCentripeta.toFixed(2)} m/s²</li>
            <li><strong>Fuerza centrípeta:</strong> ${fuerzaCentripeta.toFixed(2)} N</li>
            <li><strong>Trayectoria recorrida:</strong> ${trayectoriaRecorrida.toFixed(2)} m</li>
        </ul>
    `;
    
    animarMCU(radio, velocidadAngular);
}
window.calcularMCU = calcularMCU;

function calcularPeriodo() {
    const tiempo = parseFloat(document.getElementById('tiempoInput').value);
    const vueltas = parseFloat(document.getElementById('vueltasInput').value);

    if (isNaN(tiempo) || isNaN(vueltas) || tiempo <= 0 || vueltas <= 0) {
        mostrarError('Por favor ingrese valores válidos (mayores que cero)');
        return;
    }

    const periodo = tiempo / vueltas;
    const frecuencia = 1 / periodo;
    const velocidadAngular = (2 * Math.PI) / periodo;

    document.getElementById('physicsResults').innerHTML = `
        <h3>Resultados:</h3>
        <ul>
            <li><strong>Período (T):</strong> ${periodo.toFixed(2)} segundos</li>
            <li><strong>Frecuencia (f):</strong> ${frecuencia.toFixed(2)} Hz</li>
            <li><strong>Velocidad angular (ω):</strong> ${velocidadAngular.toFixed(2)} rad/s</li>
        </ul>
    `;

    animarMCURdef(velocidadAngular);
}
window.calcularPeriodo = calcularPeriodo;

function calcularFrecuenciaMCU() {
    const vueltas = parseFloat(document.getElementById('vueltasInput').value);
    const tiempo = parseFloat(document.getElementById('tiempoInput').value);

    if (isNaN(vueltas) || isNaN(tiempo) || vueltas <= 0 || tiempo <= 0) {
        mostrarError('Por favor ingrese valores válidos (mayores que cero)');
        return;
    }

    const frecuencia = vueltas / tiempo;
    const periodo = 1 / frecuencia;
    const velocidadAngular = 2 * Math.PI * frecuencia;

    document.getElementById('physicsResults').innerHTML = `
        <h3>Resultados:</h3>
        <ul>
            <li><strong>Frecuencia (f):</strong> ${frecuencia.toFixed(2)} Hz</li>
            <li><strong>Período (T):</strong> ${periodo.toFixed(2)} s</li>
            <li><strong>Velocidad angular (ω):</strong> ${velocidadAngular.toFixed(2)} rad/s</li>
        </ul>
    `;

    animarMCURdef(velocidadAngular);
}
window.calcularFrecuenciaMCU = calcularFrecuenciaMCU;

function animarMCURdef(velocidadAngular, radio = 30) { // Radio por defecto 30px
    const canvas = document.getElementById("physicsCanvas");
    const ctx = canvas.getContext("2d");
    cancelAnimationFrame(animationFrameId);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radioPx = Math.min(30, radio * 10); // Escalar el radio para visualización
    let angle = 0;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dibujar trayectoria circular
        ctx.beginPath();
        ctx.arc(centerX, centerY, radioPx, 0, 2 * Math.PI);
        ctx.strokeStyle = '#aaa';
        ctx.stroke();

        // Dibujar objeto
        ctx.beginPath();
        const x = centerX + radioPx * Math.cos(angle);
        const y = centerY + radioPx * Math.sin(angle);
        ctx.arc(x, y, 8, 0, 2 * Math.PI);
        ctx.fillStyle = '#FF5733';
        ctx.fill();

        // Dibujar radio
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = '#888';
        ctx.stroke();

        // Dibujar vector velocidad (tangente)
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(
            x + 20 * Math.cos(angle + Math.PI/2),
            y + 20 * Math.sin(angle + Math.PI/2)
        );
        ctx.strokeStyle = '#4da6ff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Actualizar ángulo según velocidad angular
        angle += velocidadAngular * 0.05;

        animationFrameId = requestAnimationFrame(draw);
    }

    draw();
}
window.animarMCURdef = animarMCURdef;

function animarMCU(radio, velocidadAngular) {
    const canvas = document.getElementById("physicsCanvas");
    const ctx = canvas.getContext("2d");
    cancelAnimationFrame(animationFrameId);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    // El radio del dibujo escala con el radio real, acotado al canvas
    const radioPx = Math.max(20, Math.min(canvas.height / 2 - 20, radio * 20));
    let angle = 0;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dibujar trayectoria circular
        ctx.beginPath();
        ctx.arc(centerX, centerY, radioPx, 0, 2 * Math.PI);
        ctx.strokeStyle = '#aaa';
        ctx.stroke();

        // Dibujar objeto
        ctx.beginPath();
        const x = centerX + radioPx * Math.cos(angle);
        const y = centerY + radioPx * Math.sin(angle);
        ctx.arc(x, y, 8, 0, 2 * Math.PI);
        ctx.fillStyle = '#FF5733';
        ctx.fill();

        // Dibujar radio
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = '#888';
        ctx.stroke();

        // Dibujar vector velocidad (tangente)
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(
            x + 20 * Math.cos(angle + Math.PI/2),
            y + 20 * Math.sin(angle + Math.PI/2)
        );
        ctx.strokeStyle = '#4da6ff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Actualizar ángulo según velocidad angular
        angle += velocidadAngular * 0.05;

        animationFrameId = requestAnimationFrame(draw);
    }

    draw();
}
window.animarMCU = animarMCU;

function calcularYAnimartra() {
  const F = parseFloat(document.getElementById('fuerzaInput').value);
  const d = parseFloat(document.getElementById('distanciaInput').value);
  const ang = parseFloat(document.getElementById('anguloInput').value);

  if (isNaN(F) || isNaN(d) || isNaN(ang)) {
    mostrarError("Completa todos los campos correctamente");
    return;
  }

  const rad = ang * Math.PI / 180;
  const trabajo = F * d * Math.cos(rad);

  document.getElementById('physicsResults').innerHTML = `
    <h3>Resultados:</h3>
    <p><strong>Trabajo:</strong> ${trabajo.toFixed(2)} J</p>
  `;

  animarCajatra(d);
}
window.calcularYAnimartra = calcularYAnimartra;

function animarCajatra(distancia) {
  const canvas = document.getElementById("physicsCanvas");
  const ctx = canvas.getContext("2d");
  cancelAnimationFrame(animationFrameId);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let x = 20;
  const y = canvas.height / 2 - 20;
  const ancho = 40;
  const alto = 40;
  const dx = (distancia / 10);

  function mover() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#42a5f5";
    ctx.fillRect(x, y, ancho, alto);
    x += dx;
    if (x < canvas.width - ancho - 20) {
      animationFrameId = requestAnimationFrame(mover);
    }
  }

  mover();
}
window.animarCajatra = animarCajatra;

function calcularYAnimarECin() {
  const m = parseFloat(document.getElementById('masaInput').value);
  const v = parseFloat(document.getElementById('velocidadInput').value);

  if (isNaN(m) || isNaN(v)) {
    mostrarError("Completa todos los campos correctamente");
    return;
  }

  const energia = 0.5 * m * v * v;

  document.getElementById('physicsResults').innerHTML = `
    <h3>Resultados:</h3>
    <p><strong>Energía Cinética:</strong> ${energia.toFixed(2)} J</p>
  `;

  animarVelocidadECin(v);
}
window.calcularYAnimarECin = calcularYAnimarECin;

function animarVelocidadECin(velocidad) {
  const canvas = document.getElementById("physicsCanvas");
  const ctx = canvas.getContext("2d");
  cancelAnimationFrame(animationFrameId);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let x = 20;
  const y = canvas.height / 2 - 20;
  const ancho = 40;
  const alto = 40;
  const dx = Math.min(velocidad, 10);

  function mover() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#66bb6a";
    ctx.fillRect(x, y, ancho, alto);
    x += dx;
    if (x < canvas.width - ancho - 20) {
      animationFrameId = requestAnimationFrame(mover);
    }
  }

  mover();
}
window.animarVelocidadECin = animarVelocidadECin;

function calcularYAnimarEP() {
  const m = parseFloat(document.getElementById('masaInput').value);
  const h = parseFloat(document.getElementById('alturaInput').value);
  const g = 9.81;

  if (isNaN(m) || isNaN(h)) {
    mostrarError("Completa todos los campos correctamente");
    return;
  }

  const energia = m * g * h;

  document.getElementById('physicsResults').innerHTML = `
    <h3>Resultados:</h3>
    <p><strong>Energía Potencial:</strong> ${energia.toFixed(2)} J</p>
  `;

  animarCaidaEP(h);
}
window.calcularYAnimarEP = calcularYAnimarEP;

function animarCaidaEP(altura) {
  const canvas = document.getElementById("physicsCanvas");
  const ctx = canvas.getContext("2d");
  cancelAnimationFrame(animationFrameId);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let y = 10;
  const x = canvas.width / 2 - 20;
  const alto = 40;
  const ancho = 40;
  const maxY = Math.min(altura * 20, canvas.height - alto - 10);
  let vel = 0;
  const g = 0.3; // aceleración de la gravedad escalada a píxeles

  function caer() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Suelo
    ctx.fillStyle = "#555";
    ctx.fillRect(0, maxY + alto, canvas.width, 10);

    ctx.fillStyle = "#ab47bc";
    ctx.fillRect(x, y, ancho, alto);

    vel += g;   // la caída acelera (caída libre)
    y += vel;

    if (y < maxY) {
      animationFrameId = requestAnimationFrame(caer);
    } else {
      // Se detiene justo sobre el suelo
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#555";
      ctx.fillRect(0, maxY + alto, canvas.width, 10);
      ctx.fillStyle = "#ab47bc";
      ctx.fillRect(x, maxY, ancho, alto);
    }
  }

  caer();
}
window.animarCaidaEP = animarCaidaEP;

function calcularYAnimarPot() {
  const W = parseFloat(document.getElementById('trabajoInput').value);
  const t = parseFloat(document.getElementById('tiempoInput').value);

  if (isNaN(W) || isNaN(t) || t <= 0) {
    mostrarError("Completa todos los campos correctamente (tiempo > 0)");
    return;
  }

  const potencia = W / t;

  document.getElementById('physicsResults').innerHTML = `
    <h3>Resultados:</h3>
    <p><strong>Potencia:</strong> ${potencia.toFixed(2)} W</p>
  `;

  animarMedidorPot(potencia);
}
window.calcularYAnimarPot = calcularYAnimarPot;

function animarMedidorPot(potencia) {
  const canvas = document.getElementById("physicsCanvas");
  const ctx = canvas.getContext("2d");
  cancelAnimationFrame(animationFrameId);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const barraMax = Math.min(potencia, 300);
  let valor = 0;

  function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fb8c00";
    ctx.fillRect(50, canvas.height - valor, 80, valor);
    valor += 2;
    if (valor <= barraMax) {
      animationFrameId = requestAnimationFrame(animar);
    }
  }

  animar();
}
window.animarMedidorPot = animarMedidorPot;

function calcularYAnimarTrabajoNeto() {
  const m = parseFloat(document.getElementById('masaInput').value);
  const vi = parseFloat(document.getElementById('viInput').value);
  const vf = parseFloat(document.getElementById('vfInput').value);

  if (isNaN(m) || isNaN(vi) || isNaN(vf)) {
    mostrarError("Completa todos los campos correctamente");
    return;
  }

  const trabajoNeto = 0.5 * m * (vf * vf - vi * vi);

  document.getElementById('physicsResults').innerHTML = `
    <h3>Resultados:</h3>
    <p><strong>Trabajo Neto:</strong> ${trabajoNeto.toFixed(2)} J</p>
  `;

  animarCambioVelocidadTrabajoNeto(vi, vf);
}
window.calcularYAnimarTrabajoNeto = calcularYAnimarTrabajoNeto;

function animarCambioVelocidadTrabajoNeto(vi, vf) {
  const canvas = document.getElementById("physicsCanvas");
  const ctx = canvas.getContext("2d");
  cancelAnimationFrame(animationFrameId);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let x = 20;
  const y = canvas.height / 2 - 20;
  const ancho = 40;
  const alto = 40;
  const aceleracion = (vf - vi) / 60;
  let velocidad = vi;

  function mover() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#7e57c2";
    ctx.fillRect(x, y, ancho, alto);
    x += velocidad / 2;
    velocidad += aceleracion;
    if (x < canvas.width - ancho - 20) {
      animationFrameId = requestAnimationFrame(mover);
    }
  }

  mover();
}
window.animarCambioVelocidadTrabajoNeto = animarCambioVelocidadTrabajoNeto;

function calcularYAnimarConstK() {
  const F = parseFloat(document.getElementById('fuerzaInput').value);
  const x = parseFloat(document.getElementById('deformacionInput').value);

  if (isNaN(F) || isNaN(x) || x === 0) {
    mostrarError("Completa todos los campos correctamente (deformación ≠ 0)");
    return;
  }

  const k = F / x;

  document.getElementById('physicsResults').innerHTML = `
    <h3>Resultados:</h3>
    <p><strong>Constante Elástica:</strong> ${k.toFixed(2)} N/m</p>
  `;

  animarResorteConstK(x);
}
window.calcularYAnimarConstK = calcularYAnimarConstK;

function animarResorteConstK(deformacion) {
  const canvas = document.getElementById("physicsCanvas");
  const ctx = canvas.getContext("2d");
  cancelAnimationFrame(animationFrameId);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const yBase = 80;
  const alturaFinal = yBase + deformacion * 100;
  let y = yBase;

  function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Línea del resorte
    ctx.beginPath();
    ctx.moveTo(190, 0);
    ctx.lineTo(190, y);
    ctx.strokeStyle = '#0288d1';
    ctx.lineWidth = 5;
    ctx.stroke();

    // Caja colgando
    ctx.fillStyle = '#4dd0e1';
    ctx.fillRect(170, y, 40, 40);

    if (y < alturaFinal) {
      y += 2;
      animationFrameId = requestAnimationFrame(animar);
    }
  }

  animar();
}
window.animarResorteConstK = animarResorteConstK;

function startAnimation(angle, distance, angleRad) { //Parte de la animación
    const canvas = document.getElementById('physicsCanvas');
    const ctx = canvas.getContext('2d');
    cancelAnimationFrame(animationFrameId);

    // Ajustar dimensiones del canvas para el nuevo diseño
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const startX = 50;
    const startY = 50;
    const planeLength = Math.min(300, canvasWidth - startX - 50);
    const boxSize = 20;
    const floorY = startY + planeLength * Math.sin(angleRad);

    const maxDistancePx = (distance / 5) * planeLength;
    const speed = 1.5;
    let position = 0;

    function drawArrow(x, y, dx, dy, color, text) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + dx, y + dy);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Flecha
        const arrowAngle = Math.atan2(dy, dx);
        const headLength = 8;
        ctx.beginPath();
        ctx.moveTo(x + dx, y + dy);
        ctx.lineTo(x + dx - headLength * Math.cos(arrowAngle - Math.PI/6), 
                   y + dy - headLength * Math.sin(arrowAngle - Math.PI/6));
        ctx.lineTo(x + dx - headLength * Math.cos(arrowAngle + Math.PI/6), 
                   y + dy - headLength * Math.sin(arrowAngle + Math.PI/6));
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();

        // Texto
        ctx.fillStyle = color;
        ctx.font = "10px Arial";
        ctx.fillText(text, x + dx + 5, y + dy + 5);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dibujar plano inclinado
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(
            startX + planeLength * Math.cos(angleRad),
            startY + planeLength * Math.sin(angleRad)
        );
        ctx.strokeStyle = '#e8e8e8';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Dibujar piso horizontal
        ctx.beginPath();
        ctx.moveTo(startX + planeLength * Math.cos(angleRad), floorY);
        ctx.lineTo(canvas.width - 20, floorY);
        ctx.strokeStyle = '#888';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Dibujar caja
        const centerX = startX + position * Math.cos(angleRad);
        const centerY = startY + position * Math.sin(angleRad);

        ctx.save();
        ctx.translate(centerX, centerY);
        const offset = (boxSize / 2) / Math.cos(angleRad);
        ctx.translate(0, -offset);
        ctx.rotate(angleRad);
        ctx.fillStyle = '#FF5733';
        ctx.fillRect(-boxSize/2, -boxSize/2, boxSize, boxSize);
        ctx.restore();

        // Dibujar flechas de fuerzas (más pequeñas para el nuevo diseño)
        drawArrow(centerX, centerY, 0, 30, '#4da6ff', 'Peso');
        drawArrow(centerX, centerY, -25 * Math.cos(angleRad), -25 * Math.sin(angleRad), '#ff5252', 'Fricción');
        drawArrow(centerX, centerY, 25 * Math.sin(angleRad), -25 * Math.cos(angleRad), '#66bb6a', 'Normal');

        // Mover la caja
        if (position < planeLength) {
            position += speed;
            if (startY + position * Math.sin(angleRad) >= floorY) {
                cancelAnimationFrame(animationFrameId);
            } else {
                animationFrameId = requestAnimationFrame(draw);
            }
        }
    }

    draw();
}
window.startAnimation = startAnimation;

// Presionar Enter dentro de un campo dispara el botón "Calcular" de esa calculadora.
document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    const input = e.target;
    if (!input.matches || !input.matches('#contenido input')) return;
    const boton = input.closest('.simulator-container')?.querySelector('button')
        || document.querySelector('#contenido button');
    if (boton) {
        e.preventDefault();
        boton.click();
    }
});