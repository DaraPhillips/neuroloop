import { initializeApp, getApps } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzJreRT1E6-ONXZEsdB1w7-jCo3-6ysiQ",
  authDomain: "neuroloop-13690.firebaseapp.com",
  projectId: "neuroloop-13690",
  storageBucket: "neuroloop-13690.appspot.com",
  messagingSenderId: "350302613612",
  appId: "1:350302613612:web:2f01b07d3261df64ef6849",
  measurementId: "G-66KVM25NZ7"
};

// Initialize Firebase (if not already initialized)
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const auth = getAuth();
const db = getDatabase();

// Utility function to show/hide elements
function toggleVisibility(selector, show) {
  const element = document.querySelector(selector);
  if (element) {
    element.style.display = show ? "block" : "none";
  }
}

// Utility function to dynamically add the profile button
function addProfileButton(user) {
  const profileButtonHTML = `
    <li>
      <a href="/profile.html" class="btn-profile d-flex align-items-center">
        <img src="/assets/img/avatar2.svg" alt="Profile" class="rounded-circle" style="width: 30px; height: 30px; margin-right: 8px;">
        <span>${user.displayName || "User"}</span>
      </a>
    </li>
  `;
  const navMenu = document.querySelector("#navbar ul");
  if (navMenu && !document.querySelector(".btn-profile")) {
    navMenu.insertAdjacentHTML("beforeend", profileButtonHTML);
  }
}

// Utility function to dynamically add the logout button
function addLogoutButton() {
  if (!document.querySelector(".btn-logout")) {
    const logoutButton = document.createElement("a");
    logoutButton.textContent = "Log out";
    logoutButton.href = "#";
    logoutButton.className = "btn-logout";
    logoutButton.style.marginLeft = "10px";
    logoutButton.onclick = (event) => {
      event.preventDefault();
      signOut(auth).then(() => {
        console.log("User signed out successfully.");
      }).catch((error) => {
        console.error("Error signing out:", error);
      });
    };
    const headerContainer = document.querySelector(".header .container-xl");
    if (headerContainer) {
      headerContainer.appendChild(logoutButton);
    }
  }
}

// Utility function to remove elements by selector
function removeElement(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.remove();
  }
}

// Update UI based on authentication state
function updateNavbar(user) {
  if (user) {
    // User is signed in
    toggleVisibility(".btn-signup", false);
    toggleVisibility(".btn-getstarted", false);

    // Add profile button and logout button
    addProfileButton(user);
    addLogoutButton();
  } else {
    // User is signed out
    toggleVisibility(".btn-signup", true);
    toggleVisibility(".btn-getstarted", true);

    // Remove profile and logout buttons
    removeElement(".btn-profile");
    removeElement(".btn-logout");
  }
}

// Check the user's authentication state on page load
auth.onAuthStateChanged((user) => {
  updateNavbar(user);
});

// Ensure the navbar updates on initial page load
if (auth.currentUser) {
  updateNavbar(auth.currentUser);
}
