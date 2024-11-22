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
    localStorage.getItem(`exercises_${userName}`) || "[]"
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
            `;
    document.getElementById("exercise-list").appendChild(exerciseDiv);
  });
}

// Carica gli esercizi quando la pagina viene caricata
window.onload = loadExercises;
