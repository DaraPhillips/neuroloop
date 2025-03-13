import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const auth = getAuth();  // Ensure auth is initialized

// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logoutButton");

  logoutButton.onclick = (event) => {
    event.preventDefault();
    console.log("Before sign out:", auth.currentUser); // Log before sign-out

    // Sign out the user
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully.");
        // Redirect to login page after sign-out
        window.location.href = "/login.html";
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };
});
