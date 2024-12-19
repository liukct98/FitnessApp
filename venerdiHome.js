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
    // Salva gli stati solo per la slide corrente
    const allStates = JSON.parse(
      localStorage.getItem(`checkboxStates_venerdi_${userName}`) || "[]"
    );

    allStates[currentSlide] = checkboxStates[0]; // Solo un checkbox per slide
    localStorage.setItem(
      `checkboxStates_venerdi_${userName}`,
      JSON.stringify(allStates)
    );
  }
}
function setupResetButton() {
  const resetButton = document.querySelector("#reset-button");

  resetButton.addEventListener("click", () => {
    const userName = getCurrentUser();
    if (!userName) {
      alert("Nessun utente trovato. Per favore, accedi prima.");
      return;
    }

    // Resetta lo stato di tutte le checkbox in localStorage
    const allStates = exercises.map(() => false); // Tutti i checkbox deselezionati
    localStorage.setItem(
      `checkboxStates_venerdi_${userName}`,
      JSON.stringify(allStates)
    );

    // Aggiorna visivamente tutte le checkbox della slide corrente
    const checkboxes = document.querySelectorAll(".exercise-checkbox");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
      updateExerciseBackground(checkbox);
    });

    // Aggiorna ogni slide per riflettere il reset
    exercises.forEach((_, index) => {
      updateCarouselContent(index);
    });

    showSlide(0);

    saveCheckboxState(); // Salva lo stato resettato
  });
}

// Funzione per aggiornare lo sfondo in base allo stato della checkbox
function updateExerciseBackground(checkbox) {
  const exerciseDiv = checkbox.closest(".exercise");
  if (checkbox.checked) {
    exerciseDiv.style.backgroundColor = "#36b600"; // Sfondo verde se selezionato
    exerciseDiv.style.color = "white";
  } else {
    exerciseDiv.style.backgroundColor = ""; // Rimuove il colore se deselezionato
    exerciseDiv.style.color = "black";
  }
}

let currentSlide = 0;
let exercises = [];

// Funzione per aggiornare il contenuto del carosello
function updateCarouselContent(index) {
  const exerciseList = document.querySelector("#exercise-list");
  exerciseList.innerHTML = ""; // Pulisce il contenuto precedente

  const exercise = exercises[index];
  const savedCheckboxStates = JSON.parse(
    localStorage.getItem(`checkboxStates_venerdi_${getCurrentUser()}`) || "[]"
  );

  const exerciseDiv = document.createElement("div");
  exerciseDiv.className = "carousel-slide exercise";
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
    <div class= "div-checkbox">
      <input type="checkbox" class="exercise-checkbox" ${
        savedCheckboxStates[index] ? "checked" : ""
      }>
      Fatto
    </div>
  `;

  exerciseList.appendChild(exerciseDiv);

  // Aggiorna lo sfondo iniziale basato sullo stato salvato
  const checkbox = exerciseDiv.querySelector(".exercise-checkbox");
  updateExerciseBackground(checkbox);

  // Gestione evento per il checkbox
  checkbox.addEventListener("change", () => {
    saveCheckboxState();
    updateExerciseBackground(checkbox);
  });
}

// Funzioni per navigare tra le slide
function showSlide(index) {
  if (index >= 0 && index < exercises.length) {
    currentSlide = index;
    updateCarouselContent(index);
  }
}

function nextSlide() {
  if (currentSlide < exercises.length - 1) {
    showSlide(currentSlide + 1);
    const prevButton = document.querySelector(".carousel-button.left");
    if (prevButton) {
      prevButton.style.display = "block"; // Mostra il pulsante
    }
  } else if (currentSlide >= exercises.length - 1) {
    // Rimuove il pulsante next quando si arriva alla fine
    const nextButton = document.querySelector(".carousel-button.right");
    if (nextButton) {
      nextButton.style.display = "none"; // Nasconde il pulsante
    }
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    showSlide(currentSlide - 1);
    // Mostra di nuovo il pulsante next se non è già nascosto
    const nextButton = document.querySelector(".carousel-button.right");
    if (nextButton) {
      nextButton.style.display = "block"; // Mostra il pulsante
    }
  } else if (currentSlide <= 0) {
    // Rimuove il pulsante prev quando si è all'inizio
    const prevButton = document.querySelector(".carousel-button.left");
    if (prevButton) {
      prevButton.style.display = "none"; // Nasconde il pulsante
    }
  }
}

// Funzione per caricare gli esercizi da localStorage
function loadExercises() {
  const userName = getCurrentUser();
  if (!userName) {
    alert("Nessun utente trovato. Per favore, accedi prima.");
    return;
  }

  exercises = JSON.parse(
    localStorage.getItem(`exercises_venerdi_${userName}`) || "[]"
  );

  if (exercises.length === 0) {
    document.querySelector("#exercise-list").innerHTML =
      "<p>Nessun esercizio salvato.</p>";
    return;
  }

  // Mostra la prima slide
  showSlide(0);

  // Collega i pulsanti di navigazione
  // document.querySelector("#prev-button").addEventListener("click", prevSlide);
  // document.querySelector("#next-button").addEventListener("click", nextSlide);

  setupResetButton();
}

// Carica gli esercizi quando la pagina viene caricata
window.onload = loadExercises;
