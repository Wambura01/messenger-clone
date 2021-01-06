import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
	apiKey: 'AIzaSyDnScOd_KNtMLHLgHHTkxZ_S8aUH23Cbvw',
	authDomain: 'facebook-messenger-clone-db.firebaseapp.com',
	projectId: 'facebook-messenger-clone-db',
	storageBucket: 'facebook-messenger-clone-db.appspot.com',
	messagingSenderId: '824407727182',
	appId: '1:824407727182:web:a5def9116c08e9596fb71f',
	measurementId: 'G-K3F3QE0655',
});

const db = firebaseApp.firestore();

export default db;
