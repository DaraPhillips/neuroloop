
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const userProfileDiv = document.getElementById('userProfile');

// Monitor authentication state
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is logged in, get their profile data
    const userRef = ref(database, 'users/' + user.uid);  // Assuming 'users' is your collection
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        userProfileDiv.innerHTML = `
          <p>Name: ${data.name}</p>
          <p>Email: ${data.email}</p>
          <img src="${data.profilePhoto}" alt="Profile Picture" />
        `;
      } else {
        userProfileDiv.innerHTML = '<p>User data not found!</p>';
      }
    });
  } else {
    // Redirect to login if user is not authenticated
    window.location.href = "/login.html";
  }
});
