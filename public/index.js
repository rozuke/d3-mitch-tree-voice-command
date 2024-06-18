if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList;
  var SpeechRecognitionEvent =
    SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

  // var commands = [`iniciar`, `vértebras`, `cervicales`, `dorsales`];

  var recognition = new SpeechRecognition();
  var isListening = false;
  recognition.continuous = true;
  recognition.lang = "es-ES";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  var startButton = document.getElementById("startButton");

  startButton.addEventListener("click", () => {
    // Solicitar permiso para acceder al micrófono
    if (!isListening) {
      recognition.start();
      isListening = true;
      startButton.textContent = "Detener comandos de vos";
    } else {
      recognition.stop();
      isListening = false;
      startButton.textContent = "Iniciar comandos de vos";
    }
  });

  recognition.onresult = (event) => {
    console.log(event.results);
    var command = event.results[event.results.length - 1][0].transcript;

    const id = getId(command);
    var node = document.getElementById(id);
    console.log("EL COMANDO ES : " + command);
    console.log("EL ID ES : = " + id);
    if (node) {
      console.log(id);
      simulateClick(node);
    } else {
      console.log(`Fail with id = ${id}`);
      console.log("Comando no reconocido intente de nuevo");
    }
  };

  recognition.onend = () => {
    if (isListening) {
      recognition.start(); // Reinicia el reconocimiento si todavía está escuchando
    }
  };

  // recognition.onspeechend = () => {
  //   if (!isListening) recognition.stop();
  // };

  const getId = (command) => {
    // var baseId = command.substring(baseWord.length).trim().replace(/\s+/g, "-");
    // return removeAccents(baseId);

    var words = command.trim().split(" ");

    if (words.length > 4) {
      var id = `${words[words.length - 2]}-${words[words.length - 1]}`;
      return removeAccents(id);
    }
    var id = words[words.length - 1];
    return removeAccents(id);
  };

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const simulateClick = (element) => {
    var event = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    element.dispatchEvent(event);
  };
} else {
  alert(
    "Tu navegador no soporta la Web Speech API. Por favor, utiliza un navegador compatible como Google Chrome."
  );
}
