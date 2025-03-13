import { createUserWithEmailAndPassword, getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";
import { storage } from './firebase.js'; // Import Firebase Storage
import { ref as storageRef, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-storage.js';

// Get the elements from the form
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const username = document.getElementById('username');
const profilePhoto = document.getElementById('profilePhoto');
const termsCheckbox = document.getElementById('terms');
const signupButton = document.querySelector('.btn-primary'); // Submit button
const errorMessage = document.getElementById('error-message'); // Div for error messages

const auth = getAuth();
const database = getDatabase();

// Validation
function validateForm() {
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();
  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const usernameValue = username.value.trim();

  if (!firstNameValue || !lastNameValue || !emailValue || !passwordValue || !confirmPasswordValue || !usernameValue) {
    errorMessage.textContent = "All fields are required.";
    return false;
  }

  if (!/\S+@\S+\.\S+/.test(emailValue)) {
    errorMessage.textContent = "Please enter a valid email address.";
    return false;
  }

  if (passwordValue.length < 6) {
    errorMessage.textContent = "Password must be at least 6 characters long.";
    return false;
  }

  if (passwordValue !== confirmPasswordValue) {
    errorMessage.textContent = "Passwords do not match.";
    return false;
  }

  if (!termsCheckbox.checked) {
    errorMessage.textContent = "You must agree to the terms and conditions.";
    return false;
  }

  errorMessage.textContent = ""; // Clear error message
  return true;
}

// File Upload for Profile Photo
function handleFileUpload(file) {
  const storageRefPath = storageRef(storage, 'profilePhotos/' + file.name); // You can adjust this path as needed

  // Upload the file to Firebase Storage
  const uploadTask = uploadBytes(storageRefPath, file);

  uploadTask.then((snapshot) => {
    console.log('File uploaded successfully!', snapshot);

    // Get the download URL
    getDownloadURL(snapshot.ref).then((downloadURL) => {
      console.log('File available at:', downloadURL);
      // Store the download URL to the database after successful upload
      saveUserData(downloadURL);
    });
  }).catch((error) => {
    console.error('Error uploading file:', error);
  });

  // Show upload progress
  uploadTask.on('state_changed', (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(`Upload is ${progress}% done`);
  });
}

// Handle signup process
signupButton.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent the default form submission

  if (validateForm()) {
    // Firebase Authentication - create user
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User signed up:', user);

        // Handle profile photo upload
        const file = profilePhoto.files[0];
        if (file) {
          handleFileUpload(file); // Upload profile photo
        } else {
          // If no file, just save user data without photo
          saveUserData(null);
        }

      })
      .catch((error) => {
        console.error('Error signing up:', error);
        errorMessage.textContent = error.message; // Show Firebase errors to the user
      });
  }
});

// Save user data to Firebase Realtime Database
function saveUserData(profilePhotoURL) {
  const userData = {
    firstName: firstName.value,
    lastName: lastName.value,
    username: username.value,
    email: email.value,
    profilePhotoURL: profilePhotoURL || "", // If no profile photo, store an empty string
    createdAt: new Date().toISOString(),
  };

  const userRef = ref(database, 'users/' + auth.currentUser.uid);
  set(userRef, userData)
    .then(() => {
      console.log('User data written to Realtime Database');
      // Redirect to profile or dashboard page after signup
      window.location.href = "/profile.html";
    })
    .catch((error) => {
      console.error('Error writing user data to database:', error);
    });
}
