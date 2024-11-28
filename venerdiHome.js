// Funzione per ottenere il nome utente corrente dal localStorage
function getCurrentUser() {
  return localStorage.getItem("username");
}

// Funzione per caricare gli esercizi da localStorage e mostrarli
function loadExercises() {
  const userName = getCurrentUser();
  if (!userName) {
    alert("Nessun utente trovato. Per favore, accedi prima.");
    return;
  }

  const exercises = JSON.parse(
    localStorage.getItem(`exercises_venerdi_${userName}`) || "[]"
  );

  if (exercises.length === 0) {
    document.getElementById("exercise-list").innerHTML =
      "<p>Nessun esercizio salvato.</p>";
    return;
  }

  exercises.forEach((exercise) => {
    const exerciseDiv = document.createElement("div");
    exerciseDiv.className = "exercise";
    exerciseDiv.innerHTML = `
                <h3>${exercise.name}</h3>
                <p>Serie: ${exercise.sets}</p>
                <p>Ripetizioni: ${exercise.reps}</p>
                <p>Peso: ${exercise.weight} kg</p>
                <p>Riposo: ${exercise.sec} secondi</p>
                ${
                  exercise.image
                    ? `<img src="${exercise.image}" alt="Immagine Esercizio" style="max-width: 200px;">`
                    : ""
                }
                                <label>
            <input type="checkbox" class="exercise-checkbox">
            Fatto
        </label>
            `;
    document.getElementById("exercise-list").appendChild(exerciseDiv);
  });
  // Creazione del bottone di reset
  const resetButton = document.createElement("button");
  resetButton.textContent = "Reset";
  resetButton.id = "reset-button";
  resetButton.style.marginTop = "20px";
  resetButton.style.marginBottom = "20px";
  resetButton.style.transform = "scale(1.5)";
  resetButton.style.marginLeft = "10px";
  document.getElementById("exercise-list").appendChild(resetButton);

  // Funzione per resettare tutte le checkbox
  resetButton.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll(".exercise-checkbox");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  });
}

// Carica gli esercizi quando la pagina viene caricata
window.onload = loadExercises;
