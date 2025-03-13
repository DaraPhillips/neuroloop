import { storage } from './firebase.js'; // Import the initialized storage
import { ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-storage.js';

// Function to handle file upload with progress
function handleFileUpload(file) {
  // Create a reference to the file in Firebase Storage
  const storageRef = ref(storage, 'profilePhotos/' + file.name); // Adjust the path if necessary

  // Upload the file
  const uploadTask = uploadBytes(storageRef, file);

  uploadTask.then((snapshot) => {
    console.log('File uploaded successfully!', snapshot);

    // Get the download URL of the uploaded file
    getDownloadURL(snapshot.ref).then((downloadURL) => {
      console.log('File available at:', downloadURL);
      // You can now store the download URL in your Firestore or Realtime Database
    });
  }).catch((error) => {
    console.error('Error uploading file:', error);
  });

  // Optionally, you can display the progress of the upload
  uploadTask.on('state_changed', (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(`Upload is ${progress}% done`);
  });
}

// Example: Bind to file input (assumed to have an input field with id 'profilePhoto')
const fileInput = document.getElementById('profilePhoto'); // Make sure you have a file input field in your HTML

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0]; // Get the selected file
  if (file) {
    handleFileUpload(file); // Upload the selected file
  }
});
