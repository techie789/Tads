const firebase = require('firebase/app');
require('firebase/auth');

// Initialize Firebase (if not already initialized)
const firebaseConfig = {
  // Your Firebase config here
};
firebase.initializeApp(firebaseConfig);

// Function to sign in with email and password
async function signInWithEmailAndPassword(email, password) {
  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    const authToken = await user.getIdToken(); // Get JWT token
    return authToken;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
}

module.exports = {
  signInWithEmailAndPassword
};
