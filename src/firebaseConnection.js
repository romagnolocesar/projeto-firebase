import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

//Firebase Configurações
let firebaseConfig = {
    apiKey: "AIzaSyCSmKMjLF8ziuj3sGXap36tsXHoOQeIPgM",
    authDomain: "reactapp-c2919.firebaseapp.com",
    projectId: "reactapp-c2919",
    storageBucket: "reactapp-c2919.appspot.com",
    messagingSenderId: "939382731975",
    appId: "1:939382731975:web:0b83e4c620cc60b5d4fae2"
};
// Inicializando Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;