import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyBlX1dR8YM5wKXtGDYlBwOIYQMasJulCmo",
    authDomain: "mcity-467cd.firebaseapp.com",
    databaseURL: "https://mcity-467cd.firebaseio.com",
    projectId: "mcity-467cd",
    storageBucket: "mcity-467cd.appspot.com",
    messagingSenderId: "995992477003",
    appId: "1:995992477003:web:3128b212a9c1875d335cce",
    measurementId: "G-N53BVQ2V5P"
};

firebase.initializeApp(firebaseConfig);

const fireDB = firebase.database()
const fireBAseMatches = fireDB.ref('matches')
const fireBasePromotions = fireDB.ref('promotions')
const fireBaseTeams = fireDB.ref('teams')
const fireBasePlayers = fireDB.ref('players')

export {
    firebase,
    fireBAseMatches,
    fireBasePromotions,
    fireBaseTeams,
    fireDB,
    fireBasePlayers
}