import firebase from 'firebase/app'; // Import the compat version for the Web namespaced API
import 'firebase/database'; // Import the compat version for the Realtime Database


const firebaseConfig = {
    // Your Credentials
     apiKey: "AIzaSyBxjiKoj88hSoTQMfExnkQyijpIUlDAUuA",
     authDomain: "sample-project-cbad2.firebaseapp.com",
     databaseURL: "https://sample-project-cbad2-default-rtdb.firebaseio.com",
     projectId: "sample-project-cbad2",
     storageBucket: "sample-project-cbad2.appspot.com",
     messagingSenderId: "366712122287",
     appId: "1:366712122287:web:1bcbaf63439739f1e95d5a",
     measurementId: "G-303YRZXEXB"
};
   
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.database(); // Use the database() method to get the Realtime Database instance

export { db };