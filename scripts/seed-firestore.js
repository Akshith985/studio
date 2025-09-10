
// This script is used to seed your Firestore database with initial data.
// To run it, you need to:
// 1. Make sure you have downloaded your serviceAccountKey.json from Firebase Project Settings > Service Accounts.
// 2. Place the serviceAccountKey.json file in the root directory of this project.
// 3. Make sure your data file (e.g., data.json) is in the root directory.
// 4. Run `npm install firebase-admin` in your terminal.
// 5. Run `node scripts/seed-firestore.js` in your terminal.

const admin = require('firebase-admin');
const fs = require('fs');

// --- CONFIGURATION ---
// Path to your service account key file
const serviceAccount = require('../serviceAccountKey.json');
// Path to your data file
const data = require('../data.json'); 
// Name of the collection you want to import data into
const collectionName = 'soundscapes'; 
// ---------------------


// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function uploadData() {
  if (!Array.isArray(data)) {
    console.error('Error: Your data.json file must be an array of objects.');
    return;
  }
    
  if(data.length === 0) {
    console.log('Data file is empty. Nothing to upload.');
    return;
  }

  const collectionRef = db.collection(collectionName);
  console.log(`Starting upload to collection: "${collectionName}"...`);

  const batch = db.batch();

  data.forEach((doc) => {
    // Let Firestore auto-generate the document ID
    const docRef = collectionRef.doc(); 
    batch.set(docRef, doc);
  });

  try {
    await batch.commit();
    console.log(`Successfully uploaded ${data.length} documents.`);
  } catch (error) {
    console.error('Error uploading documents: ', error);
  }
}

uploadData();
