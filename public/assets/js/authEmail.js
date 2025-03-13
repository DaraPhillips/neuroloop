import { doc, setDoc } from "firebase/firestore"; // Firestore imports
import { EmailAuthProvider } from "firebase/auth"; // Firebase Auth imports

/**
 * Update the user's email in Firebase Authentication and Firestore after verification.
 * @param {Object} user - The current authenticated user.
 * @param {string} newEmail - The new email address.
 */
export async function updateEmail(user, newEmail) {
  if (!newEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
    throw new Error("Invalid email format. Please use an @ (e.g., p@gmail.com).");
  }

  try {
    // Send a verification email to the new address and update the email only after verification
    await user.verifyBeforeUpdateEmail(newEmail);

    console.log("Verification email sent to the new address. Please verify the new email before it is updated.");

    // You can optionally update Firestore after verification completes (handled separately).
  } catch (error) {
    if (error.code === "auth/requires-recent-login") {
      console.warn("Reauthentication required.");
      throw new Error("Please reauthenticate to update your email.");
    }
    console.error("Error sending verification email:", error);
    throw error;
  }
}

/**
 * Reauthenticate the user for sensitive operations.
 * @param {Object} user - The current authenticated user.
 * @param {string} currentPassword - The user's current password.
 */
export async function reauthenticateUser(user, currentPassword) {
  try {
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await user.reauthenticateWithCredential(credential);
    console.log("User reauthenticated successfully!");
  } catch (error) {
    console.error("Error reauthenticating user:", error);
    throw new Error("Failed to reauthenticate. Please try again.");
  }
}


