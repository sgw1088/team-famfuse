import firebase from 'firebase/app';
import 'firebase/storage';

var config = {
    apiKey: "AIzaSyCkdYrPRGzOrWfexFm3hHwFfdoy2UnuMDs",
    authDomain: "famfuse-1549993976792.firebaseapp.com",
    databaseURL: "https://famfuse-1549993976792.firebaseio.com",
    projectId: "famfuse-1549993976792",
    storageBucket: "famfuse-1549993976792.appspot.com",
    messagingSenderId: "673089692171"
  };
  firebase.initializeApp(config);

  const storage = firebase.storage();

  export {
      storage,
      firebase as default
  }