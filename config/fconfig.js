import firebase from 'firebase/app'
import "firebase/storage";

try{
    const firebaseConfig = {
        apiKey: "AIzaSyAhVNg77hlyE-Zlv2GQTsC9AddTuUEmLv8",
        authDomain: "api-tahura-nuraksa.firebaseapp.com",
        databaseURL: "https://api-tahura-nuraksa.firebaseio.com",
        projectId: "api-tahura-nuraksa",
        storageBucket: "api-tahura-nuraksa.appspot.com",
        messagingSenderId: "774767107018",
        appId: "1:774767107018:web:826ba2d889427a03804d33",
        measurementId: "G-S28BKDSH9H"
      };
      firebase.initializeApp(firebaseConfig)
}catch(err){
    if (!/already exists/.test(err.message)) {
        console.error("Firebase initialization error raised", err.stack)
        }
}
const fconfig = firebase;



export default fconfig;
