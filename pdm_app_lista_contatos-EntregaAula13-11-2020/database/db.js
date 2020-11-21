import * as firebase from 'firebase';
import 'firebase/firestore';
import config from './firebase-config';

if(!firebase.apps.length) 
  firebase.initializeApp(config);

const db = firebase.firestore();

export default db;