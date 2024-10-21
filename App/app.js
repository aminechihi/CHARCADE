// Import Firebase and Firestore modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3QUo9KFiKKTm8bmkiE_wJIDxRvqtuQDk",
  authDomain: "charcade-206cc.firebaseapp.com",
  projectId: "charcade-206cc",
  storageBucket: "charcade-206cc.appspot.com",
  messagingSenderId: "129796881831",
  appId: "1:129796881831:web:9a8e0dfd2291ff704aca82",
  measurementId: "G-8Z9HVGKF5J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const successSound = document.getElementById('success-sound');
const errorSound = document.getElementById('error-sound');
const iframeContainer = document.getElementById('iframe-container');
const fullscreenBtn = document.getElementById('fullscreenBtn');

// Function to check subscription key
async function checkSubscriptionKey(key) {
    try {
        const docRef = doc(db, 'subscriptions', key);
        const docSnap = await getDoc(docRef);
        return docSnap.exists(); // Return true if the document exists
    } catch (error) {
        console.error("Error checking subscription key: ", error);
        return false; // Return false if an error occurs
    }
}

// Check login status on page load
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        // Show the iframe container and hide the login form
        document.getElementById('login-container').style.display = 'none';
        iframeContainer.style.display = 'block';
        enterFullScreen(iframeContainer);
    }
}

// Function to handle successful login
function handleLoginSuccess() {
    localStorage.setItem('isLoggedIn', 'true'); // Store login status
    document.getElementById('login-container').style.display = 'none'; // Hide login form
    iframeContainer.style.display = 'block'; // Show iframe container
    enterFullScreen(iframeContainer); // Fullscreen iframe
    successSound.play(); // Play success sound
}

// Event listener for the "Insert Coin" button
document.getElementById('login-button').addEventListener('click', async function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const subscriptionKey = document.getElementById('subscription-key').value;

    if (document.getElementById('subscription-key').style.display === 'block') {
        // Handle login with subscription key
        const isValid = await checkSubscriptionKey(subscriptionKey);
        if (isValid) {
            handleLoginSuccess(); // Successful login with subscription key
        } else {
            // Show error message
            const errorMessage = document.getElementById('error-message');
            errorMessage.textContent = "Invalid subscription key!";
            errorMessage.style.display = 'block'; // Show the error message
            errorSound.play(); // Play error sound
        }
    } else {
        // Handle login with email and password
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                handleLoginSuccess(); // Successful login with email/password
            })
            .catch((error) => {
                const errorMessage = document.getElementById('error-message');
                errorSound.play(); // Play error sound
                errorMessage.textContent = error.message; // Display Firebase error
                errorMessage.style.display = 'block'; // Show the error message
            });
    }
});

// Handle "I have a subscription key" button
document.getElementById('subscription-btn').addEventListener('click', function() {
  document.getElementById('email').style.display = 'none';
  document.getElementById('password').style.display = 'none';
  document.getElementById('subscription-key').style.display = 'block';
  document.getElementById('login-button').style.display = 'block'; // Show Insert Coin button
});

// Back button functionality
document.getElementById('back-btn').addEventListener('click', function() {
  document.getElementById('email').style.display = 'block';
  document.getElementById('password').style.display = 'block';
  document.getElementById('subscription-key').style.display = 'none';
  document.getElementById('login-button').style.display = 'block'; // Show Insert Coin button
});

// Fullscreen toggle function
fullscreenBtn.addEventListener('click', function() {
  enterFullScreen(iframeContainer);
});

// Function to enter fullscreen mode
function enterFullScreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // Firefox
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE/Edge
        element.msRequestFullscreen();
    }
}

// Event listener for exiting fullscreen
document.addEventListener('fullscreenchange', toggleFullscreenButton);
document.addEventListener('mozfullscreenchange', toggleFullscreenButton);
document.addEventListener('webkitfullscreenchange', toggleFullscreenButton);
document.addEventListener('msfullscreenchange', toggleFullscreenButton);

function toggleFullscreenButton() {
  if (!document.fullscreenElement) {
      fullscreenBtn.style.display = 'block'; // Show button when not in fullscreen
  } else {
      fullscreenBtn.style.display = 'none'; // Hide button in fullscreen
  }
}

// Check login status on page load
window.onload = function() {
    checkLoginStatus();
};
