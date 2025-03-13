import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzJreRT1E6-ONXZEsdB1w7-jCo3-6ysiQ",
  authDomain: "neuroloop-13690.firebaseapp.com",
  projectId: "neuroloop-13690",
  storageBucket: "neuroloop-13690.appspot.com",
  messagingSenderId: "350302613612",
  appId: "1:350302613612:web:2f01b07d3261df64ef6849",
  measurementId: "G-66KVM25NZ7",
};

// Initialize Firebase (if not already initialized)
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const auth = getAuth(); // Firebase Authentication instance
const db = getFirestore(); // Firestore instance

// Utility function to toggle the visibility of elements
function toggleVisibility(selector, show) {
  const element = document.querySelector(selector);
  if (element) {
    element.style.display = show ? "block" : "none";
  }
}

// Update the profile button's content with user details
async function updateProfileButton(user) {
  const profileButton = document.querySelector(".btn-profile");
  if (profileButton) {
    const profileImg = profileButton.querySelector("img");
    const profileName = profileButton.querySelector("span");

    try {
      // Reference to user's Firestore document
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        // Retrieve and set the user's first name
        const firstName = userData.firstName || "Profile"; // Fallback to "User" if not set
        profileName.textContent = firstName;

        // Retrieve and set the user's profile photo
        const profilePhotoUrl = userData.profilePhoto || "/assets/img/avatar2.svg"; // Default avatar
        profileImg.src = profilePhotoUrl;

        console.log("User data retrieved:", userData);
      } else {
        console.error("No document found for the current user!");
        profileName.textContent = "User";
        profileImg.src = "/assets/img/avatar2.svg"; // Default avatar
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      profileName.textContent = "User";
      profileImg.src = "/assets/img/avatar2.svg"; // Default avatar
    }
  }
}

// Attach logout functionality to the logout button
function setupLogoutButton() {
  const logoutButton = document.querySelector(".btn-logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default anchor behavior
      signOut(auth)
        .then(() => {
          console.log("User signed out successfully.");
          window.location.reload(); // Optional: Refresh the page
        })
        .catch((error) => {
          console.error("Error signing out:", error);
        });
    });
  }
}

// Update the navbar based on user authentication state
async function updateNavbar(user) {
  const isLoggedIn = !!user; // Check if a user is logged in

  // Toggle visibility for relevant navbar elements
  toggleVisibility(".btn-signup", !isLoggedIn); // Show when logged out
  toggleVisibility(".btn-getstarted", !isLoggedIn); // Show when logged out
  toggleVisibility(".btn-profile", isLoggedIn); // Show when logged in
  toggleVisibility(".btn-logout", isLoggedIn); // Show when logged in

  // Update profile button details if logged in
  if (isLoggedIn) {
    await updateProfileButton(user);
  }
}

// Listen for changes in the user's authentication state
onAuthStateChanged(auth, (user) => {
  console.log("Auth state changed:", user ? `Logged in as ${user.displayName}` : "Logged out");
  updateNavbar(user); // Update the navbar whenever the auth state changes

  // Setup logout functionality if user is logged in
  if (user) {
    setupLogoutButton();
  }
});
