/* Copyright (c) Facebook, Inc. and its affiliates. */

// Intiatilize an instance of SpeechRecognition from the Web-Speech-API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = true;
recognition.maxAlternatives = 1;

// Obtain it from your Wit.ai app's Settings page
const CLIENT_TOKEN = "<REPLACE WITH YOUR CLIENT TOKEN>";

// Set your wake word
const WAKE_WORD = "gizmo";

// Component to set error message when the Wit.ai client token has not been updated
AFRAME.registerComponent('error-message', {
  init: () => {
    if(CLIENT_TOKEN === "<REPLACE WITH YOUR CLIENT TOKEN>") {
      let textEl = document.querySelector('#text-object');
      textEl.setAttribute("text", `value: UPDATE CODE WITH YOUR WIT.AI CLIENT TOKEN`);
    }
  }
});

// Component to for voice commands
AFRAME.registerComponent('voice-command', {
  init: () => {
    recognition.start();
    recognition.onresult = (event) => {
      console.log(event.results)
      let utteranceList = event.results;
      let latestUtterance = utteranceList[utteranceList.length-1];
      let speechRecognition = latestUtterance[latestUtterance.length-1];
  
      // Update text object with speech recognition transcription
      let transcript  = speechRecognition.transcript.toLowerCase();
      let textEl = document.querySelector('#text-object');
      textEl.setAttribute("text", `value:${transcript}`);

      if(latestUtterance.isFinal) {
        // Exit the function if the wake word was not triggered to respect user privacy
        if(!transcript.includes(`hey ${WAKE_WORD}`)) {
          // Provide the user with a suggestion on voice commands they can say
          textEl.setAttribute("text", `value:Try saying: 'Hey ${WAKE_WORD}, add a box'`);
          return;
        }
        
        // Extract the utterance from the wake word
        let utterance = transcript.split(`hey ${WAKE_WORD}`)[1];

        // Send the user's utterance to Wit.ai API for NLU inferencing
        fetch(`https://api.wit.ai/message?v=20210414&q=${utterance}`, {
          headers: {Authorization: `Bearer ${CLIENT_TOKEN}`}
        })
        .then(response => response.json())
        .then(json => {
          // Add a 3D object to the scene based on the NLU inferencing result
          let scene = document.querySelector('a-scene');
          let objectType = json["entities"]["object:object"][0].value;
          let object = createObject(objectType);
          scene.append(object);
        });
      }
    };
  }
});

// Function for creating 3D objects
// Currently this function only supports box, cylinder, and sphere at fix positions
function createObject(objectType) {
  let object = document.createElement(`a-${objectType}`);
  if(objectType === "box") {
    object.setAttribute('color', 'red');
    object.setAttribute('position', '0 2 -5');
    object.setAttribute('rotation', '0 45 45');
    object.setAttribute('scale', '2 2 2');
  } else if(objectType === "cylinder") {
    object.setAttribute('color', '#FF9500');
    object.setAttribute('height', '2');
    object.setAttribute('radius', '0.75');
    object.setAttribute('position', '3 1 -5');
  } else if(objectType === "sphere") {
    object.setAttribute('position', "0 1.25 -5");
    object.setAttribute('position', "1.25");
    object.setAttribute('color', '#EF2D5E');
  }
  object.setAttribute('animation__position', "property: object3D.position.y; to: 2.2; dir: alternate; dur: 2000; loop: true");
  return object;
}