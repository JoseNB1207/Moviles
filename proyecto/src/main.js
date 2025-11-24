// Obtener elementos
const exerciseSelect = document.getElementById("exerciseSelect");
const pesoInput = document.getElementById("pesoInput");
const repsInput = document.getElementById("repsInput");
const addSetBtn = document.getElementById("addSetBtn");
const historyList = document.getElementById("historyList");

// Cargar historial al iniciar
updateHistory();

// Evento para agregar serie
addSetBtn.addEventListener("click", () => {
    const exercise = exerciseSelect.value;
    const peso = pesoInput.value;
    const reps = repsInput.value;

    if (!peso || !reps) {
        alert("Por favor completa todos los campos.");
        return;
    }

    const newSet = {
        peso,
        reps,
        date: new Date().toLocaleString()
    };

    // Guardar en localStorage
    const data = JSON.parse(localStorage.getItem(exercise)) || [];
    data.push(newSet);
    localStorage.setItem(exercise, JSON.stringify(data));

    pesoInput.value = "";
    repsInput.value = "";

    updateHistory();
});

// Actualizar historial según el ejercicio seleccionado
exerciseSelect.addEventListener("change", updateHistory);

function updateHistory() {
    const exercise = exerciseSelect.value;
    const data = JSON.parse(localStorage.getItem(exercise)) || [];

    historyList.innerHTML = "";

    data.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `Serie ${index + 1}: ${item.peso}kg × ${item.reps} reps — ${item.date}`;
        historyList.appendChild(li);
    });
}
