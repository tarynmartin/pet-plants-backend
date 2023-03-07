
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

// const keyFile: string = process.env.KEY_FILE as string;
const adminKey: string = process.env.FB_SERVICE_ACCOUNT as string;
const adminCert = JSON.parse(adminKey);

export type FirebaseService = {
  admin: admin.app.App;
  db: admin.firestore.Firestore;
}

let service : FirebaseService | null = null;

//Service as a singleton
const firebaseService = () => {
  if(service === null){
    //first time here, initialize the service
    console.log("initializing the firebase app.");
    const adminApp = admin.initializeApp({
      credential: admin.credential.cert(adminCert)
    });
    const db = getFirestore(adminApp);

    service = {
      admin: adminApp,
      db: db,
    };
  }

  return service;
};

export default firebaseService;