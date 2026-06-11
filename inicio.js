/* =========================================================================
   FisiCalc — Landing: flujo bienvenida → login → planes → lanzador.
   El "login" es solo visual (demo): no hay backend ni se envían datos.
   ========================================================================= */

let metodo = 'correo';

function mostrarVista(id) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('view-' + id).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
window.mostrarVista = mostrarVista;

function selMetodo(m) {
    metodo = m;
    document.querySelectorAll('.seg-btn').forEach(b => b.classList.toggle('active', b.dataset.m === m));
    document.getElementById('campoCorreo').style.display = m === 'correo' ? 'block' : 'none';
    document.getElementById('campoTelefono').style.display = m === 'telefono' ? 'block' : 'none';
    document.getElementById('loginErr').textContent = '';
}
window.selMetodo = selMetodo;

function entrarComo(nombre) {
    document.getElementById('saludo').textContent = `¡Hola, ${nombre}! 👋`;
    mostrarVista('plans');
}

function loginSocial(proveedor) {
    entrarComo(proveedor === 'Google' ? 'usuario de Google' : 'usuario de Facebook');
}
window.loginSocial = loginSocial;

function loginCampo() {
    const err = document.getElementById('loginErr');
    if (metodo === 'correo') {
        const correo = document.getElementById('campoCorreo').value.trim();
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo)) {
            err.textContent = 'Ingresa un correo electrónico válido.';
            return;
        }
        entrarComo(correo.split('@')[0]);
    } else {
        const tel = document.getElementById('campoTelefono').value.trim();
        if (tel.replace(/\D/g, '').length < 8) {
            err.textContent = 'Ingresa un número de teléfono válido.';
            return;
        }
        entrarComo(tel);
    }
}
window.loginCampo = loginCampo;

function elegirPlan(plan) {
    if (plan === 'free') mostrarVista('launch');
}
window.elegirPlan = elegirPlan;

function premiumInfo() {
    document.getElementById('buildMsg').classList.add('show');
}
window.premiumInfo = premiumInfo;

// Enter en los campos de login dispara "Continuar".
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.matches('#campoCorreo, #campoTelefono')) {
        e.preventDefault();
        loginCampo();
    }
});
