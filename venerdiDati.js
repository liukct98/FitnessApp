// Funzione per aggiungere una nuova riga di esercizio
function addExercise(
  exercise = { name: "", reps: "", sets: "", weight: "", sec: "", image: "" }
) {
  const exerciseList = document.getElementById("exercise-list");
  const exerciseDiv = document.createElement("div");
  exerciseDiv.className = "exercise";
  exerciseDiv.innerHTML = `
          <input type="text" placeholder="Nome esercizio" value="${
            exercise.name
          }">
          <input type="number" placeholder="Serie" value="${exercise.sets}">
          <input type="number" placeholder="Ripetizioni" value="${
            exercise.reps
          }">
          <input type="number" placeholder="Peso (kg)" value="${
            exercise.weight
          }">
          <input type="number" placeholder="Riposo (s)" value="${exercise.sec}">
          <input type="file" accept="image/*" onchange="previewImage(event, this)" data-image="${
            exercise.image
          }">
          <img src="${exercise.image}" alt="Immagine Esercizio" ${
    exercise.image ? "" : 'style="display:none;"'
  }>
          <button class="btn-delete" onclick="deleteExercise(this)">Elimina</button>
      `;
  exerciseList.appendChild(exerciseDiv);
}

// Funzione per visualizzare l'anteprima dell'immagine caricata
function previewImage(event, input) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = input.parentElement.querySelector("img");
      img.src = e.target.result;
      img.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
}

// Funzione per eliminare una riga di esercizio
function deleteExercise(button) {
  const exerciseDiv = button.parentElement;
  exerciseDiv.remove();
}

// Funzione per ottenere il nome utente corrente dal localStorage
function getCurrentUser() {
  return localStorage.getItem("username");
}

// Funzione per salvare gli esercizi in localStorage per l'utente corrente
function saveExercises() {
  const userName = getCurrentUser();
  if (!userName) {
    alert("Nessun utente trovato. Per favore, accedi prima.");
    return;
  }

  const exercises = [];
  document
    .querySelectorAll("#exercise-list .exercise")
    .forEach((exerciseDiv) => {
      const inputs = exerciseDiv.querySelectorAll("input");
      const img = exerciseDiv.querySelector("img");
      exercises.push({
        name: inputs[0].value,
        sets: inputs[1].value,
        reps: inputs[2].value,
        weight: inputs[3].value,
        sec: inputs[4].value,
        image: img.src || "",
      });
    });

  // Salva gli esercizi con una chiave univoca per l'utente
  localStorage.setItem(`exercises_venerdi_${userName}`, JSON.stringify(exercises));
  alert("Esercizi salvati per Venerdi!");
}

// Funzione per caricare gli esercizi da localStorage per l'utente corrente
function loadExercises() {
  const userName = getCurrentUser();
  if (!userName) {
    alert("Nessun utente trovato. Per favore, accedi prima.");
    return;
  }

  const exercises = JSON.parse(
    localStorage.getItem(`exercises_${userName}`) || "[]"
  );
  exercises.forEach((exercise) => {
    addExercise(exercise);
  });
}

// Carica gli esercizi quando la pagina viene caricata
window.onload = loadExercises;
