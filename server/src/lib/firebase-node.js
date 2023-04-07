
const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const adminCert = require("./service-account.json");

// const keyFile: string = process.env.KEY_FILE as string;
// const adminKey: string = process.env.FB_SERVICE_ACCOUNT as string;
// const adminCert = JSON.parse(adminKey);
let service = null;

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

exports.service = firebaseService;