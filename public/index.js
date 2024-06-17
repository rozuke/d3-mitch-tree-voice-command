if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
  alert(
    "Tu navegador no soporta la Web Speech API. Por favor, utiliza un navegador compatible como Google Chrome."
  );
} else {
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList;
  var SpeechRecognitionEvent =
    SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

  const baseWord = "Vital mover a";
  // var commands = [`iniciar`, `vértebras`, `cervicales`, `dorsales`];

  var recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.lang = "es-ES";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  var startButton = document.getElementById("startButton");

  startButton.addEventListener("click", () => {
    // Solicitar permiso para acceder al micrófono
    recognition.start();
  });

  recognition.onresult = (event) => {
    var command = event.results[0][0].transcript;
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

  recognition.onspeechend = () => {
    recognition.stop();
  };

  const getId = (command) => {
    var baseId = command.substring(baseWord.length).trim().replace(/\s+/g, "-");

    return removeAccents(baseId);
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
}
