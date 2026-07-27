// ======================================================
// BDIMarket Place
// Authentication System
// ======================================================

import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// ======================================================
// Register User
// ======================================================

export async function registerUser(data){

    try{

        const userCredential =
        await createUserWithEmailAndPassword(
            auth,
            data.email,
            data.password
        );

        const user=userCredential.user;

        await updateProfile(user,{
            displayName:data.name
        });

        await setDoc(
            doc(db,"users",user.uid),
            {

                uid:user.uid,

                name:data.name,

                email:data.email,

                phone:data.phone || "",

                role:data.role || "buyer",

                verified:false,

                status:"active",

                createdAt:new Date()

            }

        );

        await sendEmailVerification(user);

        return{

            success:true,

            user

        };

    }

    catch(error){

        return{

            success:false,

            message:error.message

        };

    }

}
// ======================================================
// Login User
// ======================================================

export async function loginUser(email, password) {

    try {

        const userCredential =
        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        return {

            success: true,

            user: userCredential.user

        };

    }

    catch (error) {

        return {

            success: false,

            message: error.message

        };

    }

}

// ======================================================
// Logout User
// ======================================================

export async function logoutUser() {

    try {

        await signOut(auth);

        return {

            success: true

        };

    }

    catch (error) {

        return {

            success: false,

            message: error.message

        };

    }

}

// ======================================================
// Current User
// ======================================================

export function getCurrentUser() {

    return auth.currentUser;

}

// ======================================================
// Check Login Status
// ======================================================

export function checkAuth(callback) {

    onAuthStateChanged(auth, (user) => {

        callback(user);

    });

}
// ======================================================
// Reset Password
// ======================================================

export async function resetPassword(email) {

    try {

        await sendPasswordResetEmail(auth, email);

        return {

            success: true,

            message: "Password reset email sent."

        };

    } catch (error) {

        return {

            success: false,

            message: error.message

        };

    }

}

// ======================================================
// Check Email Verification
// ======================================================

export function isEmailVerified() {

    if (!auth.currentUser) return false;

    return auth.currentUser.emailVerified;

}

// ======================================================
// Get User Role
// ======================================================

export async function getUserRole(uid) {

    try {

        const docRef = doc(db, "users", uid);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {

            return docSnap.data().role;

        }

        return null;

    } catch (error) {

        console.error(error);

        return null;

    }

}

// ======================================================
// Reload Current User
// ======================================================

export async function refreshUser() {

    if (auth.currentUser) {

        await auth.currentUser.reload();

    }

}

// ======================================================
// Helper
// ======================================================

export function isLoggedIn() {

    return auth.currentUser !== null;

}

export function getUID() {

    return auth.currentUser ? auth.currentUser.uid : null;

}

export function getEmail() {

    return auth.currentUser ? auth.currentUser.email : null;

}

// ======================================================
// End of auth.js
// ======================================================
