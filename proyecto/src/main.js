import { Preferences } from '@capacitor/preferences';

const titleInput = document.getElementById('titleInput');
const descInput = document.getElementById('descInput');
const linkInput = document.getElementById('linkInput');
const saveBtn = document.getElementById('saveBtn');
const notesList = document.getElementById('notesList');

let notes = [];

// Cargar apuntes guardados
async function loadNotes() {
    const { value } = await Preferences.get({ key: 'uninotes' });
    notes = value ? JSON.parse(value) : [];
    renderNotes();
}

// Guardar apuntes en el dispositivo
async function saveNotes() {
    await Preferences.set({
        key: 'uninotes',
        value: JSON.stringify(notes)
    });
}

// Renderizar apuntes en la pantalla
function renderNotes() {
    notesList.innerHTML = "";

    notes.forEach((note, index) => {
        const div = document.createElement('div');
        div.className = "note";
        div.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.desc}</p>
            <a href="${note.link}" target="_blank">Abrir archivo</a>
            <button onclick="deleteNote(${index})">Eliminar</button>
        `;
        notesList.appendChild(div);
    });
}

// Eliminar un apunte
window.deleteNote = (i) => {
    notes.splice(i, 1);
    saveNotes();
    renderNotes();
};

// Agregar un apunte nuevo
saveBtn.addEventListener('click', async () => {
    if (!titleInput.value || !descInput.value || !linkInput.value) {
        alert("Completa todos los campos.");
        return;
    }

    notes.push({
        title: titleInput.value,
        desc: descInput.value,
        link: linkInput.value
    });

    await saveNotes();
    renderNotes();

    titleInput.value = "";
    descInput.value = "";
    linkInput.value = "";
});

// Inicializar
loadNotes();
