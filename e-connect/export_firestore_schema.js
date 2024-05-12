const { Firestore } = require('@google-cloud/firestore');
const fs = require('fs');

// Initialize Firestore
const firestore = new Firestore();

// Function to fetch Firestore schema
async function fetchFirestoreSchema() {
  const collections = {};
  const collectionsData = await firestore.listCollections();
  
  // Fetch schema for each collection
  await Promise.all(collectionsData.map(async (collectionRef) => {
    const collectionName = collectionRef.id;
    collections[collectionName] = {};
    
    const snapshot = await collectionRef.get();
    snapshot.forEach((doc) => {
      collections[collectionName][doc.id] = doc.data();
    });
  }));
  
  return collections;
}

// Save schema to file
async function saveSchemaToFile() {
  const schema = await fetchFirestoreSchema();
  const schemaJSON = JSON.stringify(schema, null, 2);
  fs.writeFileSync('firestore_schema.json', schemaJSON);
}

// Execute the script
saveSchemaToFile()
  .then(() => console.log('Firestore schema saved to firestore_schema.json'))
  .catch((error) => console.error('Error saving Firestore schema:', error));
