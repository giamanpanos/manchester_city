import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, doc, setDoc } from "firebase/firestore";
import "firebase/storage";

import { cityDb } from "./temp/m-city-export";

const firebaseConfig = {
  apiKey: "AIzaSyDSQ6tRqH3uVI_IY7XaNaMMKGSE4cuRHf4",
  authDomain: "mcity-127e4.firebaseapp.com",
  projectId: "mcity-127e4",
  storageBucket: "mcity-127e4.firebasestorage.app",
  messagingSenderId: "715181736468",
  appId: "1:715181736468:web:d40e9df0ca7442a6125d01",
  measurementId: "G-64NW65ZBXW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

const matchesCollection = doc(collection(db, "matches"));

export const playersCollection = doc(collection(db, "players"));

const positionsCollection = doc(collection(db, "positions"));

const promotionsCollection = doc(collection(db, "promotions"));

const teamsCollection = doc(collection(db, "teams"));

// const [
//   match1,
//   match2,
//   match3,
//   match4,
//   match5,
//   match6,
//   match7,
//   match8,
//   match9,
//   match10,
//   match11,
//   match12,
// ] = cityDb.matches;

// const [
//   player1,
//   player2,
//   player3,
//   player4,
//   player5,
//   player6,
//   player7,
//   player8,
//   player9,
//   player10,
//   player11,
//   player12,
//   player13,
//   player14,
//   player15,
//   player16,
//   player17,
//   player18,
//   player19,
//   player20,
// ] = cityDb.players;

// const [
//   position1,
//   position2,
//   position3,
//   position4,
//   position5,
//   position6,
//   position7,
//   position8,
//   position9,
//   position10,
//   position11,
//   position12,
//   position13,
//   position14,
//   position15,
//   position16,
//   position17,
//   position18,
//   position19,
//   position20,
//   position21,
//   position22,
//   position23,
//   position24,
//   position25,
//   position26,
//   position27,
//   position28,
//   position29,
//   position30,
//   position31,
//   position32,
//   position33,
//   position34,
//   position35,
//   position36,
//   position37,
//   position38,
//   position39,
//   position40,
// ] = cityDb.positions;

// const [promotion1] = cityDb.promotions;

// const [
//   team1,
//   team2,
//   team3,
//   team4,
//   team5,
//   team6,
//   team7,
//   team8,
//   team9,
//   team10,
//   team11,
//   team12,
//   team13,
//   team14,
//   team15,
//   team16,
//   team17,
//   team18,
//   team19,
//   team20,
// ] = cityDb.teams;

export async function addMatch(match) {
  await setDoc(matchesCollection, match, { capital: true }, { merge: true });
}

export async function addPlayer(player) {
  await setDoc(playersCollection, player, { capital: true }, { merge: true });
}

// async function addPosition(position) {
//   await setDoc(
//     positionsCollection,
//     position,
//     { capital: true },
//     { merge: true }
//   );
// }

export async function addPromotion(promotion) {
  await setDoc(
    promotionsCollection,
    promotion,
    { capital: true },
    { merge: true }
  );
}

// async function addTeam(team) {
//   await setDoc(teamsCollection, team, { capital: true }, { merge: true });
// }

// addMatch(match1);
// addMatch(match2);
// addMatch(match3);
// addMatch(match4);
// addMatch(match5);
// addMatch(match6);
// addMatch(match7);
// addMatch(match8);
// addMatch(match9);
// addMatch(match10);
// addMatch(match11);
// addMatch(match12);

// addPlayer(player1);
// addPlayer(player2);
// addPlayer(player3);
// addPlayer(player4);
// addPlayer(player5);
// addPlayer(player6);
// addPlayer(player7);
// addPlayer(player8);
// addPlayer(player9);
// addPlayer(player10);
// addPlayer(player11);
// addPlayer(player12);
// addPlayer(player13);
// addPlayer(player14);
// addPlayer(player15);
// addPlayer(player16);
// addPlayer(player17);
// addPlayer(player18);
// addPlayer(player19);
// addPlayer(player20);

// addPosition(position1);
// addPosition(position2);
// addPosition(position3);
// addPosition(position4);
// addPosition(position5);
// addPosition(position6);
// addPosition(position7);
// addPosition(position8);
// addPosition(position9);
// addPosition(position10);
// addPosition(position11);
// addPosition(position12);
// addPosition(position13);
// addPosition(position14);
// addPosition(position15);
// addPosition(position16);
// addPosition(position17);
// addPosition(position18);
// addPosition(position19);
// addPosition(position20);
// addPosition(position21);
// addPosition(position22);
// addPosition(position23);
// addPosition(position24);
// addPosition(position25);
// addPosition(position26);
// addPosition(position27);
// addPosition(position28);
// addPosition(position29);
// addPosition(position30);
// addPosition(position31);
// addPosition(position32);
// addPosition(position33);
// addPosition(position34);
// addPosition(position35);
// addPosition(position36);
// addPosition(position37);
// addPosition(position38);
// addPosition(position39);
// addPosition(position40);

// addPromotion(promotion1);

// addTeam(team1);
// addTeam(team2);
// addTeam(team3);
// addTeam(team4);
// addTeam(team5);
// addTeam(team6);
// addTeam(team7);
// addTeam(team8);
// addTeam(team9);
// addTeam(team10);
// addTeam(team11);
// addTeam(team12);
// addTeam(team13);
// addTeam(team14);
// addTeam(team15);
// addTeam(team16);
// addTeam(team17);
// addTeam(team18);
// addTeam(team19);
// addTeam(team20);
