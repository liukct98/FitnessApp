// Funzione per ottenere il nome utente corrente dal localStorage
function getCurrentUser() {
  return localStorage.getItem("username");
}

// Funzione per salvare lo stato dei checkbox
function saveCheckboxState() {
  const checkboxes = document.querySelectorAll(".exercise-checkbox");
  const checkboxStates = Array.from(checkboxes).map(
    (checkbox) => checkbox.checked
  );
  const userName = getCurrentUser();
  if (userName) {
    localStorage.setItem(
      `checkboxStates_${userName}`,
      JSON.stringify(checkboxStates)
    ); // **SALVATAGGIO**
  }
}

// Funzione per aggiornare lo sfondo in base allo stato della checkbox
function updateExerciseBackground(checkbox) {
  const exerciseDiv = checkbox.closest(".exercise");
  if (checkbox.checked) {
    exerciseDiv.style.backgroundColor = "green"; // Sfondo verde se selezionato
    exerciseDiv.style.color = "white";
  } else {
    exerciseDiv.style.backgroundColor = ""; // Rimuove il colore se deselezionato
    exerciseDiv.style.color = "black";
  }
}

// Funzione per caricare gli esercizi da localStorage e mostrarli
function loadExercises() {
  const userName = getCurrentUser();
  if (!userName) {
    alert("Nessun utente trovato. Per favore, accedi prima.");
    return;
  }

  const exercises = JSON.parse(
    localStorage.getItem(`exercises_${userName}`) || "[]"
  );

  const savedCheckboxStates = JSON.parse(
    localStorage.getItem(`checkboxStates_${userName}`) || "[]"
  ); // **RECUPERO STATO**

  if (exercises.length === 0) {
    document.getElementById("exercise-list").innerHTML =
      "<p>Nessun esercizio salvato.</p>";
    return;
  }

  exercises.forEach((exercise, index) => {
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
            <input type="checkbox" class="exercise-checkbox" ${
              savedCheckboxStates[index] ? "checked" : ""
            }> <!-- **APPLICAZIONE STATO** -->
            Fatto
        </label>
          `;
    document.getElementById("exercise-list").appendChild(exerciseDiv);

    // Aggiorna lo sfondo iniziale basato sullo stato salvato
    const checkbox = exerciseDiv.querySelector(".exercise-checkbox");
    updateExerciseBackground(checkbox);
  });

  // Creazione del bottone di reset
  const resetButton = document.createElement("button");
  resetButton.textContent = "Reset";
  resetButton.id = "reset-button";
  resetButton.style.marginTop = "20px";
  resetButton.style.marginBottom = "20px";
  resetButton.style.transform = "scale(1.5)";
  resetButton.style.marginLeft = "10px";
  resetButton.style.color = "black";
  document.getElementById("exercise-list").appendChild(resetButton);

  // Funzione per resettare tutte le checkbox
  resetButton.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll(".exercise-checkbox");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
      updateExerciseBackground(checkbox); // Aggiorna lo sfondo
    });
    saveCheckboxState(); // **AGGIORNAMENTO STATO**
  });

  // Salvataggio dello stato e aggiornamento sfondo quando un checkbox viene cliccato
  document.querySelectorAll(".exercise-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      saveCheckboxState(); // **EVENTO**
      updateExerciseBackground(checkbox); // **AGGIORNAMENTO SFONDO**
    });
  });
}

// Carica gli esercizi quando la pagina viene caricata
window.onload = loadExercises;
