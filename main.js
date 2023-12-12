import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyA0vfH7AL6JiQIcUjiP4nqdnchbbOvCfzg",
    authDomain: "doan2-2d60b.firebaseapp.com",
    databaseURL: "https://doan2-2d60b-default-rtdb.firebaseio.com",
    projectId: "doan2-2d60b",
    storageBucket: "doan2-2d60b.appspot.com",
    messagingSenderId: "607753676427",
    appId: "1:607753676427:web:341fb8d5e46a6db9ab168e",
    measurementId: "G-MLM3CMGG9M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function toggleLamp(toggleElem, stateElem, path) {
  let parentNode = toggleElem.parentNode;
  parentNode.classList.toggle('active');
  if (parentNode.classList.contains('active')) {
    set(ref(database, path), true);
  } else {
    set(ref(database, path), false); 
  }
}

let lamps = [
  {toggle: document.getElementById('lamp_1_toggle'), state: document.getElementById('lamp_1_state'), path: 'device/lamp1'},
  {toggle: document.getElementById('fan_toggle'), state: document.getElementById('fan_state'), path: 'device/fan'},
  {toggle: document.getElementById('ring_toggle'), state: document.getElementById('ring_state'), path: 'device/ring'}
];
  
lamps.forEach(function(lamp) {
  lamp.toggle.addEventListener('click', function() {
    toggleLamp(lamp.toggle, lamp.state, lamp.path);
  });
});
    
let lamps_fb = [
  {toggle: document.getElementById('lamp_1_toggle'), state: document.getElementById('lamp_1_state'), path: 'device/lamp1'},
  {toggle: document.getElementById('fan_toggle'), state: document.getElementById('fan_state'), path: 'device/fan'},
  {toggle: document.getElementById('ring_toggle'), state: document.getElementById('ring_state'), path: 'device/ring'}
];

lamps_fb.forEach(function(lamp_fb) {
  onValue(ref(database, lamp_fb.path), function(snapshot) {
    let state = snapshot.val();
    if (state) {
      lamp_fb.toggle.parentNode.classList.add('active');
      lamp_fb.state.innerHTML = "ON";
    } else {
      lamp_fb.toggle.parentNode.classList.remove('active');
      lamp_fb.state.innerHTML = "OFF";
    }
  });
});

