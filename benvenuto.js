// Recupera il nome utente da localStorage
function loadWelcomeMessage() {
  const userName = localStorage.getItem("username");

  // Se il nome utente è presente, mostra il messaggio personalizzato
  if (userName) {
    document.getElementById(
      "welcome-text"
    ).textContent = `BENVENUTO ${userName}`;
  } else {
    // Se non è presente, chiede all'utente il nome e lo memorizza
    const name = prompt("Inserisci il tuo nome:");
    if (name) {
      localStorage.setItem("username", name);
      document.getElementById("welcome-text").textContent = `BENVENUTO ${name}`;
    }
  }
}

// Funzione per accedere alla schermata principale
function accessApp() {
  window.location.href = "index.html";
}

// Carica il messaggio di benvenuto al caricamento della pagina
loadWelcomeMessage();
