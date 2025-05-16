const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const generateBtn = document.getElementById("generate-btn");
const transcriptEl = document.getElementById("transcript");
const dreamStatus = document.getElementById("dream-status");
const dreamText = document.getElementById("dream-text");
const narrateBtn = document.getElementById("narrate-btn");
const stopNarrateBtn = document.getElementById("stop-narrate-btn");
const toggleModeBtn = document.getElementById("toggle-mode-btn");

const BACKEND_URL = "https://dreamsynth-backend.onrender.com/generate";

let recognition;
let finalTranscript = "";
let synth = window.speechSynthesis;
let slowReveal = false;
let narrationUtterance;

if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  recognition.onresult = (event) => {
    let interimTranscript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript + " ";
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }
    transcriptEl.innerHTML = `🗣️ You said: "${finalTranscript + interimTranscript}"`;
  };

  recognition.onend = () => {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    generateBtn.disabled = false;
  };
}

startBtn.onclick = () => {
  finalTranscript = "";
  recognition.start();
  transcriptEl.innerHTML = "🎙️ Listening...";
  startBtn.disabled = true;
  stopBtn.disabled = false;
};

stopBtn.onclick = () => {
  recognition.stop();
};

generateBtn.onclick = async () => {
  if (!finalTranscript.trim()) return;
  dreamStatus.innerHTML = "⏳ Synthesizing your dream...";
  dreamText.innerText = "";
  try {
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: finalTranscript })
    });

    const data = await res.json();

    if (data.dream) {
      if (slowReveal) {
        dreamText.innerHTML = "";
        let i = 0;
        const interval = setInterval(() => {
          dreamText.innerHTML += data.dream[i];
          i++;
          if (i >= data.dream.length) clearInterval(interval);
        }, 30);
      } else {
        dreamText.innerText = data.dream;
      }
      dreamStatus.innerHTML = "🌙 Here's your AI-crafted dream:";
    } else {
      dreamStatus.innerHTML = "❌ Failed to generate dream.";
    }
  } catch (err) {
    console.error(err);
    dreamStatus.innerHTML = "❌ Something went wrong.";
  }
};

narrateBtn.onclick = () => {
  if (synth.speaking) return;
  const utterance = new SpeechSynthesisUtterance(dreamText.innerText);
  utterance.rate = 1;
  synth.speak(utterance);
  narrationUtterance = utterance;
};

stopNarrateBtn.onclick = () => {
  if (synth.speaking) {
    synth.cancel();
  }
};

toggleModeBtn.onclick = () => {
  slowReveal = !slowReveal;
  toggleModeBtn.innerText = slowReveal ? "🌀 Reveal Instantly" : "🌀 Reveal Slowly";
};
