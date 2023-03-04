import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyATBLXlMgiw3i_d39DdA8G3r_EMHQsFUuM',
  authDomain: 'movie-react-web-app.firebaseapp.com',
  projectId: 'movie-react-web-app',
  storageBucket: 'movie-react-web-app.appspot.com',
  messagingSenderId: '506375758872',
  appId: '1:506375758872:web:2f0bbe0c6357ef036f0f6d'
}

// Initialize firebase
firebase.initializeApp(firebaseConfig)

// Initialize firestore
const initFirestore = firebase.firestore()

// Initialize Authentication
const initAuth = firebase.auth()

export { initFirestore, initAuth }
