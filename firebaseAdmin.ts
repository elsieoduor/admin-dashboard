import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // Use applicationDefault or specify a path to your service account key JSON
    databaseURL: 'https://<YOUR_PROJECT_ID>.firebaseio.com',
  });
}

const auth = admin.auth();
const firestore = admin.firestore();

export { auth, firestore };
