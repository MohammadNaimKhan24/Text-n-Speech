// Init SpeechSynth API
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.getElementById("form");
const textInput = document.getElementById("text-input");
const rate = document.getElementById("rate");
const rateValue = document.getElementById("rate-value");
const pitch = document.getElementById("pitch");
const pitchValue = document.getElementById("pitch-value");
const voiceSelect = document.getElementById("voice-select");
const submit = document.getElementById("submit");
const body = document.querySelector("body");

// Init Voices Array
let voices = [];

// FUNCTIONS
const getVoices = () => {
  voices = synth.getVoices();

  // Loop thorugh voices
  voices.forEach((voice) => {
    // Create option element
    const option = document.createElement("option");
    // Fill option with voice and language
    option.textContent = voice.name + "(" + voice.lang + ")";

    // Set needed option attributes
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  });
};

if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

// Speak
const speak = () => {
  // Check if speaking
  if (synth.speaking) {
    console.log("Already Speaking...");
    return;
  } else if (textInput.value !== "") {
    // Add background animation
    body.style.background = "#141414 url(./images/wave.gif)";
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundSize = "100% 100%";

    // Get speak text
    const speakText = new SpeechSynthesisUtterance(textInput.value);
    // Speak end
    speakText.onend = (e) => {
    //   console.log("Done Speaking...");
      body.style.background = '#141414';
    };

    // Speak error
    speakText.onerror = (e) => {
      console.log("Something went wrong...");
    };

    // Selected voice
    const selectedVoice =
      voiceSelect.selectedOptions[0].getAttribute("data-name");

    // Loop through Voices
    voices.forEach((voice) => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    // Set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    // Speak
    synth.speak(speakText);
  }
};

// EVENT LISTENERS

// Text form submit
submit.addEventListener("click", (e) => {
  // prevent default behavior of submit
  e.preventDefault();
  speak();
  textInput.blur();
});

// Rate value change
rate.addEventListener("change", (e) => {
  rateValue.textContent = rate.value;
});

// Pitch value change
pitch.addEventListener("change", (e) => {
  pitchValue.textContent = pitch.value;
});

// Voice select change
voiceSelect.addEventListener("change", (e) => speak());
