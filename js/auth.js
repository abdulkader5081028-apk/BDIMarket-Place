// =========================================
// BDIMarket Place Authentication
// =========================================

import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// =========================================
// Register User
// =========================================

export async function registerUser(userData) {

  const {

    name,

    email,

    password,

    role

  } = userData;

  const result = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await setDoc(doc(db, "users", result.user.uid), {

    uid: result.user.uid,

    name,

    email,

    role,

    verified: false,

    createdAt: serverTimestamp()

  });

  return result.user;

}

