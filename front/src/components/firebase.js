import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjwL6KGXpSYsug-GEJLm9DWidYviMn22I",
  authDomain: "ecomerce-a93fb.firebaseapp.com",
  projectId: "ecomerce-a93fb",
  storageBucket: "ecomerce-a93fb.appspot.com",
  messagingSenderId: "797069013454",
  appId: "1:797069013454:web:611d647255a56d03d33b9f",
  measurementId: "G-H2V0YYZJ7Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Google Sign-In Function
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Return user details
    return {
      success: true,
      user: {
        googleId: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      },
    };
  } catch (error) {
    console.error("Google Sign-In Error:", error.message);

    // Return structured error response
    return {
      success: false,
      error: error.message,
    };
  }
};

export default app;
