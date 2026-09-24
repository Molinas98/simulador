/**
 * Simulador de Votación - TSJE Clone Estético
 * Filtrado para: 5-CAAGUAZU / 0-CORONEL OVIEDO
 */

// ===== DATA =====
const CATEGORIAS = [
    { codigo: "INT", nombre: "INTENDENTE MUNICIPAL", preferente: false },
    { codigo: "JUN", nombre: "JUNTA MUNICIPAL", preferente: true }
];

const AGRUPACIONES = [
    { codigo: "411", nombre: "PARTIDO COLORADO", nombre_corto: "ANR", numero: "1", color: "#ff0000", color_tipografia: "#ffffff" },
    { codigo: "412", nombre: "PARTIDO REVOLUCIONARIO FEBRERISTA", nombre_corto: "PRF", numero: "3", color: "#1d5333", color_tipografia: "#ffffff" },
    { codigo: "413", nombre: "ALIANZA TODO POR CORONEL OVIEDO", nombre_corto: "ATPCO", numero: "123", color: "#9adbf7", color_tipografia: "#000000" },
    { codigo: "414", nombre: "PARTIDO COLORADO", nombre_corto: "ANR", numero: "1", color: "#ff0000", color_tipografia: "#ffffff" },
    { codigo: "415", nombre: "ALIANZA TODO POR CORONEL OVIEDO", nombre_corto: "ATPCO", numero: "123", color: "#9adbf7", color_tipografia: "#000000" },
    { codigo: "416", nombre: "PARTIDO PATRIA SOÑADA", nombre_corto: "PS", numero: "300", color: "#b9cdbe", color_tipografia: "#000000" }
];

const CANDIDATOS = {
    INT: [
        { id_umv: 359, nombre: "MARCOS BENITEZ", cod_lista: "411", clase: "Candidato", foto: "img/candidatos/411.2623.webp" },
        { id_umv: 360, nombre: "ANTONIO AQUINO PEREZ", cod_lista: "412", clase: "Candidato", foto: "img/candidatos/412.2624.webp" },
        { id_umv: 361, nombre: "ROSANA BOGADO", cod_lista: "413", clase: "Candidato", foto: "img/candidatos/413.2625.webp" },
        { id_umv: 824, nombre: "VOTO EN BLANCO", clase: "Blanco" }
    ],
    JUN: [
        {
            id_umv: 414, nombre: "LISTA 1 - ANR", cod_lista: "414", clase: "Candidato",
            miembros: [
                { nombre: "HUGO OVELAR", nro: 1, foto: "img/candidatos/414.2626.webp" },
                { nombre: "RODRIGO LOPEZ", nro: 2, foto: "img/candidatos/414.2627.webp" },
                { nombre: "OSVALDITO MORA", nro: 3, foto: "img/candidatos/414.2628.webp" },
                { nombre: "PEY VARGAS", nro: 4, foto: "img/candidatos/414.2629.webp" },
                { nombre: "DIEGO RODRIGUEZ", nro: 5, foto: "img/candidatos/414.2630.webp" },
                { nombre: "ALEXIS MENDEZ", nro: 6, foto: "img/candidatos/414.2631.webp" },
                { nombre: "JULIO BALBUENA", nro: 7, foto: "img/candidatos/414.2632.webp" },
                { nombre: "JUANCITO TORRES", nro: 8, foto: "img/candidatos/414.2633.webp" },
                { nombre: "JALIL GOSSEN", nro: 9, foto: "img/candidatos/414.2634.webp" },
                { nombre: 'CARLOS "CHUPA" CORONEL', nro: 10, foto: "img/candidatos/414.2635.webp" },
                { nombre: "OSCAR CHAVEZ", nro: 11, foto: "img/candidatos/414.2636.webp" },
                { nombre: "JAVI RAMOA", nro: 12, foto: "img/candidatos/414.2637.webp" }
            ],
            miembros_ids: [6624, 6625, 6626, 6627, 6628, 6629, 6630, 6631, 6632, 6633, 6634, 6635]
        },
        {
            id_umv: 415, nombre: "LISTA 123 - ATPCO", cod_lista: "415", clase: "Candidato",
            miembros: [
                { nombre: "MARCIAL CARDOZO", nro: 1 }, { nombre: "ELVIRA MARTINEZ", nro: 2 }, { nombre: "ARMANDO RIVEROS", nro: 3 },
                { nombre: "VICENTE BAEZ", nro: 4 }, { nombre: "ELIGIO CAMPUZANO", nro: 5 }, { nombre: "ISIDRO BOGADO", nro: 6 },
                { nombre: "ROQUITO OLMEDO", nro: 7 }, { nombre: "MONICA ALFONSO", nro: 8 }, { nombre: "RUBEN VAZQUEZ", nro: 9 },
                { nombre: "NESTOR BENITEZ SOSA", nro: 10 }, { nombre: "LUIS PORTILLO", nro: 11 }, { nombre: "JENNY MENDOZA", nro: 12 }
            ],
            miembros_ids: [6636, 6637, 6638, 6639, 6640, 6641, 6642, 6643, 6644, 6645, 6646, 6647]
        },
        {
            id_umv: 416, nombre: "LISTA 300 - PS", cod_lista: "416", clase: "Candidato",
            miembros: [
                { nombre: "CHILO CHAMORO", nro: 1 }, { nombre: "GABINO MEDINA PORTILLO", nro: 2 }, { nombre: "DIEGO ARMANDO PEREIRA BENITEZ", nro: 3 },
                { nombre: "MARLIN ROSANA OVIEDO CRISTALDO", nro: 4 }, { nombre: "RUBEN DARIO MEDINA CANDIA", nro: 5 }, { nombre: "ARNILDA BURGOS BAEZ", nro: 6 },
                { nombre: "ARIEL CENTURION", nro: 7 }, { nombre: "MARIA DEL CARMEN CENTURION", nro: 8 }, { nombre: "NILSON DANIEL ACOSTA", nro: 9 },
                { nombre: "PEDRO FIGUEREDO", nro: 10 }, { nombre: "DIANA GODOY", nro: 11 }, { nombre: "CLAUDIO VILLASBOA", nro: 12 }
            ],
            miembros_ids: [6648, 6649, 6650, 6651, 6652, 6653, 6654, 6655, 6656, 6657, 6658, 6659]
        },
        { id_umv: 10800, nombre: "VOTO EN BLANCO", clase: "Blanco" }
    ]
};

// ===== STATE =====
let currentCategory = null;
let selection = {};
let preferences = {};

// ===== UTILS =====
function getAgrupacion(cod) { return AGRUPACIONES.find(a => a.codigo === cod); }
function getInitials(name) {
    if (!name) return '?';
    const words = name.split(' ').filter(w => w.length > 0);
    return words.length >= 2 ? (words[0][0] + words[1][0]).toUpperCase() : name.substring(0, 2).toUpperCase();
}

// ===== NAVIGATION =====
function goToStep(stepId) {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.getElementById(stepId).classList.add('active');

    // Toggle footer
    const footer = document.getElementById('app-footer');
    if (stepId === 'voting-screen' || stepId === 'preference-screen') {
        footer.style.display = 'flex';
    } else {
        footer.style.display = 'none';
    }

    // Toggle back button
    const btnBack = document.getElementById('btn-back');
    const divBack = document.getElementById('divider-back');
    if (stepId === 'step-welcome' || stepId === 'thank-you-screen' || (stepId === 'voting-screen' && currentCategory === 'INT') || stepId === 'confirmation-screen') {
        btnBack.style.display = 'none';
        if (divBack) divBack.style.display = 'none';
    } else {
        btnBack.style.display = 'flex';
        if (divBack) divBack.style.display = 'block';
    }

    // Toggle global category bar
    const catBar = document.getElementById('global-category-bar');
    if (stepId === 'step-welcome' || stepId === 'thank-you-screen') {
        catBar.style.visibility = 'hidden';
    } else {
        catBar.style.visibility = 'visible';
    }
}

function goBack() {
    if (document.getElementById('preference-screen').classList.contains('active')) {
        preferences['JUN'] = null;
        renderVotingScreen('JUN');
    } else if (currentCategory === 'JUN') {
        renderVotingScreen('INT');
    }
}

// ===== RENDERERS =====
function startVoting() {
    selection = {};
    preferences = {};
    renderVotingScreen('INT');
}

function renderVotingScreen(catCode) {
    currentCategory = catCode;
    const isInt = catCode === 'INT';

    document.getElementById('global-category-text').innerHTML = isInt ? 'Candidatos a <span>INTENDENTE MUNICIPAL</span>' : 'Listas participantes al cargo de <span>JUNTA MUNICIPAL</span>';

    const container = document.getElementById('candidates-container');
    container.innerHTML = '';

    CANDIDATOS[catCode].forEach(cand => {
        const div = document.createElement('div');
        div.onclick = () => selectCandidate(cand, catCode);

        if (cand.clase === 'Blanco') {
            div.className = 'candidate-card-int blank-card';
            div.innerHTML = `<span class="blank-text">VOTO EN BLANCO</span>`;
        } else {
            const ag = getAgrupacion(cand.cod_lista);

            if (isInt) {
                div.className = 'candidate-card-int';
                div.style.background = ag.color;
                div.style.color = ag.color_tipografia;

                const isHighlighted = cand.nombre === 'MARCOS BENITEZ';
                const filterStyle = isHighlighted ? '' : 'filter: grayscale(100%);';
                const photoHtml = cand.foto
                    ? `<img src="${cand.foto}" style="${filterStyle}" onerror="this.outerHTML='${getInitials(cand.nombre)}'">`
                    : getInitials(cand.nombre);

                if (isHighlighted) {
                    div.style.border = "3px solid #333";
                    div.style.boxShadow = "0px 6px 15px rgba(0,0,0,0.6)";
                    div.style.zIndex = "10";
                    div.style.position = "relative";
                }

                div.innerHTML = `
                    <div class="card-int-party">${ag.nombre}</div>
                    <div class="card-int-middle">
                        <div class="card-int-photo" style="color: ${ag.color};">${photoHtml}</div>
                        <div class="card-int-lista">LISTA<br><span style="font-size:3rem;">${ag.numero}</span><br>${ag.nombre_corto}</div>
                    </div>
                    <div class="card-int-name">${cand.nombre}</div>
                `;
            } else {
                div.className = 'list-card-jun';
                div.style.background = ag.color;
                div.style.color = ag.color_tipografia;

                div.innerHTML = `
                    <div class="l-title">LISTA ${ag.numero}</div>
                    <div class="l-party">${ag.nombre}</div>
                    <div class="l-abbr">${ag.nombre_corto}</div>
                `;
            }
        }
        container.appendChild(div);
    });

    goToStep('voting-screen');
}

function selectCandidate(cand, catCode) {
    selection[catCode] = cand.id_umv;

    if (catCode === 'INT') {
        if (selection['JUN']) {
            renderConfirmationScreen();
        } else {
            renderVotingScreen('JUN');
        }
    } else {
        if (cand.clase !== 'Blanco' && cand.miembros) {
            renderPreferenceScreen(cand);
        } else {
            renderConfirmationScreen();
        }
    }
}

function renderPreferenceScreen(lista) {
    const ag = getAgrupacion(lista.cod_lista);

    document.getElementById('global-category-text').innerHTML = 'Candidatos a <span>JUNTA MUNICIPAL</span>';

    const header = document.getElementById('pref-list-header');
    header.style.background = ag.color;
    header.style.color = ag.color_tipografia;
    header.textContent = `Lista ${ag.numero} ${ag.nombre}`;

    const container = document.getElementById('preference-candidates');
    container.innerHTML = '';

    lista.miembros.forEach((m, i) => {
        const div = document.createElement('div');
        div.className = 'pref-card';
        div.onclick = () => {
            preferences['JUN'] = lista.miembros_ids[i];
            renderConfirmationScreen();
        };

        const isHighlighted = m.nombre === 'JUANCITO TORRES';
        const filterStyle = isHighlighted ? '' : 'filter: grayscale(100%);';
        const photoHtml = m.foto
            ? `<img src="${m.foto}" style="max-width:100%;max-height:100%;${filterStyle}" onerror="this.outerHTML='${getInitials(m.nombre)}'">`
            : getInitials(m.nombre);

        if (isHighlighted) {
            div.style.border = "3px solid #333";
            div.style.boxShadow = "0px 6px 15px rgba(0,0,0,0.6)";
            div.style.zIndex = "10";
            div.style.position = "relative";
        }

        div.innerHTML = `
            <div class="pref-card-top">
                <div class="pref-photo">${photoHtml}</div>
                <div class="pref-option">Opción<br><span style="font-size: 2.2rem;">${m.nro}</span></div>
            </div>
            <div class="pref-name">${m.nombre}</div>
        `;
        container.appendChild(div);
    });

    goToStep('preference-screen');
}

function renderConfirmationScreen() {
    const container = document.getElementById('confirmation-cards');
    container.innerHTML = '';

    document.getElementById('global-category-text').innerHTML = 'Opciones seleccionadas';

    CATEGORIAS.forEach(cat => {
        const selId = selection[cat.codigo];
        if (!selId) return;

        const cand = CANDIDATOS[cat.codigo].find(c => c.id_umv === selId);

        const div = document.createElement('div');
        div.className = 'confirm-card';

        if (cand.clase === 'Blanco') {
            div.className += ' blank-card';
            div.innerHTML = `
                <div class="confirm-cat">${cat.nombre}</div>
                <div class="confirm-photo" style="background: transparent; border: none; width: 100%; height: 160px; display: flex; align-items: center; justify-content: center; margin-bottom: 15px;">
                    <img src="img/logos/BLC.svg" style="width: 100%; height: 100%; object-fit: contain;">
                </div>
                <div class="confirm-name">VOTO EN BLANCO</div>
                <button class="btn-modificar" onclick="renderVotingScreen('${cat.codigo}')">Modificar</button>
            `;
        } else {
            const ag = getAgrupacion(cand.cod_lista);
            div.style.background = ag.color;
            div.style.color = ag.color_tipografia;

            let isHighlighted = cand.nombre === 'MARCOS BENITEZ';
            let filterStyle = isHighlighted ? '' : 'filter: grayscale(100%);';
            let photoHtml = cand.foto ? `<img src="${cand.foto}" style="max-width:100%;max-height:100%;${filterStyle}">` : getInitials(cand.nombre);
            let name = cand.nombre;
            let optHtml = '';

            if (cat.codigo === 'JUN' && preferences['JUN']) {
                const pIdx = cand.miembros_ids.indexOf(preferences['JUN']);
                if (pIdx > -1) {
                    const pm = cand.miembros[pIdx];
                    name = pm.nombre;
                    isHighlighted = pm.nombre === 'JUANCITO TORRES';
                    filterStyle = isHighlighted ? '' : 'filter: grayscale(100%);';
                    photoHtml = pm.foto ? `<img src="${pm.foto}" style="max-width:100%;max-height:100%;${filterStyle}">` : getInitials(pm.nombre);
                    optHtml = `<div class="confirm-option">Opción ${pm.nro}</div>`;
                }
            }

            div.innerHTML = `
                <div class="confirm-cat">${cat.nombre}</div>
                <div class="confirm-party">${ag.nombre}</div>
                <div class="confirm-lista">LISTA &nbsp;&nbsp;&nbsp; ${ag.numero}</div>
                <div class="confirm-photo" style="color: ${ag.color};">${photoHtml}</div>
                <div class="confirm-name">${name} <br> ${optHtml}</div>
                <button class="btn-modificar" onclick="renderVotingScreen('${cat.codigo}')">Modificar</button>
            `;
        }

        container.appendChild(div);
    });

    goToStep('confirmation-screen');
}

function confirmVote() {
    goToStep('thank-you-screen');
}

function restartVoting() {
    startVoting();
}

function resetAll() {
    goToStep('step-welcome');
}

// ===== RESIZE & SCALE =====
function scaleApp() {
    const wrapper = document.getElementById('app-wrapper');
    if (!wrapper) return;
    
    // Obtenemos el tamaño real de la ventana interior
    const safeWidth = window.innerWidth;
    const safeHeight = window.innerHeight;
    
    const scaleX = safeWidth / 1024;
    const scaleY = safeHeight / 768;
    const scale = Math.min(scaleX, scaleY);
    
    wrapper.style.transform = `translate(-50%, -50%) scale(${scale})`;
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    scaleApp();
    window.addEventListener('resize', scaleApp);
    
    goToStep('step-welcome');
});
