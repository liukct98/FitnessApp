const resetButton = document.createElement("button");
resetButton.textContent = "Reset";
resetButton.id = "reset-button";
resetButton.style.marginTop = "20px";
resetButton.style.marginBottom = "20px";
resetButton.style.transform = "scale(1.5)";
resetButton.style.marginLeft = "10px";
resetButton.style.color = "black";
exerciseList.appendChild(resetButton);

// Funzione per resettare tutte le checkbox
resetButton.addEventListener("click", () => {
  const checkboxes = document.querySelectorAll("#resetbutton");
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
    updateExerciseBackground(checkbox); // Aggiorna lo sfondo
  });
  saveCheckboxState(); // Aggiorna stato
});

// Salvataggio dello stato e aggiornamento sfondo quando un checkbox viene cliccato
document.querySelectorAll("#resetbutton").forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    saveCheckboxState(); // Aggiorna stato
    updateExerciseBackground(checkbox); // Aggiorna sfondo
  });
});
