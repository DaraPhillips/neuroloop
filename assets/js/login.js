// Firebase Configuration - Replace with your actual Firebase project details
const firebaseConfig = {
  apiKey: "AIzaSyDzJreRT1E6-ONXZEsdB1w7-jCo3-6ysiQ",
  authDomain: "neuroloop-13690.firebaseapp.com",
  databaseURL: "https://neuroloop-13690-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "neuroloop-13690",
  storageBucket: "neuroloop-13690.firebasestorage.app",
  messagingSenderId: "350302613612",
  appId: "1:350302613612:web:2f01b07d3261df64ef6849",
  measurementId: "G-66KVM25NZ7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  // Validate the form before submitting to Firebase
  if (!email || !password) {
    // Show error message for empty fields
    if (!email) {
      emailError.style.display = 'block';
    }
    if (!password) {
      passwordError.style.display = 'block';
    }
    return;
  }

  // Hide error messages if valid inputs
  emailError.style.display = 'none';
  passwordError.style.display = 'none';

  // Firebase Authentication: Sign in user
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('User logged in:', user);

      // Redirect to profile or home page after successful login
      window.location.href = "/profile.html"; // Or wherever you want to send the user
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      // Handle errors and show appropriate messages
      console.error(errorCode, errorMessage);

      // Display error message on the screen
      if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
        alert('Incorrect email or password. Please try again.');
      } else {
        alert('Login failed. Please check your credentials and try again.');
      }
    });
});
